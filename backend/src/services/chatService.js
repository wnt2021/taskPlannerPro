
const clients = new Set();

const chatService = {
    addClient(client) {
        clients.add(client);
    },

    removeClient(client) {
        clients.delete(client);
    },

    broadcastMessage(messageData) {
        clients.forEach((client) => {
            client.send(JSON.stringify(messageData));
        });
    }
};

export default chatService;