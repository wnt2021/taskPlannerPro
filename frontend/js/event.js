import { jwtDecode } from 'https://cdn.jsdelivr.net/npm/jwt-decode@4.0.0/+esm';
import {eventCreate, list, deleteEvent, updateEvent, 
emailEvent, eventUpdateEmail, eventEmailCancel} from './services/eventService.js';
import { logout } from './services/userService.js';

document.getElementById("btn-create").addEventListener("click", () => {
    let overlay = document.querySelector("#event-overlay");    
    overlay.style.display = "flex";
});

document.getElementById("event-close").addEventListener("click", () => {
    let overlay = document.querySelector("#event-overlay");    
    overlay.style.display = "none";
});

document.getElementById("event-cancel-btn").addEventListener("click", () => {
    let overlay = document.querySelector("#event-overlay");    
    overlay.style.display = "none";
});

document.getElementById("event-overlay").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      event.currentTarget.style.display = "none";
    }
});

function createEvent() {
    document.getElementById("create").addEventListener("click", async (ev) => {
        ev.preventDefault();
    
        let name = document.getElementById("name").value;
        let description = document.getElementById("description").value;
        let date = document.getElementById("date").value;
        let location = document.getElementById("location").value;
        const imageInput = document.getElementById("image");
        let formError = document.getElementById('form-error');
        let imageError = document.getElementById("image-error");
    
        if(name.trim() === '' || date.trim() === '' || location.trim() === '') {
            formError.style.display = "block";
        }else {
            formError.style.display = "none";
        }

        let finalImage = null;
        if (imageInput.files && imageInput.files.length > 0) {
            finalImage = imageInput.files[0];
            const validTypes = ['image/jpeg', 'image/png'];
            if (!validTypes.includes(finalImage.type)) {
                imageError.style.display = "block";
                return;
            } else {
                imageError.style.display = "none";
            }
        }

        const { ok, data } = await eventCreate(name, description, date, location, finalImage);
        sendEmailEvent(name, description, date, location);
        if(ok){
            window.location.reload();
        }
    });
  }

  createEvent();

async function sendEmailEvent(name, description, date, location){
    try {
        const data = await emailEvent(name, description, date, location);
    } catch (error) {
        console.error("Something failed");
    }
}

async function listEvent() {
  try {
      const data = await list();      
      renderEvent(data);
  } catch (error) {
      console.error("Error en la llamada", error);
  }
}

listEvent();

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function displayButtonForm(){
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.role);
    
    if(user.role === 'system'){            
        document.getElementById("btn-create").style.display = "block";
    }else{
        document.getElementById("btn-create").style.display = "none";
    }
}

displayButtonForm();

function renderEvent(data){    
    let eventHeader =  document.querySelector(".event-header");
    
    eventHeader.innerHTML = "";
  
    data.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("card");

        div.setAttribute("event-name", item.name);
        div.setAttribute("event-description", item.description);
        div.setAttribute("event-date", item.date);
        div.setAttribute("event-location", item.location);
        div.setAttribute("event-state", item.state);
        div.setAttribute("event-id", item._id);
        div.setAttribute("event-image", item.image);        

        const isSystem = jwtDecode(getCookie('token'))?.role === 'system';
        const imageUrl = item.image
            ? `http://127.0.0.1:3000/uploads/${item.image}`
            : "../public/rome.jpg";

        div.innerHTML = `
            <a class="card-image">
                <img class="card-img" src="${imageUrl}" alt="" />
            </a>
            <div class="card-content">
                <a>
                    <h5 class="card-title">${item.name}</h5>
                </a>
                <p class="card-description">${item.description}</p>
                <p class="card-description">${item.location} - ${item.date}</p>
            <div class="trait">
                    ${isSystem ? `
                        <i class="fa-solid fa-trash role-icon" id="fa-trash" data-id="${item._id}"></i> 
                        <i class="fa-solid fa-pen-to-square update-event role-icon" data-id="${item._id}"></i>                         
                    ` : ''}                    
                </div>
            </div>
        `;

        eventHeader.appendChild(div);
    });

  eventDelete();
  getDataToUpdate();
}

function eventDelete(){
  document.querySelectorAll(".fa-trash").forEach((button) => {
      button.addEventListener("click", async (ev) => {            
          let id = ev.target.dataset.id

          try {
              const data = await deleteEvent(id);
              eventCanceled(data);
              window.location.reload();
              renderEvent(data);
          } catch (error) {
              console.error("Error en la llamada", error);
          }
      });
  });
}

async function eventCanceled(eventData){
    try {
        const data = await eventEmailCancel(eventData);
    } catch (error) {
        console.error("Error en la llamada", error);
    }
}

function getDataToUpdate(){
  document.querySelectorAll(".update-event").forEach((button) => {
      button.addEventListener("click", (event) => {
          let taskId = event.target.dataset.id;
          let overlay = document.getElementById("event-overlay");
          overlay.setAttribute("data-id", taskId);
          displayButton();

          let name = document.getElementById("name");
          let description = document.getElementById("description");
          let date = document.getElementById("date");
          let location = document.getElementById("location");

          if(event.target.classList.contains("update-event")){
              let card = event.target.closest(".card");
              let dataName = card.getAttribute('event-name');
              let dataDescription = card.getAttribute('event-description');
              let dataDate = card.getAttribute('event-date');
              let dataLocation = card.getAttribute('event-location');
              let dataImage = card.getAttribute('event-image');
              
              name.value = dataName;
              description.value = dataDescription;
              date.value = dataDate;
              location.value = dataLocation;
              overlay.setAttribute("data-image", dataImage);
          }
      });
  });
}

function displayButton(){
  let overlay = document.getElementById("event-overlay");
  overlay.style.display = "block";
  let create = document.getElementById("create");
  let update = document.getElementById("update");
  create.style.display = "none";
  update.style.display = "block";
}

document.getElementById("update").addEventListener("click", async (event) => {
  let card = event.target.closest(".overlay");
  let name = document.getElementById("name").value;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let location = document.getElementById("location").value;
  const imageInput = document.getElementById("image");
  let eventId = card.getAttribute('data-id');
  let imageError = document.getElementById("image-error");
  
  let finalImage;

  if (imageInput.files && imageInput.files.length > 0) {
    finalImage = imageInput.files[0];
    const validTypes = ['image/jpeg', 'image/png'];

    if(!validTypes.includes(finalImage.type)) {
        imageError.style.display = "block";
        return;
    }else{
        imageError.style.display = "none";
    }
  } else {
    finalImage = card.getAttribute('data-image');
  }

  try {
      const data = await updateEvent(eventId, name, description, date, location, finalImage);
      updateEmailEvent(name, description, date, location,);
      window.location.reload();
      renderEvent(data);
  } catch (error) {
      console.error("Error en la llamada", error);
  }
});

async function updateEmailEvent(name, description, date, location){
    try {
        const data = await eventUpdateEmail(name, description, date, location);
    } catch (error) {
        console.error("Error en la llamada", error);
    }
}

async function fetchDailyQuote() {
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
            headers: {
                'X-Api-Key': 'oyd4g0NUqSAbF7iq2B92VQ==ZbvIOce63Y9oemqy'
            }
        });

        const quoteText = document.getElementById("quote-text");
        const authorText = document.getElementById("author-text");

        const data = await response.json();
        if (data.length > 0) {
            const quote = data[0];
            quoteText.textContent = quote.quote;
            authorText.textContent = quote.author;
        } else {
            console.log('No quote received.');
        }

    } catch (error) {
        console.error('Error fetching quote:', error.message);
    }
}

fetchDailyQuote();

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