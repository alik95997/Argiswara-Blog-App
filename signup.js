import { app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getFirestore, setDoc, doc, db } from "./firebase.js";

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const cpassword = document.querySelector("#cpassword");
const gender = document.querySelector("#gender");
const signupButton = document.querySelector("#signup");

const facebookProfile = document.querySelector("#facebookProfile");
const linkedInProfile = document.querySelector("#linkedInProfile");
const twitterProfile = document.querySelector("#twitterProfile");
const whatsappProfile = document.querySelector("#whatsappProfile");
const signup = async () => {
    if (!password.value === cpassword.value) {
        alert("password do not match")
        return
    }
    try {
        const response = await createUserWithEmailAndPassword(auth, email.value, password.value);
        await setDoc(doc(db, "users", response.user.uid), {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            gender: gender.value,
            facebookProfile: facebookProfile.value,
            linkedInProfile: linkedInProfile.value,
            twitterProfile: twitterProfile.value,
            whatsappProfile: whatsappProfile.value,
            joined: new Date().toDateString()
        })
        alert("signup successfully")
        window.location.replace("./index.html")
    }
    catch (error) {
        alert("error", error.message)
        console.log("error", error.message)
    }
}
signupButton.addEventListener("click", signup);

const authCheck = () => {
    const userUID = localStorage.getItem("uid");
    if (userUID) {
        window.location.replace("./dashboard.html")
    }
}