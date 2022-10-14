import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore'
import Card from '../components/shared/Card';
import FormInput from '../components/shared/FormInput';
import { toast } from 'react-toastify';

import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";


import '../styles/profile.css';

type FormData = {
  name: string | undefined | null,
  email: string | undefined | null
}

function Profile() {
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: auth.currentUser?.displayName, 
    email: auth.currentUser?.email
  });

  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  }

  const onSubmit = async () => {
    try {
      if(auth.currentUser?.displayName !== name) {
        // update display name in firebase
        updateProfile(auth.currentUser!, { displayName: name });

        const userRef = doc(db, 'users', auth.currentUser?.uid!);
        await updateDoc(userRef, { name });
      }
    } catch (error: unknown) {
      console.log(error)
      toast.error('Could not update profile details');
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }));
  }

  return (
    <div>
      <header className='profileHeader'>
        <h2 className='pageHeader'>
          My Profile
        </h2>
        <button type='button' className='logOut' onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">
            Personal Details
          </p>
          <p className="changePersonalDetails" onClick={ () => {
            changeDetails && onSubmit()
            setChangeDetails((prevState) => !prevState)
            }}>
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <Card className='profile-card'>
            <form>
              <FormInput 
                type="text" 
                name="name" 
                className={!changeDetails ? 'profileName' : 'profileNameActive'} 
                disabled={!changeDetails}
                value={name!}
                onChange={onChange}
                />

              <FormInput 
                type="email" 
                name="email" 
                className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} 
                disabled={!changeDetails}
                value={email!}
                onChange={onChange}
                />
            </form>
        </Card>

        <Link to="/create-listing" className='create-listing'>
          <img src={homeIcon} alt="home" />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>
      </main>
    </div>
  )
}

export default Profile