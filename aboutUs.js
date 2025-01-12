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
signOutButton.addEventListener("click", signOutUser);

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links ul');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
