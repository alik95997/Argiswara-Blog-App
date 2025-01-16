import { getFirestore, setDoc, doc, db, getDocs, getDoc, addDoc, query, where, collection, signOut, auth } from "./firebase.js"

const authCheck = () => {
    const userUID = localStorage.getItem("uid")
    if (!userUID) {
        window.location.replace("./index.html")
    }
}
authCheck();



const publicBlogPost = document.querySelector("#publicBlogPost");
const modalContent = document.getElementById("modalContent");

const getPost = async () => {
    try {
        // Query to fetch only non-private posts
        const q = query(collection(db, "blogPost"), where("isPrivate", "==", false));
        const snapshot = await getDocs(q);

        snapshot.forEach((doc) => {
            const data = doc.data();
            const singlePost = document.createElement("div");
            singlePost.className = "single-post border col";
            singlePost.innerHTML = `
                <p>${new Date(data.createdAt).toLocaleDateString()}</p>
                <h3>${data.title}</h3>
                <p>${data.desc.slice(0, 100)}...</p>
                <button class="btn btn-dark read-more" data-id="${doc.id}">Read More</button>
            `;
            publicBlogPost.appendChild(singlePost);
        });

        // Attach event listeners to "Read More" buttons
        document.querySelectorAll(".read-more").forEach((button) => {
            button.addEventListener("click", async (e) => {
                const postId = e.target.getAttribute("data-id");
                const fullPost = await fetchFullPost(postId);
                showModal(fullPost);
            });
        });
    } catch (error) {
        console.log(error.message);
    }
};

const fetchFullPost = async (postId) => {
    // Fetch the full blog post by its ID
    const docRef = doc(db, "blogPost", postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
};

const showModal = (post) => {
    if (!post) return;

    const modalElement = document.getElementById("postModal");
    const modalContent = document.getElementById("modalContent");

    modalContent.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title">${post.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p>${post.desc}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    `;

    // Create and show the modal
    const modalInstance = new bootstrap.Modal(modalElement); // For CDN setup
    modalInstance.show();
};

getPost();


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
