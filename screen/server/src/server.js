const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

// 创建express应用
const app = express();
const httpServer = createServer(app);
const port = 3000;

// 配置Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const merchants = ["商家1", "商家2", "商家3", "商家4", "商家5", "商家6"];

function generateSalesData() {
  return merchants.map((name) => {
    return {
      name,
      value: Math.floor(Math.random() * 200) + 100,
    };
  });
}

const jojo = ["天津市", "巴彦淖尔市", "黄南藏族自治州", "东营市", "三亚市"];
function geneTrendsData() {
  return jojo.map((name, index) => {
    const value = Array.from({ length: 12 }, () => {
      return parseFloat(
        (Math.random() * (300 - 20) + 20).toFixed(
          Math.floor(Math.random() * 3),
        ),
      );
    });
    return {
      _id: index + 1,
      name,
      value,
    };
  });
}

io.on("connection", (socket) => {
  console.log("客户端已经连接：" + socket.id);

  // ======== 新增：心跳检测 ========
  socket.on("heartbeat", (data) => {
    socket.emit("heartbeat_ack", {
      timestamp: data?.timestamp || Date.now(),
    });
  });


  // ======== 新增：心跳检测(模拟异常) ========
  // let heartbeatCount = 0;
  // socket.on("heartbeat", (data) => {
  //   heartbeatCount++;
  //   console.log(
  //     `收到客户端心跳:${socket.id} 第${heartbeatCount}次`,
  //   );
  //   // 模拟第5次以后服务异常
  //   if (heartbeatCount >= 5) {
  //     console.log("模拟业务服务异常，不返回heartbeat_ack");
  //     return;
  //   }
  //   socket.emit("heartbeat_ack", {
  //     timestamp: data?.timestamp || Date.now(),
  //   });
  // });



  socket.emit("salesData", generateSalesData());
  const interval1 = setInterval(() => {
    socket.emit("salesData", generateSalesData());
  }, 5000);

  socket.emit("TrendsData", geneTrendsData());
  const interval2 = setInterval(() => {
    socket.emit("TrendsData", geneTrendsData());
  }, 5000);

  socket.on("disconnect", () => {
    console.log("客户端已经断开：" + socket.id);
    clearInterval(interval1);
    clearInterval(interval2);
  });

});

httpServer.listen(port, () => {
  console.log(`服务运行在 http://localhost:${port}`);
});
