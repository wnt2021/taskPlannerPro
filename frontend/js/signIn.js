import { welcoming } from "./services/userService.js";
import {registerUser} from "./services/userService.js";

function signIn() {
    document.getElementById("register").addEventListener("click", async (ev) => {
        ev.preventDefault();
    
        let email = document.getElementById("email").value;
        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        let role = document.getElementById("role").value;
        let formError = document.getElementById('form-error');
        let userError = document.getElementById("user-error");
    
        if(email.trim() === '' || password.trim() === '' || name.trim() === '' || role.trim() === '') {
            formError.style.display = "block";
        }else {
            formError.style.display = "none";
            const { ok, data } = await registerUser(name, email, password, role);
            localStorage.setItem('user', JSON.stringify(data.user));
            welcomeEmail(name);
            if(!ok){
                userError.style.display = "block";
            }else {
                window.location.href = "../../../taskPlannerPro/frontend/pages/task.html";
            }
        }
    });
}

signIn();

async function welcomeEmail(name) {
    try {
        const data = await welcoming(name);
    } catch (error) {
        console.error("Something failed");
    }
}