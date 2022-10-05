import { useState } from 'react'
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

import { auth } from '../../lib/firebase';
import { ReactComponent as ArrowRightIcon } from '../../assets/svg/keyboardArrowRightIcon.svg';
import FormInput from '../../components/shared/FormInput';
import Button from '../../components/shared/Button';

function ForgotPassword() {
  const [email, setEmail] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent');

    } catch (error:unknown) {
      toast.error('Could not send password reset email');
    }
  }
   
  return (
    <div>
        <header>
            <h1 className='pageHeader'>Forgot Password</h1>
        </header>

        <main>
          <form onSubmit={onSubmit}>
            <FormInput
                type='email' 
                name='email'
                className='email-input'
                placeholder='Email'
                value={email}
                onChange={onChange}
              />
              <Link 
                className='forgot-password-link'
                to='/sign-in'>
                  Sign In
              </Link>

              <div className="signin-bar">
                <div className="signin-text">
                  Send Reset Link
                </div>
                <Button>
                  <ArrowRightIcon 
                    fill='#fff'
                    width="34px"
                    height="34px"
                  />
                </Button>
            </div>
          </form>
        </main>
    </div>
  )
}

export default ForgotPassword
