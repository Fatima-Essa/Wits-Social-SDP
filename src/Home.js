import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Profile from './pages/Profile'

import {AuthProvider} from './AuthContext'
import {useState, useEffect} from 'react'
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import PrivateRoute from './PrivateRoute'

import Navbar from "./component/navbar";


function Home() {
    const [currentUser, setCurrentUser] = useState(null)
    const [timeActive, setTimeActive] = useState(false)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
    }, [])
    return (
        <Router>
            <Navbar />
            <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
                <Switch>
                    <PrivateRoute exact path="/" component={Profile} />
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default Home;
