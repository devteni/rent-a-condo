import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", password: ""
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

              <img 
                src={visibilityIcon} 
                alt="show password"
                className='show-password' 
                onClick={() => setShowPassword((prev) => !prev)}
              />
          </div>

          <div className="signup-bar">
            <p className="signup-text">
              Sign In
            </p>
            <button className="signup-btn">
              <ArrowRightIcon fill='#fff' width='34px' height='34px'/>
            </button>
          </div>
        </form>

        {/* Google OAuth */}
        <Link to='/sign-in' className='register-link'>
          Sign In Instead
        </Link>
        
      </div>
    </>

  )
}

export default SignUp;