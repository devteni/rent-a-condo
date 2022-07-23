import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  updateProfile } from 'firebase/auth';
import { db } from '../../firebase.config';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", password: ""
  });

  const passwordRef = useRef<HTMLElement>(null);


  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState, [e.target.id]: e.target.value
    }))
  }

  return (
    <>
      <Card className='auth'>
        <>
          <section className='form-header'>
              <span>Welcome back</span><br />
              <small>Sign in to your account to continue</small>
          </section>

          <form>
            <input
            type='text' 
            className='name-input'
            placeholder='Name'
            id='name'
            value={formData.name}
            onChange={(e) => handleChange(e)}
              />

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

            <Button className='signup-bar'>
                Sign Up
            </Button>
        </form>
        
        {/* Google OAuth */}
        <Link to='/sign-in' className='register-link'>
          Sign In Instead
        </Link>  
        </>
      </Card>
    </>
  )
}

export default SignUp;