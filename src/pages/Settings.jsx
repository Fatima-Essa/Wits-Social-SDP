import './settings.css'
import {setDoc, doc} from "firebase/firestore";
 import { collection, query , where, getDocs} from "firebase/firestore";
import {useContext, useState} from 'react'



import { firestore} from "../firebase/config";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";




const Settings = () => {

    // declare variables
    const [username, setUsername] = useState("");
    const [newBio, setNewBio] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [bio, setBio] = useState("");
    const [userDocId, setUserDocId] = useState("");
    const db = firestore;
    const { user } = useContext(AuthContext);


    // fetches username from firestore to be displayed on profile page
    async function getUsername() {

        let dbUsername;
        let dbBio;
        const q = query(collection(db, "user"), where("userId", "==", user.uid ));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            dbUsername =  doc.data()["username"];
            dbBio = doc.data()["biography"];

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
            const docRef =  doc(db, "user", userDocId);
            setDoc(docRef, {biography: newBio}, { merge: true });
        }

    }

    const updateUsername = e => {
        e.preventDefault()

        if (newUsername !== "")  // checks that a change has actually been made
        {
            const docRef =  doc(db, "user", userDocId);
            setDoc(docRef, {username: newUsername}, { merge: true });
        }

    }



    return (
        <>
        <Header/>

        <div className='center'>
            <div className = 'profile-heading'>
                <h1 className= "settings">Settings</h1>
                <div className='profile'>
                    <p>My bio</p>
                    <form onSubmit={updateBio} name='Bio editor'>

                  <textarea
                      rows="8"
                      cols="50"
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

                    <form onSubmit={updateUsername} name='Bio editor'>
                  <textarea
                      rows="1"
                      cols="50"
                      className="bio-form"
                      value={newUsername}
                      placeholder= {username}
                      onChange={e => setNewUsername(e.target.value)}
                  />
                        <button
                            className= "update-bio-button"
                            type='submit'
                        >Update username</button>
                    </form>
                </div>
            </div>
        </div>

    </>

    )
}

export default Settings
