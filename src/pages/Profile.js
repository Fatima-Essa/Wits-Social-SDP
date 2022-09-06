import '../profile.css'
import {useAuthValue} from '../AuthContext'
import { signOut} from 'firebase/auth'
import { auth } from '../firebase'
import {getFirestore, setDoc, doc} from "firebase/firestore";
import { collection, query , where, getDocs} from "firebase/firestore";
import {useState} from 'react'

import {app} from "../firebase";

function Profile() {

    // declare variables
    const [username, setUsername] = useState("");
    const [newBio, setNewBio] = useState('')
    const [bio, setBio] = useState("");
    const [userDocId, setUserDocId] = useState("");
    const db = getFirestore(app);
    const {currentUser} = useAuthValue()

    // fetches username from firestore to be displayed on profile page
    async function getUsername() {

        let dbUsername;
        let dbBio;
        const q = query(collection(db, "users"), where("email", "==", currentUser.email ));


        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            dbUsername =  doc.data()["username"];
            dbBio = doc.data()["bio"];

            setUsername(dbUsername);
            setBio(dbBio);

            setUserDocId(doc.id)        // gets and stores doc id for later referencing
        })
    }

    getUsername();      //get username once page loads


    // updates bio to current form contents on click of button
    const updateBio = e => {
        e.preventDefault()

        if (newBio !== "")  // checks that a change has actually been made
        {
            const docRef =  doc(db, "users", userDocId);
            setDoc(docRef, {bio: newBio}, { merge: true });
        }

    }



    return (

        <div className='center'>
            <div className = 'profile-heading'>
                <h1>My Profile</h1>
                <div className='profile'>
                    <h1>{username}</h1>
                    <p>My bio</p>
                    <form onSubmit={updateBio} name='Bio editor'>
                  <textarea
                      className="bio-form"
                      value={newBio}
                      placeholder= {bio}
                      onChange={e => setNewBio(e.target.value)}
                  />
                        <button
                            className= "update-bio-button"
                            type='submit'
                        >Update bio</button>
                    </form>
                    <span onClick={() =>
                        signOut(auth)}
                    >Sign Out</span>
                </div>
            </div>
        </div>

    )
}

export default Profile
