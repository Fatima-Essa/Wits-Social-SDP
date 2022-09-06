import {useState} from 'react'
import './forms.css'
import { Link } from 'react-router-dom'
import { getAuth , sendPasswordResetEmail} from 'firebase/auth'


function ResetPassword() {

  const [email, setEmail] = useState('')
  const auth = getAuth();

  //send email for password reset to user
  const triggerResetEmail = async () => {
    await sendPasswordResetEmail(auth, email);
    //return once email is sent
    console.log("Password reset email sent")
  }
 
  return (
    <div className='center'>
    <div className='auth'>
      <h1>Reset Password</h1>
      <form onSubmit={ResetPassword} name='login_form'>
        <input 
          type='email' 
          value={email}
          required
          placeholder="Enter your email"
          onChange={e => setEmail(e.target.value)}/>
        <button className="resetBtn" type="button" onClick={triggerResetEmail}>Reset password</button>
      </form>
      <p>
           Oops i want to go back! 
          <Link to='/login'>Click here</Link>
        </p>
    </div>
  </div>
  )
}

export default ResetPassword;