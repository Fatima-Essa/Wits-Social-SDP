import {useState} from 'react'

import './forms.css'
import {app, auth} from './firebase'
import {useHistory, Link} from 'react-router-dom'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {useAuthValue} from './AuthContext'
import {addDoc, collection, getFirestore} from "firebase/firestore";


function Register() {

  //instantiating variables
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()
  const {setTimeActive} = useAuthValue()
  const db = getFirestore(app);

  //add user details to firebase realtime databse
  function addToUsersTable(username, email) {

    try {
      const docRef =  addDoc(collection(db, "users"), {
        username: username,
        email: email,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  // validate password so 'password' and 'confirm password' match
  const validatePassword = () => {
    let isValid = true
    //if both fields are not empty
    if (password !== '' && confirmPassword !== ''){
      //if passwords do not match
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  const register = e => {
    e.preventDefault()
    setError('')

    //password is validated successfully
    if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
            //verification screen is displayed
        .then((res) => {
          setTimeActive(true)
          history.push('/verify-email')
          })
        .catch(err => setError(err.message))

      //add user to user table
      addToUsersTable(username, email)

    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className='center'>
      <div className='auth'>
        <h1>Register</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={register} name='registration_form'>
          <input 
            type='email' 
            value={email}
            placeholder="Enter your email"
            required
            onChange={e => setEmail(e.target.value)}/>

          <input
              type='username'
              value={username}
              required
              placeholder='Enter a new username'
              onChange={e => setUsername(e.target.value)}
              />

          <input 
            type='password'
            value={password} 
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

            <input 
            type='password'
            value={confirmPassword} 
            required
            placeholder='Confirm password'
            onChange={e => setConfirmPassword(e.target.value)}/>

          <button type='submit'>Register</button>
        </form>
        <span>
          Already have an account?  
          <Link to='/login'>login</Link>
        </span>
      </div>
    </div>
  )
}

export default Register
