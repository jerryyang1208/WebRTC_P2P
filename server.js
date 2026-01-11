const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 静态文件服务 - 注意路径修改为当前目录
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});

// 存储连接的客户端
const clients = new Map();

wss.on('connection', (ws) => {
    console.log('新的WebSocket连接建立');
    
    // 为新客户端生成唯一ID
    const clientId = generateClientId();
    clients.set(clientId, ws);
    
    // 发送客户端ID给客户端
    ws.send(JSON.stringify({
        type: 'client-id',
        id: clientId
    }));
    
    // 通知其他客户端有新用户加入
    broadcastToOthers(clientId, {
        type: 'user-joined',
        id: clientId
    });
    
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            handleMessage(clientId, data);
        } catch (error) {
            console.error('解析消息失败:', error);
        }
    });
    
    ws.on('close', () => {
        console.log(`客户端 ${clientId} 断开连接`);
        clients.delete(clientId);
        // 通知其他客户端有用户离开
        broadcastToOthers(clientId, {
            type: 'user-left',
            id: clientId
        });
    });
    
    ws.on('error', (error) => {
        console.error('WebSocket错误:', error);
    });
});

function handleMessage(fromClientId, data) {
    const targetClient = clients.get(data.target);
    
    if (targetClient && targetClient.readyState === WebSocket.OPEN) {
        // 转发消息到目标客户端
        targetClient.send(JSON.stringify({
            ...data,
            from: fromClientId
        }));
    } else {
        console.log(`目标客户端 ${data.target} 未找到或连接已关闭`);
    }
}

function broadcastToOthers(excludeClientId, message) {
    clients.forEach((ws, clientId) => {
        if (clientId !== excludeClientId && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        }
    });
}

function generateClientId() {
    return Math.random().toString(36).substr(2, 9);
}

const PORT = process.env.PORT || 8081;  // 使用8081端口
server.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
    console.log(`访问 http://localhost:${PORT} 开始使用`);
    console.log(`或者直接打开两个 index.html 文件在浏览器中测试`);
});