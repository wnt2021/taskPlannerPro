
async function eventCreate(name, description, date, location, image){    
    try {

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('location', location);
        formData.append('image', image.files[0]);

        const response = await fetch('http://127.0.0.1:3000/api/event', {
            method: 'POST',
            body: formData
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
        const response = await fetch(`http://127.0.0.1:3000/api/listEvent`, {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'}
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

async function deleteEvent(id){
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/deleteEvent/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error al eliminar evento:', error.message);
    }
}

async function updateEvent(id, name, description, date, location, image){
    try {

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('location', location);

        console.log(image);

        if (image instanceof File) {
            formData.append('image', image);
          } else {
            formData.append('existingImage', image);
          }

        const response = await fetch(`http://127.0.0.1:3000/api/updateEvent/${id}`, {
            method: 'PUT',
            body: formData
        });

        const result = await response.json();
        console.log(result);
        
    } catch (error) {
        console.error("Update failed", error);
    }
};

async function eventPoints(id, eventId, strength, intelligence, social, creativity){
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/eventPoints/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({eventId, strength, intelligence, social, creativity})
        });

        const result = await response.json();
        console.log(result);
    } catch (error) {
        
    }
}

async function emailEvent(name, description, date, location){
    try {
        const response = await fetch('http://127.0.0.1:3000/api/event-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name, description, date, location})
        });

        const result = await response.json();
        console.log(result);

    } catch (error) {
        console.error('Error al enviar el email:', error.message);
    }
}

async function eventUpdateEmail(name, description, date, location){
    try {
        const response = await fetch('http://127.0.0.1:3000/api/email-update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name, description, date, location})
        });

        const result = await response.json();
        console.log(result);

    } catch (error) {
        console.error('Error al enviar el email:', error.message);
    }
}

async function eventEmailCancel(eventData){
    try {
        const response = await fetch('http://127.0.0.1:3000/api/email-cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({eventData})
        });

        const result = await response.json();
        console.log(result);
    
    } catch (error) {
        console.error('Error al enviar el email:', error.message);
    }
}

export {eventCreate, list, deleteEvent, updateEvent, eventPoints, emailEvent, eventUpdateEmail, eventEmailCancel};