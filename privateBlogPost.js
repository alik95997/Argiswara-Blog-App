import { getFirestore, setDoc, doc, db, getDocs, deleteDoc, getDoc, addDoc, query, where, updateDoc, collection, signOut, auth } from "./firebase.js"
const privateBlogPost = document.querySelector("#privateBlogPost");

const authCheck = () => {
    const userUID = localStorage.getItem("uid")
    if (!userUID) {
        window.location.replace("./index.html")
    }
}
authCheck()

const addPost = async () => {
    try {
        const title = document.querySelector("#title")
        const desc = document.querySelector("#desc")
        const checkbox = document.querySelector("#checkbox")
        const obj = {
            title: title.value,
            desc: desc.innerHTML,
            isPrivate: checkbox.checked,
            uid: localStorage.getItem("uid"),
            createdAt: new Date().toDateString()
        }
        await addDoc(collection(db, "blogPost"), obj);
        alert("Blog Posted Successfully");
    }
    catch (error) {
        console.log("error", error.message)
    }
    getPost()

}


const getPost = async () => {
    try {
        const snapshot = await getDocs(collection(db, "blogPost"))
        privateBlogPost.innerHTML = ""
        snapshot.forEach((doc) => {
            if (doc.data().uid === localStorage.getItem("uid")) {
                console.log(doc.data())
                privateBlogPost.innerHTML += `<div class="single-post">
                
                <p style="font-size:small;">${doc.data().createdAt}</p>
                    <h3>${doc.data().title}</h3>
                    <p>${doc.data().desc}</p>
                    <div class="form-button">
                    <button onclick="editPost('${doc.id}')" style="padding:8px 16px">Edit</button>
                    <button onclick="deletePost('${doc.id}')" style="padding:8px 16px">Delete</button>
                    </div>
                    </div>`
            }
        }
        )
    }

    catch (error) {
        console.log(error.message)
    }
}
const editPost = async (id) => {
    try {

        console.log(id)
        const updataTitle = prompt("Enter Title");
        const updateDesc = prompt("Enter Description");
        if (!updataTitle || !updateDesc) {
            alert("Please Enter Field")
            return
        }
        await updateDoc(doc(db, "blogPost", id), {
            title: updataTitle,
            desc: updateDesc
        })
    } catch (error) {
        alert(error.message)
        console.log(error.message)
    }
    getPost()
}
const deletePost = async (id) => {
    try {
        await deleteDoc(doc(db, "blogPost", id))
        alert("Post deleted successfully")
    } catch (error) {
        console.log("error", error.message)
    }
    getPost()
}
window.editPost = editPost;
window.deletePost = deletePost;
getPost();
addPostButton.addEventListener("click", addPost)
window.getPost = getPost;

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
