import { getFirestore, setDoc, doc, db, getDocs, getDoc, addDoc, query, where, collection, signOut, auth } from "./firebase.js"

const authCheck = () => {
    const userUID = localStorage.getItem("uid")
    if (!userUID) {
        window.location.replace("./index.html")
    }
}
authCheck();

const signOutButton = document.querySelector("#signOutButton");
const signOutUser = () => {
    signOut(auth)
        .then(() => {

            localStorage.removeItem("uid");
            window.location.replace("./index.html");
            console.log("User signed out successfully.");
            alert("You have been signed out.");
        })
        .catch((error) => {
            console.error("Error signing out: ", error);
            alert("Error signing out. Please try again.");
        });
};



const sendUsMessage = async () => {
    try {
        const messageUserName = document.querySelector("#messageUserName");
        const messageUserEmail = document.querySelector("#messageUserEmail");
        const message = document.querySelector("#message");
        const messageObj = {
            messageUserName: messageUserName.value,
            messageUserEmail: messageUserEmail.value,
            message: message.value
        }
        await addDoc(collection(db, "messageByUser"), messageObj)
        alert("Message Send Us Successfully")
    } catch (error) {
        console.log("error", error.message);
        alert("error", error.message)
    }
}




signOutButton.addEventListener("click", signOutUser);

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links ul');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

window.sendUsMessage = sendUsMessage;
