import chatService from "../services/chatService.js";
import Chat from "../models/chat.js";

function handleConnection(ws) {
    chatService.addClient(ws);

    ws.on('message', async (message) => {
        try {
            const messageData = JSON.parse(message);

            if (messageData.type === 'loadHistory') {
                const messages = await Chat.find({
                    $or: [
                        { senderId: messageData.userId, receiverId: messageData.targetId },
                        { senderId: messageData.targetId, receiverId: messageData.userId }
                    ]
                }).sort({timestamp: 1});

                ws.send(JSON.stringify({type: 'history', messages}));
                return;
            }

            const savedMessage = await Chat.create({
                senderId: messageData.senderId,
                receiverId: messageData.receiverId,
                message: messageData.message
            });
            chatService.broadcastMessage({
            ...messageData,
            timestamp: savedMessage.timestamp
        });
        } catch (error) {
            console.error('Error al procesar mensaje:', error);
        }
    });

    ws.on('close', () => {
        chatService.removeClient(ws);
    });
}

export default handleConnection;