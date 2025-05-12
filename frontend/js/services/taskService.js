
async function taskCreate(title, description, deadline, trait, points){    
    try {
        const response = await fetch('http://127.0.0.1:3000/api/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title, description, deadline, trait, points})
        });

        const data = await response.json();

        return { ok: response.ok, data };
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
    }
}

window.onload = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = "../../../taskPlannerPro/frontend/index.html";
        return;
    }

    list();
};

async function list(){        
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/list`, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.status === 401 || response.status === 403) {
            window.location.href = "../../../taskPlannerPro/frontend/index.html";
            return;
        }

        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
    }
}

async function pointsList(id){
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/listPoint/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'}
        });

        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
    }
}

async function deleteTask(taskId){
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/delete/${taskId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error al eliminar tarea:', error.message);
    }
}

async function updateTask(taskId, title, description, deadline, trait, points){
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/update/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title, description, deadline, trait, points})
        });

        const result = await response.json();
        console.log(result);
        
    } catch (error) {
        console.error("Update failed", error);
    }
}

async function points(id, taskId, strength, intelligence, relationship, productivity){
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/points/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({taskId, strength, intelligence, relationship, productivity})
        });

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
    }
}

async function emailTask(title, description, deadline, trait, points){
    try {
        const response = await fetch('http://127.0.0.1:3000/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title, description, deadline, trait, points})
        });

        const result = await response.json();
        console.log(result);        

    } catch (error) {
        console.error('Error al enviar el email:', error.message);
    }
}

async function emailTaskUpdate(title, description, deadline, trait, points){
    try {
        const response = await fetch('http://127.0.0.1:3000/api/update-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title, description, deadline, trait, points})
        });

        const result = await response.json();
        console.log(result);

    } catch (error) {
        console.error('Error al enviar el email:', error.message);
    }
}

export {taskCreate, list, deleteTask, updateTask, 
points, pointsList, emailTask, emailTaskUpdate};