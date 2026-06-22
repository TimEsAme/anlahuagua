# mcp-audit 项目说明

## 项目作用

`mcp-audit` 是一个用于审计 npm 前端工程依赖安全风险的 MCP 服务。

它会读取目标项目的 `package.json`，在临时工作目录中生成 `package-lock.json`，执行 `npm audit --json`，再把审计结果整理成 Markdown 报告。目标项目既可以是本地目录，也可以是 GitHub 仓库地址。

## 核心流程

1. 解析项目：读取本地项目或 GitHub 仓库中的 `package.json`。
2. 创建临时工作目录：在根目录 `work/` 下生成一次性工作目录。
3. 生成锁文件：执行 `npm install --package-lock-only --force`。
4. 执行审计：执行 `npm audit --json`。
5. 结果整理：按 `critical`、`high`、`moderate`、`low` 分类漏洞，并补充依赖链信息。
6. 渲染报告：使用 `src/render/template/` 下的 EJS 模板生成 Markdown。
7. 清理临时目录：审计结束后删除本次生成的临时工作目录。

## 如何使用

### 作为 MCP 服务使用

安装依赖：

```bash
npm install
```

启动 MCP 服务：

```bash
node src/mcpServer.js
```

服务注册了一个工具：

```text
auditPackage
```

参数：

| 参数 | 说明 |
| --- | --- |
| `projectRoot` | 本地项目根目录绝对路径，或 GitHub 仓库 URL |
| `savePath` | 审计报告 Markdown 文件的保存路径 |

示例输入：

```json
{
  "projectRoot": "E:\\path\\to\\your-project",
  "savePath": "E:\\path\\to\\audit.md"
}
```

GitHub 仓库示例：

```json
{
  "projectRoot": "https://github.com/webpack/webpack-dev-server/tree/v4.9.3",
  "savePath": "E:\\path\\to\\webpack-dev-server-audit.md"
}
```

### 作为 Node 模块调用

```js
import { auditPackage } from './src/entry/index.js';

await auditPackage(
  'E:\\path\\to\\your-project',
  'E:\\path\\to\\audit.md'
);
```

## 关键目录说明

| 路径 | 作用 |
| --- | --- |
| `src/mcpServer.js` | MCP 服务入口，注册 `auditPackage` 工具 |
| `src/entry/` | 审计主流程入口 |
| `src/parseProject/` | 解析本地项目或 GitHub 仓库的 `package.json` |
| `src/generateLock/` | 在临时目录中生成 `package-lock.json` |
| `src/audit/` | 执行 npm 审计、规范化结果、生成依赖链 |
| `src/render/` | 使用 EJS 模板渲染 Markdown 审计报告 |
| `src/workDir/` | 创建和删除临时工作目录 |
| `src/common/` | 通用工具函数 |
| `work/` | 运行时临时目录 |

## 不需要提交或可清理的目录

以下目录通常不是项目源码本身，不建议提交到版本库：

| 路径 | 原因 |
| --- | --- |
| `node_modules/` | 依赖安装产物，可通过 `npm install` 重新生成 |
| `work/` | 审计运行时临时目录，正常流程结束后会自动清理 |
| `work/*` | 单次审计生成的临时工作目录，属于运行缓存 |

## 可以直接删除的文件夹

在当前项目中，以下文件夹可以直接删除，不影响源码本身：

| 路径 | 是否可直接删除 | 删除影响 |
| --- | --- | --- |
| `node_modules/` | 是 | 只会删除本地依赖安装产物，后续执行 `npm install` 可恢复 |
| `work/` | 是 | 只会删除审计运行时临时目录，后续运行审计时会自动重新创建 |
| `work/8yl34n7lnhtmpmi16mp/` | 是 | 当前残留的单次审计临时目录，可直接清理 |

以下目录不建议直接删除，除非确认不再需要测试样例：

| 路径 | 是否可直接删除 | 删除影响 |
| --- | --- | --- |
| `src/audit/test/` | 谨慎 | 删除后会丢失 audit 模块测试脚本和测试数据 |
| `src/generateLock/test/` | 谨慎 | 删除后会丢失 generateLock 模块测试脚本和测试数据 |
| `src/render/test/` | 谨慎 | 删除后会丢失 render 模块测试脚本和测试数据 |
| `src/entry/test/` | 谨慎 | 删除后会丢失入口流程测试脚本 |
| `src/parseProject/test/` | 谨慎 | 删除后会丢失项目解析测试脚本 |

以下目录是测试夹具或测试样例，不属于生产运行必需目录，但如果还需要保留测试用例，则不建议删除：

| 路径 | 说明 |
| --- | --- |
| `src/audit/test/workdir/` | audit 模块测试数据 |
| `src/generateLock/test/workdir/` | generateLock 模块测试数据 |
| `src/render/test/workdir/` | render 模块测试数据 |

## 当前注意事项

- `package.json` 中暂未配置可直接运行的启动脚本，需要使用 `node src/mcpServer.js` 启动。
- `src/main/index.js` 看起来是早期实验入口，当前主链路使用的是 `src/entry/index.js`。
- 源码中的部分中文注释存在编码显示异常，但不影响通过文件结构理解主要流程。
