import { app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./firebase.js"

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const signinButton = document.querySelector("#signup");
const bodyElement = document.querySelector("#body");

const authCheck = () => {
    const userUID = localStorage.getItem("uid")
    if (userUID) {
        window.location.replace("./dashboard.html")
    }
}



const signin = async () => {

    try {
        const response = await signInWithEmailAndPassword(auth, email.value, password.value);
        const uid = response.user.uid;
        localStorage.setItem("uid", uid);
        alert("signin")
        window.location.replace("./dashboard.html")
    }

    catch (error) {
        alert(error.code)
        console.log(error.code)
    }
}


signinButton.addEventListener("click", signin);
// bodyElement.addEventListener("load", authCheck)
window.authCheck = authCheck;