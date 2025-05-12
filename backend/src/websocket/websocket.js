import http from "http";
import WebSocket from "ws";
import { config } from "../config/dbconfig.js";
import handleConnection from "../controllers/chatController.js";

function initializeWebSocket() {
    const server = http.createServer();
    const wss = new WebSocket.Server({ server, ...config.wsOptions });

    wss.on('connection', handleConnection);

    server.listen(config.port, () => {
        console.log(`Servidor WebSocket corriendo en puerto ${config.port}`);
    });

    return server;
}

export default initializeWebSocket;