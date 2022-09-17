import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import { toast } from 'react-toastify';
import FormInput from '../../components/shared/FormInput';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", password: ""
  });

  const passwordRef = useRef<HTMLElement>(null);


  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      const user = userCredential.user;
      
      updateProfile(auth.currentUser!, {
        displayName: formData.name
      });

      // Remove password from form data and add a timestamp to the object
      let formDataCopy = { ...formData };
      const { password, ...rest} = formDataCopy;
      let data = { timestamp: serverTimestamp(), ...rest };
      
      // Add user to db
      await setDoc(doc(db, 'users', user.uid), data);

      navigate('/');

    } catch(error) {
      toast.error('Something went wrong')
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
            <FormInput
              type='text' 
              className='name-input'
              placeholder='Name'
              name='name'
              value={formData.name}
              onChange={(e) => handleChange(e)}
              />

            <FormInput
              type='email' 
              className='email-input'
              placeholder='Email'
              name='email'
              value={formData.email}
              onChange={(e) => handleChange(e)}
              />
            
            <div className="password-input-div">
              <FormInput type={showPassword ? 'text' : 'password' }
                className='password-input'
                placeholder='Password' 
                name='password'
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