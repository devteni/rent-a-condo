import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import Card from '../../components/shared/Card/';
import Button from '../../components/shared/Button';
import "./auth.css"

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "", password: ""
  });

  const passwordRef = useRef<HTMLElement>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState, [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent ) => {
    try {
      e.preventDefault();

      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
  
      if (userCredential.user) {
        navigate('/');
      }

    } catch(error) {
      toast.error('Bad User Credentials');
    }
  }

  return (
    <>
      <Card className='auth'>
          <>
          <section className='form-header'>
             <span>Welcome back</span><br />
             <small>Sign in to your account to continue</small>
          </section>

          <form onSubmit={handleSubmit}>
            <input
              type='email' 
              className='email-input'
              placeholder='Email'
              id='email'
              value={formData.email}
              onChange={(e) => handleChange(e)}
              />
            
            <div className="password-input-div">
              <input type={showPassword ? 'text' : 'password' }
                className='password-input'
                placeholder='Password' 
                id='password'
                value={formData.password}
                onChange={(e) => handleChange(e)}
              />

              <span role='button' className='password-toggler' ref={passwordRef} onClick={() => {
                if (passwordRef.current != null && passwordRef.current.innerText === 'Show') {
                  passwordRef.current.innerText = 'Hide';
                  setShowPassword(false);
                }
                else if (passwordRef.current != null) {
                  passwordRef.current.innerText = 'Show';
                  setShowPassword(true)
                }
                }}>
                Show
              </span> 
            </div>

            <Link to='/forgot-password' className='forgot-password-link'><small>Forgot Password? </small></Link>

            <Button className='signin-bar'>Sign In</Button>
          </form>

          {/* Google OAuth */}
          <Link to='/sign-up' className='register-link'>
            Sign Up Instead
          </Link>
        </>
      </Card>
      
    </>
  )
}

export default SignIn