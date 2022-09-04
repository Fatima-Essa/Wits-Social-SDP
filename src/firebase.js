import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {

    apiKey: "AIzaSyAiKHKbAxfxfOcHaZbFyiLca91h4jBlKb4",
  
    authDomain: "wits-social-28a0d.firebaseapp.com",
  
    databaseURL: "https://wits-social-28a0d-default-rtdb.firebaseio.com",
  
    projectId: "wits-social-28a0d",
  
    storageBucket: "wits-social-28a0d.appspot.com",
  
    messagingSenderId: "738077043941",
  
    appId: "1:738077043941:web:7aa13f593368c5a71cb80c"
  
  };
  

// Initialize Firebase and Firebase Authentication
export const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export {auth}