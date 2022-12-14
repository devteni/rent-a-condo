import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { updateProfile } from 'firebase/auth';
import { updateDoc, doc, collection, query, where, orderBy, getDocs, QueryDocumentSnapshot, DocumentData, deleteDoc } from 'firebase/firestore'
import Card from '../components/shared/Card';
import FormInput from '../components/shared/FormInput';
import { toast } from 'react-toastify';

import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";


import '../styles/profile.css';
import ListingItem from '../components/listings/ListingItem';

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

  const [listings, setListings] = useState<any>();
  const [loading, setLoading] = useState(false);

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
      //console.log(error)
      toast.error('Could not update profile details');
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }));
  }

  useEffect(() => {
    const fetchUserListings = async () => {
      setLoading(true);
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, where('userRef', '==', auth.currentUser?.uid), orderBy('timestamp', 'desc'));

      const querySnap = await getDocs(q);

      let listings: any = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        });
      })

      setListings(listings)
      setLoading(false)
    };

    fetchUserListings();
  }, [auth.currentUser?.uid]);

  const onDelete = async (listingId: any, name: any) => {
    if(window.confirm(`Are you sure you want to delete ${name}?`)) {
      await deleteDoc(doc(db, 'listings', listingId));
      const updatedListings = listings.filter((listing: { id: string, data: any }) => listing.id !== listingId);
      setListings(updatedListings);
      toast.success('Successfully deleted listing');
    }
  }

  const onEdit = async (listingId: any) => {
    navigate(`/edit-listing/${listingId}`);
  }

  return (
    <div className='profile'>
      <header className='profile-header'>
        <h2 className='page-header'>
          My Profile
        </h2>
        <button type='button' className='logout' onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className="profile-details-header">
          <p className="profile-details-text">
            Personal Details
          </p>
          <p className="change-personal-details" onClick={ () => {
            changeDetails && onSubmit()
            setChangeDetails((prevState) => !prevState)
            }}>
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <Card>
            <form>
              <FormInput 
                type="text" 
                name="name" 
                className={!changeDetails ? 'profile-name' : 'profile-name-active'} 
                disabled={!changeDetails}
                value={name!}
                onChange={onChange}
                />

              <FormInput 
                type="email" 
                name="email" 
                className={!changeDetails ? 'profile-email' : 'profile-email-active'} 
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

        {
          !loading && listings?.length> 0 && (
            <>
              <p className="listing-text">
                Your Listings
              </p>
              <div>
                { listings?.map((listing: any, idx: number) => (
                  <ListingItem 
                    key={idx} 
                    id={listing.id} 
                    listing={listing.data} 
                    onDelete={onDelete} 
                    onEdit={onEdit}
                    />
                ))}
              </div>
            </>
          )
        }
      </main>
    </div>
  )
}

export default Profile