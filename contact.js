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
        // Get input values
        const messageUserName = document.querySelector("#messageUserName").value.trim();
        const messageUserEmail = document.querySelector("#messageUserEmail").value.trim();
        const message = document.querySelector("#message").value.trim();

        // Create the message object
        const messageObj = {
            messageUserName,
            messageUserEmail,
            message
        };

        // Validate inputs
        if (!messageUserName || !messageUserEmail || !message) {
            throw new Error("All fields are required.");
        }

        // Add document to Firestore
        await addDoc(collection(db, "messageByUser"), messageObj);
        alert("Message sent successfully!");
    } catch (error) {
        console.error("Error:", error.message);
        alert(`Error: ${error.message}`);
    }
};

// Expose the function to the global scope
window.sendUsMessage = sendUsMessage;




signOutButton.addEventListener("click", signOutUser);

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links ul');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


