import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "", password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState, [e.target.id]: e.target.value
    }))
  }

  return (
    <>
      <div className="page-container">
        <header>
          <p className='page-header'>Welcome back</p>
        </header>

        <form>
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

              <img 
                src={visibilityIcon} 
                alt="show password"
                className='show-password' 
                onClick={() => setShowPassword((prev) => !prev)}
              />
          </div>

          <Link to='/forgot-password' className='forgot-password-link'> Forgot Password </Link>

          <div className="signin-bar">
            <p className="signin-text">
              Sign In
            </p>
            <button className="signin-btn">
              <ArrowRightIcon fill='#fff' width='34px' height='34px'/>
            </button>
          </div>
        </form>

        {/* Google OAuth */}
        <Link to='/sign-up' className='register-link'>
          Sign Up Instead
        </Link>
      </div>
    </>

  )
}

export default SignIn