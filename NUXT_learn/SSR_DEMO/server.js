import { renderToString } from "vue/server-renderer";
import express from "express";
import fs from "fs";
import { createApp } from "./app.js";

// 创建服务器实例
const server = express();

// 配置对象,配置页面的元数据信息
const desc = {
  title: "ikun",
  meta: '<meta name="description" content="这是一个SSR">',
};

server.get("/", async (req, res) => {
  try {
    const app = createApp();
    const content = await renderToString(app);
    const template = fs.readFileSync("./index.html", "utf-8");
    const html = template
      .replace("<!--anlahuagua-->", content)
      .replace("<!--title-->", desc.title)
      .replace("<!--meta-->", desc.meta);
    res.status(200).send(html);
  } catch (err) {
    res.status(500).send("安拉花瓜!!!");
  }
});

server.use(express.static("./"));

server.listen(9527, () => {
  console.log("编号9527,周星星");
});
