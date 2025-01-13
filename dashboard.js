import { app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getFirestore, collection, limit, setDoc, doc, db, getDocs, getDoc, addDoc, query, where, signOut } from "./firebase.js"
const addPostButton = document.querySelector("#addPostButton");
const userUID = localStorage.getItem("uid");

const authCheck = () => {
    const userUID = localStorage.getItem("uid")
    if (!userUID) {
      window.location.replace("./index.html")
    }
  }
  authCheck()

const publicBlogPost = document.querySelector("#publicBlogPost");
const getPost = async () => {
    try {
        const q = query(collection(db, "blogPost"), where("isPrivate", "==", false),limit(3))

        // const snapshot = await getDocs(collection(db, "blogPost"))
        const snapshot = await getDocs(q)
        snapshot.forEach((doc) => {
            publicBlogPost.innerHTML += `
            <div class = "single-post">
            <img src = "./images/last-banner.jpg" width="100%">
            <p>${doc.data().createdAt}</p>
            <h3>${doc.data().title}</h3>
            <p>${doc.data().desc}</p>
            </div>
            `
        }
        )
    }
    catch (error) {
        console.log(error.message)
    }
}
getPost()

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


// Toggle hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links ul');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
