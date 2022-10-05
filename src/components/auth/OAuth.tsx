import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { toast } from 'react-toastify';
import googleIcon from '../../assets/svg/googleIcon.svg';
import Button from '../shared/Button';

const OAuth = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const onGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();

            const result = await signInWithPopup(auth, provider);

            const user = result.user;

            const docRef = doc(db, 'users', user.uid);
            const existingUser = await getDoc(docRef);

            // if user doesn't exist
            if(!existingUser.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                });
            }

            navigate('/');
            
        } catch (error: unknown) {
            toast.error('Could not authorize with Google');
        }
    }

  return (
    <div className='social-login'>
        <p>
            Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with 
        </p>
        <Button className='social-icon-div' onClick={onGoogleClick}>
            <img src={googleIcon} alt="google" className='social-icon-img'/>
        </Button>
    </div>
  )
}

export default OAuth