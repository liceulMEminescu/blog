const firebaseConfig = {
    apiKey: "AIzaSyDJBoZLjTsMJz-AP0cwns2WLVsw7gncAAM",
    authDomain: "blog-scoala-e32cc.firebaseapp.com",
    projectId: "blog-scoala-e32cc",
    storageBucket: "blog-scoala-e32cc.appspot.com",
    messagingSenderId: "807188126300",
    appId: "1:807188126300:web:a8f249769b6c64ec01e499",
    measurementId: "G-CXKDST9PB4"
  };

function mobileMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "") {
        x.className = "mobile";
    } else {
        x.className = " ----";
    }
}

const yearElement = document.getElementById('year');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const postareBtn = document.getElementById('postare-btn');
const salutare = document.getElementById('username');
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              


let user = null;
let admins = ["laVltetyQRQXjCH3D92fQIWqDMj2"];

// setam bazele firebase, ne conectam la serviciu
firebase.initializeApp(firebaseConfig);

// referinta la serviciul de autentificare
const auth = firebase.auth();

//referinta la baza de date
const db = firebase.firestore();

const postariDb = db.collection('postari');

// alegem providerul de logare -> Google
const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.onclick = function() {
    console.log("logare...");
    auth.signInWithPopup(provider).then(function() { window.location.relod();});
}
logoutBtn.onclick = function(){
    auth.signOut();
    window.location.reload();
}
function isAdmin(){
    let admin;

    if (user == null)
    return false;

admin= admins.includes(user.uid); //true or false

    return admin;
}

function formatDate(time){
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth();
    let  day = date.getDate();
    
    let result = day + "-" + month + "-" + year;

    return result; 


}

auth.onAuthStateChanged(function(fuser){
    user = fuser;
    console.log(user);
    if (user !=null){
        //logat in sistem
        logoutBtn.style.display = "block";
        loginBtn.style.display = "none";

        
        salutare.innerHTML = "SALUTARE, " + user.displayName;
        if (isAdmin() == true){
         postareBtn.style.display='block';
        }
        else {
            postareBtn.style.display='none';
        }
    }
    else {
        logoutBtn.style.display='none';
        loginBtn.style.display='block';
        postareBtn.style.display='none';
    }
    document.querySelector('body').style.display="block";
})

if (yearElement) {
    let date = new Date();
    
    yearElement.innerHTML = date.getFullYear() + " ©️";
}