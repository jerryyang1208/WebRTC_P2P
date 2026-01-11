<div align="right">
  <a href="README.md">简体中文</a>
</div>

# WebRTC One-to-One Video Conference

## Project Introduction
This is a one-to-one video conferencing application implemented based on WebRTC technology, using WebSocket as the signaling server to support real-time audio and video communication between two browser tabs/windows. The project includes a complete front-end page and back-end signaling server, ready to use out of the box, suitable for learning and expanding WebRTC-related technologies.

## Features
- 🎥 Real-time one-to-one audio and video calls
- 🎤 Support for audio and video stream transmission
- 🔌 WebSocket signaling server for connection management
- 📱 Responsive design, adapted to mobile and desktop devices
- 📊 Real-time display of connection status and user ID
- 🎯 Clean and intuitive user interface
- 🔄 Automatic handling of ICE candidates and SDP negotiation

## Tech Stack
### Frontend
- HTML5 (WebRTC, MediaStream)
- CSS3 (Grid, Flexbox, Responsive Design)
- JavaScript (ES6+, Class, WebSocket)

### Backend
- Node.js
- Express
- ws (WebSocket library)

## Quick Start
### Install Dependencies in Terminal
npm install ws express

### Start the Server Directly
node server.js

### Access the Browser Page
Open two browsers/windows and visit http://localhost:8081 in both. Click the "Start Camera" button in each tab respectively — the system will automatically assign user IDs, detect the connection with each other, and display the captured audio and video streams in the corresponding areas. Click the "Start Call" button in either tab to initiate the call, and click the "Hang Up" button to end the call.


# Contact & Inquiries

Author's blog: https://www.zhihu.com/people/13-73-62-89-19

Email: 2022280099@email.szu.edu.cn

This project will continue to be improved with more new features and UI interactions. Welcome to submit issues with suggestions for modifications and improvements!

Thank you for your attention and support!
