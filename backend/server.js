import express from 'express';
import { connect } from 'mongoose';
import { mongoURI } from './src/config/dbconfig.js';
import userRoutes from './src/routes/userRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';
import eventRoutes from './src/routes/eventRoutes.js';
import authenticateToken from './src/middleware/auth.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import emailRoutes from './src/routes/emailRoutes.js';
import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));

// Connect to MongoDB
connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use(cookieParser());

app.use('/api', userRoutes);
app.use('/api', taskRoutes);
app.use('/api', eventRoutes);
app.use('/api', emailRoutes);

app.use(authenticateToken);

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const server = http.createServer(app);
const wss = new WebSocketServer({server});
const clients = new Set();

wss.on('connection', (ws) => {
  ws.userid = null;
  clients.add(ws);
  
  ws.on('message', (message) => {
      const messageData = JSON.parse(message);
      
      if (!ws.userid) {
          ws.userid = messageData.userid;
      }

      clients.forEach((client) => {
          if (client.userid !== messageData.userid) {
              client.send(JSON.stringify(messageData));
          }
      });
  });

  ws.on('close', () => {
      clients.delete(ws);
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});