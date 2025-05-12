import {logout} from "./services/userService.js";
import {taskCreate, list, deleteTask, updateTask, points, 
pointsList, emailTask, emailTaskUpdate, experienceLevel} from "./services/taskService.js";
import { jwtDecode } from 'https://cdn.jsdelivr.net/npm/jwt-decode@4.0.0/+esm';

let level = 1;

document.getElementById("quest").addEventListener("click", () => {
    let overlay = document.querySelector("#task-overlay");    
    overlay.style.display = "flex";
});

document.getElementById("task-close").addEventListener("click", () => {
    let overlay = document.querySelector("#task-overlay");    
    overlay.style.display = "none";
});

document.getElementById("task-cancel-btn").addEventListener("click", () => {
    let overlay = document.querySelector("#task-overlay");    
    overlay.style.display = "none";
});

document.getElementById("task-overlay").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      event.currentTarget.style.display = "none";
    }
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
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

function setName(){ 
    const user = JSON.parse(localStorage.getItem('user'));
   
    if (user && user.name) {
        document.getElementById("userName").textContent = user.name;
    } else {
        console.error("Invalid user data", user);
    }
}

function create() {
    document.getElementById("create").addEventListener("click", async (ev) => {
        ev.preventDefault();
    
        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let deadline = document.getElementById("deadline").value;
        let trait = document.getElementById("trait").value;
        let points = document.getElementById("points").value;
        let formError = document.getElementById('form-error');


        if(title.trim() === '' || trait.trim() === '' || points.trim() === '') {
            formError.style.display = "block";
        }else {
            formError.style.display = "none";
            const { ok, data } = await taskCreate(title, description, deadline, trait, points);
            sendTaskEmail(title, description, deadline, trait, points);
            if(ok){
                window.location.reload();
            }
        }
    });
}

async function sendTaskEmail(title, description, deadline, trait, points){
    try {
        const data = await emailTask(title, description, deadline, trait, points);
        console.log(data);
    } catch (error) {
        console.error("Something failed");
    }
}

function displayButtonQuest(){
    const user = JSON.parse(localStorage.getItem('user'));
    
    if(user.role === 'system'){            
        document.getElementById("quest").style.display = "block";
    }else{
        document.getElementById("quest").style.display = "none";
    }
}

async function listTask() {
    try {       
        const data = await list();        
        createTask(data);
    } catch (error) {
        console.error("Error en la llamada", error);
    }
}

async function listPoints() {
    try {
        const user = JSON.parse(localStorage.getItem('user'));

        const data = await pointsList(user._id);
        displayPoints(data);
    } catch (error) {
        console.error("Error en la llamada", error);

    }
}

function displayPoints(data) {
    let pointHeader = document.querySelector(".points-header");

    pointHeader.innerHTML = "";

    data.forEach(item => {        
        let skill = document.createElement("div");
        skill.classList.add("skill");

        let coins = document.createElement("div");
        coins.classList.add("coin-card"); 

        skill.innerHTML = `
            <div class="card-skill">
                <i class="fa-solid fa-hand-fist icon-position"></i><span>Strength</span>
                <span id="strength">${item.strength}</span>
            </div>
            <div class="card-skill">
                <i class="fa-solid fa-brain icon-position"></i><span>Intelligence</span>
                <span id="intelligence">${item.intelligence}</span>
            </div>
            <div class="card-skill">
                <i class="fa-solid fa-person icon-position"></i><span>Relationship</span>
                <span id="relationship">${item.relationship}</span>
            </div>
            <div class="card-skill">
                <i class="fa-solid fa-palette icon-position"></i><span>Productivity</span>
                <span id="productivity">${item.productivity}</span>
            </div>
        `;

        coins.innerHTML = `
        <div class="card-skill">
            <i class="fa-solid fa-coins icon-position"></i><span>Coins</span>
            <span class="coin-text" id="coins">${item.coins}</span>
        </div>
        `;

        pointHeader.append(skill);
        pointHeader.append(coins);
    });
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function createTask(data){    
    let taskHeader =  document.querySelector(".task-header");
    
    taskHeader.innerHTML = "";
    
    data.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("task-item");

        div.setAttribute("data-title", item.title);
        div.setAttribute("data-description", item.description);
        div.setAttribute("data-deadline", item.deadline);
        div.setAttribute("data-traits", item.trait);
        div.setAttribute("data-points", item.points);
        div.setAttribute("data-id", item._id);

        const isSystem = jwtDecode(getCookie('token'))?.role === 'system';

        div.innerHTML = `
            <div class="task">
                <h3 class="task-title ${item.state === 'done' ? 'line-through' : ''}">${item.title}</h3>                
                <p class="task-description">${item.description}</p>
                <p class="task-deadline">${item.deadline}</p>
                <div class="trait">
                    <span class="task-description custom-badge" id="checkPoints">${item.trait} +${item.points}</span>
                    ${item.state !== 'done' ? `
                        <i class="fa-solid fa-check task-check role-icon" id="fa-check"></i>
                    ` : ''}
                    ${isSystem ? `
                        <i class="fa-solid fa-trash role-icon" id="fa-trash" data-id="${item._id}"></i> 
                        <i class="fa-solid fa-pen-to-square role-icon update-task" data-id="${item._id}"></i>                         
                    ` : ''}                    
                </div>
            </div>
        `;

        taskHeader.appendChild(div);
    });
    taskDelete();
    getDataToUpdate();
    handlePoints();
}

