import http from "http";
import { WebSocketServer } from "ws";
import handleConnection from "../controllers/chatController.js";

function initializeWebSocket(app) {
    const server = http.createServer(app);
    const wss = new WebSocketServer({ server });

    wss.on('connection', handleConnection);

    server.listen(3000, () => {
        console.log('Servidor WebSocket corriendo en puerto 3000');
    });

    return server;
}

export default initializeWebSocket;