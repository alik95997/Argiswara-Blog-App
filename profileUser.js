import { getFirestore, setDoc, doc, db, getDocs, getDoc, signOut, auth } from "./firebase.js"
const profileContainer = document.querySelector("#profileContainer");
const userUID = localStorage.getItem("uid");
console.log(userUID)

const profile = async () => {
  try {
    const response = await getDoc(doc(db, "users", userUID));
    console.log(response.data());   
    profileContainer.innerHTML = `<div class="card">
  <img src="https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg" alt="John" style="width:100%">
  <h1>User : ${response.data().firstName}  ${response.data().lastName}</h1>
  <p class="title">Gender : ${response.data().gender}</p>
  <p>Email : ${response.data().email}</p>
  <p>Joined : ${response.data().joined}</p>
  <div style="margin: 24px 0;">
    <a href="${response.data().linkedInProfile}"><i class='fab fa-linkedin-in'></i></i></a> 
    <a href="${response.data().twitterProfile}"><i class='fab fa-twitter'></i></a>  
    <a href="${response.data().facebookProfile}"><i class='fab fa-facebook-f'></i></a>  
     
  </div>
  <p><a href="${response.data().whatsappProfile}"><button>Contact</button></a></p>
  
</div>
`
  } catch (error) {
    console.log("error", error.code)
  }

}

profile();
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
