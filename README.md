# WebRTC 一对一视频会议

## 项目介绍
这是一个基于 WebRTC 技术实现的一对一视频会议应用，使用 WebSocket 作为信令服务器，支持两个浏览器标签页/窗口之间的实时音视频通信。该项目包含完整的前端页面和后端信令服务器，开箱即用，适合学习和扩展 WebRTC 相关技术。

## 功能特性
- 🎥 实时一对一音视频通话
- 🎤 支持音频和视频流传输
- 🔌 WebSocket 信令服务器管理连接
- 📱 响应式设计，适配移动端和桌面端
- 📊 实时显示连接状态和用户ID
- 🎯 简洁直观的用户界面
- 🔄 自动处理 ICE 候选者和 SDP 协商

## 技术栈
### 前端
- HTML5 (WebRTC, MediaStream)
- CSS3 (Grid, Flexbox, 响应式设计)
- JavaScript (ES6+, Class, WebSocket)

### 后端
- Node.js
- Express
- ws (WebSocket 库)
