import {userLogin} from "./services/userService.js";

function login() {
    document.getElementById("login").addEventListener("click", async (ev) => {
        ev.preventDefault();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let formError = document.getElementById('form-error');
        let userError = document.getElementById("user-error");

        if(email.trim() === '' || password.trim() === ''){
            formError.style.display = "block";
        }else{
            formError.style.display = "none";
            const { ok, data } = await userLogin(email, password);
            localStorage.setItem('user', JSON.stringify(data.user));

            if(!ok || !data.user){
               userError.style.display = "block";
            }else {
                window.location.href = "../../../taskPlannerPro/frontend/pages/task.html";
            }
        }
    });
}

login();
