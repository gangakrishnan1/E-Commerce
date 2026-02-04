let email = document.getElementById("email");
let password = document.getElementById("password");
let btn = document.getElementById("btn");
let msg = document.getElementById("msg");

    let user=localStorage.getItem("login_user");
if(user!=null){
    location.replace("index.html")
}

async function login() {
    let res = await fetch("http://localhost:4000/users?email=" + email.value);
    let jsonres = await res.json();

    if (jsonres.length === 0) {
        msg.textContent = "User does not exist!";
        msg.style.color = "red";
    } else {
        // jsonres is an array with max 1 user
        if (jsonres[0].password == password.value) {
            localStorage.setItem("login_user", email.value)
            location.replace("index.html")

        } else {
            msg.textContent = "Invalid credentials!";
            msg.style.color = "red";
        }
    }

}

btn.onclick = function (event) {
    event.preventDefault();


    if (email.value == "" || password.value == "") {
        msg.textContent = "Please fill all fields!";
        msg.style.color = "red";
        return;
    }

    login();
};
