
async function createUser(id, name, email, password){    
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/user/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({name, email, password})
        });

        const data = await response.json();

        return { ok: response.ok, data };
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
    }
};

async function registerUser(name, email, password, role){    
    try {
        const response = await fetch('http://127.0.0.1:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({name, email, password, role})
        });

        const data = await response.json();
        localStorage.setItem('token', data.token)

        return { ok: response.ok, data };
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
    }
};

async function listUsers(){
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/users`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
    }
}

async function userLogin(email, password){
    console.log(email, password);
    
    try {
        const response = await fetch('http://127.0.0.1:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({email, password})
        });

        const data = await response.json();

        if (response.ok && data.token) {
            localStorage.setItem('token', data.token);
        }

        return { ok: response.ok, data };
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
    }
};

async function logout(){
    try {
        const response = await fetch('http://127.0.0.1:3000/api/logout', {
            method: 'POST',
            credentials: 'include'
        });

        localStorage.removeItem('token');

        const data = await response.json();
        return { ok: response.ok, data };
    } catch (error) {
        console.error('Error al cerrar sessión', error.message);
    }
};

async function welcoming(name){
    try {
        const response = await fetch('http://127.0.0.1:3000/api/welcome-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name})
        });

        const result = await response.json();
        console.log(result);

    } catch (error) {
        console.error('Error al enviar el email:', error.message);
    }
};

export {createUser, userLogin, logout, 
registerUser, listUsers, welcoming};