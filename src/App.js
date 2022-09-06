import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Profile from './pages/Profile'
import Register from './Register'
import VerifyEmail from './VerifyEmail';
import Login from './Login'

import {AuthProvider} from './AuthContext'
import {useState, useEffect} from 'react'
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import PrivateRoute from './PrivateRoute'
import ResetPassword from './ResetPassword';
import Home from "./Home";


function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
     })
  }, [])
  return (
    <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
      <Switch>
        <PrivateRoute exact path="/" component={Profile} />
          <Route exact path="/Home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path='/verify-email' component={VerifyEmail} />
        <Route exact path='/ResetPassword' component={ResetPassword} />
      </Switch>
      </AuthProvider>
  </Router>
  );
}

export default App;