function taskDelete(){
    document.querySelectorAll(".fa-trash").forEach((button) => {
        button.addEventListener("click", async (ev) => {            
            let taskId = ev.target.dataset.id

            try {
                const data = await deleteTask(taskId);
                window.location.reload();
                createTask(data);
            } catch (error) {
                console.error("Error en la llamada", error);
            }
        });
    });
}

function getDataToUpdate(){
    document.querySelectorAll(".update-task").forEach((button) => {
        button.addEventListener("click", (event) => {
            let taskId = event.target.dataset.id;
            let overlay = document.getElementById("task-overlay");
            overlay.setAttribute("data-id", taskId);
            displayButton();

            let title = document.getElementById("title");
            let description = document.getElementById("description");
            let deadline = document.getElementById("deadline");
            let trait = document.getElementById("trait");
            let points = document.getElementById("points");

            if(event.target.classList.contains("update-task")){
                let card = event.target.closest(".task-item");
                let dataTitle = card.getAttribute('data-title');
                let dataDescription = card.getAttribute('data-description');
                let dataDeadline = card.getAttribute('data-deadline');
                let dataTrait = card.getAttribute('data-traits');
                let dataPoint = card.getAttribute('data-points');
        
                title.value = dataTitle;
                description.value = dataDescription;
                deadline.value = dataDeadline;
                trait.value = dataTrait;
                points.value = dataPoint;
            }
        });
    });
}

function displayButton(){
    let overlay = document.getElementById("task-overlay");
    overlay.style.display = "block";
    let create = document.getElementById("create");
    let update = document.getElementById("update");
    create.style.display = "none";
    update.style.display = "block";
}

document.getElementById("update").addEventListener("click", async (event) => {
    let card = event.target.closest(".overlay");
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let deadline = document.getElementById("deadline").value;
    let trait = document.getElementById("trait").value;
    let points = document.getElementById("points").value;
    let taskId = card.getAttribute('data-id');    

    try {
        const data = await updateTask(taskId, title, description, deadline, trait, points);
        updateEmailTask(title, description, deadline, trait, points);
        window.location.reload();
        createTask(data);
    } catch (error) {
        console.error("Error en la llamada", error);
    }
});

async function updateEmailTask(title, description, deadline, trait, points){
    try {
        const data = await emailTaskUpdate(title, description, deadline, trait, points);
        console.log(data);
    } catch (error) {
        console.error("Error en el envió", error);
    }
}

function handlePoints(){
    document.querySelectorAll(".task-check").forEach((button) => {
        button.addEventListener("click", (event) => {

            const traitContainer = button.closest('.trait');
            const checkPointsSpan = traitContainer.querySelector('span');
            let checkPoints = checkPointsSpan.textContent.trim();
            let card = event.target.closest(".task-item");
            let taskId = card.getAttribute('data-id');    

            let strength = parseInt(document.getElementById("strength").textContent);
            let intelligence = parseInt(document.getElementById("intelligence").textContent);
            let relationship = parseInt(document.getElementById("relationship").textContent);
            let productivity = parseInt(document.getElementById("productivity").textContent);
    
            const parts = checkPoints.split(' ');
            const trait = parts[0].toLowerCase();
            const point = parseInt(parts[1].replace('+', ''));
    
            switch (trait) {
                case 'intelligence':
                    intelligence += point;
                    break;
                case 'strength':
                    strength += point;
                    break;
                case 'relationship':
                    relationship += point;
                    break;
                case 'productivity':
                    productivity += point;
                    break;
                default:
                    console.log('Something went wrong');
                    break;
            }

            progressBar();
            sendTraits(taskId, strength, intelligence, relationship, productivity);
        });
    });
}

async function progressBar(){
    // let progress = document.getElementById("progress-bar");
    // let levelText = document.getElementById("level")
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        let xp = user.xp || 0;
        xp += 20;
        const data = await experienceLevel(user._id, xp);
        displayExperience(data);
    } catch (error) {
        console.error("Error en la llamada", error);
    }
}

function displayExperience(data){
    let progress = document.getElementById("progress-bar");
    console.log(data.xp);
    
    progress.style.width = data.xp + '%';
}

async function sendTraits(taskId, strength, intelligence, relationship, productivity){
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = await points(user._id, taskId, strength, intelligence, relationship, productivity);
        // window.location.reload();

    } catch (error) {
        console.error("Error en la llamada", error);
    }
}

create();
listTask();
listPoints();
setName();
displayButtonQuest();