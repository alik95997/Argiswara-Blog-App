// import { getFirestore, setDoc, doc, db, getDocs, getDoc } from "./firebase.js"
// const profileContainer = document.querySelector("#profileContainer");
// const userUID = localStorage.getItem("uid");
// console.log(userUID)
// const profile = async () => {
//     try {
//         const response = await getDoc(doc(db, "users", userUID));
//         console.log(response.data());
//         profileContainer.innerHTML = `
//         <div>
//         <h1>Profile Name</h1>
//         <p>User : ${response.data().firstName}  ${response.data().lastName}</p>
//         <p>Gender : ${response.data().gender}  </p>
//         <p>Email : ${response.data().email} </p>
//         </div>`    
//     } catch (error) {
//         console.log("error", error.code)
//     }
    
// }

// profile()
