// server.js —— 信令服务器（Express + WebSocket）
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const os = require('os');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 托管静态文件（比如 index.html）
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 存储连接的 WebSocket 客户端
const clients = new Map();

wss.on('connection', (ws) => {
  console.log('🔌 新的 WebSocket 客户端连接');

  // 为每个客户端分配唯一 ID
  const clientId = generateClientId();
  clients.set(clientId, ws);

  // 告诉客户端它的 ID
  ws.send(JSON.stringify({
    type: 'client-id',
    id: clientId
  }));

  // 通知其他已连接的客户端：有新人加入了
  broadcastToOthers(clientId, {
    type: 'user-joined',
    id: clientId
  });

  // 接收来自客户端的消息并转发
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      handleMessage(clientId, data);
    } catch (err) {
      console.error('❌ 解析 WebSocket 消息失败:', err);
    }
  });

  // 客户端断开连接
  ws.on('close', () => {
    console.log(`👋 客户端 ${clientId} 断开连接`);
    clients.delete(clientId);
    // 通知其他人该用户离开了
    broadcastToOthers(clientId, {
      type: 'user-left',
      id: clientId
    });
  });

  ws.on('error', (err) => {
    console.error('⚠️ WebSocket 客户端错误:', err);
  });
});

// 处理业务消息的转发（如 offer/answer/ice-candidate）
function handleMessage(fromClientId, data) {
  const targetWs = clients.get(data.target);
  if (targetWs && targetWs.readyState === WebSocket.OPEN) {
    targetWs.send(JSON.stringify({
      ...data,
      from: fromClientId
    }));
  } else {
    console.log(`🎯 目标客户端 ${data.target} 未找到或已断开`);
  }
}

// 向除了某个客户端外的所有人广播消息
function broadcastToOthers(excludeClientId, message) {
  clients.forEach((ws, clientId) => {
    if (clientId !== excludeClientId && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  });
}

// 生成一个随机的客户端 ID
function generateClientId() {
  return Math.random().toString(36).substring(2, 9);
}

// 启动服务器，默认端口 8081
const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`🚀 信令服务器运行在端口 ${PORT}`);
  console.log(`📱 请使用以下方式访问:`);

  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        console.log(`   ➤ http://${net.address}:${PORT} （局域网 IP）`);
      }
    }
  }

  console.log(`   ➤ http://localhost:${PORT} （本地访问）`);
  console.log(`   ➤ 或直接双击打开两个 index.html 测试（但必须用 HTTP 服务器，不能 file://）`);
});
