# 项目说明

`mcp-audit` 是一个用于审计 npm 前端工程依赖安全风险的 MCP 服务。它读取目标项目的 `package.json`，生成临时 `package-lock.json`，执行 `npm audit`，并将漏洞结果渲染为 Markdown 报告。

## 关键目录结构

| 路径 | 说明 |
| --- | --- |
| `src/mcpServer.js` | MCP 服务入口，注册 `auditPackage` 工具 |
| `src/entry/` | 审计主流程入口 |
| `src/parseProject/` | 解析本地项目或 GitHub 仓库的 `package.json` |
| `src/generateLock/` | 生成临时 lock 文件 |
| `src/audit/` | 执行 npm 审计并整理漏洞结果 |
| `src/render/` | 使用 EJS 模板生成 Markdown 报告 |
| `src/workDir/` | 创建和清理运行时临时目录 |
| `src/common/` | 通用工具函数 |
| `work/` | 运行时临时目录，不属于源码 |

## 文档

| 路径 | 说明 |
| --- | --- |
| `PROJECT_USAGE.md` | 项目作用、使用方式和可清理目录说明 |
