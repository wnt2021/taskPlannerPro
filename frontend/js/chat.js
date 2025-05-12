import {logout, listUsers} from "./services/userService.js";
const ws = new WebSocket('ws://localhost:3000');
const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');
const chat = document.getElementById('chat');

const user = JSON.parse(localStorage.getItem('user'));

const username =  user.role === 'system' ? 'System' : user.name;

async function getUsers() {
    const user = JSON.parse(localStorage.getItem('user'));

    try {
        const data = await listUsers();
        const users = data.user;

        const select = document.getElementById("userSelect");

        const targetRole = user.role === 'system' ? 'adventurer' : 'system';

        users.filter(u => u.role === targetRole).forEach(option => {
                const opt = document.createElement('option');
                opt.value = option._id;
                opt.textContent = option.role === 'system' ? 'System' : option.name;
                select.appendChild(opt);
            });

    } catch (error) {
        console.error("Error al obtener los datos", error);
    }
}


getUsers();

document.getElementById('connectBtn').addEventListener("click", () => {
    ws.addEventListener('open', () => {
        console.log('Conectado al servidor WebSocket');
        const idUser = document.getElementById("userSelect").value;
    
        ws.send(JSON.stringify({
            type: 'loadHistory',
            userId: user.role === 'system' ? user._id : '',
            targetId: idUser
        }));
    });
});

ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);

    if(data.type === 'history') {
        data.messages.forEach(msg => displayMessage(msg));
    }else{
        displayMessage(data);
    }
});

ws.addEventListener('error', (error) => {
    console.error('Error en WebSocket:', error);
});

ws.addEventListener('close', () => {
    console.log('Desconectado del servidor WebSocket');
});

function sendMessage() {
    const message = msgInput.value.trim();
    const idUser = document.getElementById("userSelect").value;

    if (message) {
        const messageData = {
            type: 'message',
            message: message,
            senderId: user.role === 'system' ? user._id : user._id,
            receiverId: idUser,
            username: username
        };

        displayMessage(messageData);
        ws.send(JSON.stringify(messageData));
        msgInput.value = '';
    }
}

function displayMessage(messageData) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${messageData.username === username ? 'sent' : 'received'}`;
    messageElement.innerHTML = `
        <strong>${messageData.username}:</strong> ${messageData.message}
    `;
    chat.appendChild(messageElement);
    chat.scrollTop = chat.scrollHeight;
}

sendBtn.addEventListener('click', sendMessage);
msgInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function userLogout() {
    document.getElementById("logout").addEventListener("click", async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        const {ok, data} = await logout();
        if(ok){
            window.location.href = "../../../taskPlannerPro/frontend/index.html";
        }else {
            console.error("Logout failed", data);
        }
    });
}

userLogout();