<div align="right">
  <a href="README.md">中文</a>
</div>

# WebRTC One-to-One Video Conference

## Project Introduction
This is a one-to-one video conference application based on WebRTC technology, using WebSocket as the signaling server. It supports real-time audio and video communication between browser tabs of two devices within the same local area network. The project includes a complete front-end page and back-end signaling server, which is ready to use and suitable for learning and expanding WebRTC-related technologies.

## Features
- 🎥 Real-time one-to-one audio and video calls
- 🎤 Support for audio and video stream transmission
- 🔌 WebSocket signaling server to manage connections
- 📱 Responsive design, adapting to mobile and desktop devices
- 📊 Real-time display of connection status and user ID
- 🎯 Clean and intuitive user interface
- 🔄 Automatic handling of ICE candidates and SDP negotiation

## Technology Stack
### Front-end
- HTML5 (WebRTC, MediaStream)
- CSS3 (Grid, Flexbox, Responsive Design)
- JavaScript (ES6+, Class, WebSocket)

### Back-end
- Node.js
- Express
- ws (WebSocket library)

## Quick Start
### Install dependencies in the terminal
npm install ws express

### Start the server directly
node server.js

### Access the browser page
According to the log information output in the terminal console, the local device can directly ctrl + click the local access address http://localhost:8081 to open a browser and click "Connect to Signaling Server". Then another device in the same local area network can enter any local area network IP output in the above log into the browser (such as using http://192.168.31.93:8081). After entering the video communication page, change the front-end input box to http://192.168.31.93:8081 to successfully connect both parties to the signaling server. Click the "Start Camera" button in both tabs respectively. The system will automatically assign user IDs and detect the other party's connection, displaying the captured audio and video streams in the corresponding area. Click the "Initiate Call" button in either tab to start the call, and click the "Hang Up" button to end the call.

# Contact & Consultation

Author's blog https://www.zhihu.com/people/13-73-62-89-19

My email: 2022280099@email.szu.edu.cn

This project will continue to be improved and updated with more new features and interface interactions. Welcome to raise issues to share suggestions for modifications and improvements!

Thank you for your attention and support!
