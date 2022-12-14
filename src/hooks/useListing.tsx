import { doc, DocumentData, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../lib/firebase';

const listingDefault = {
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    imgUrls: [],
    latitude: 0,
    longitude: 0
  }

const useListing = ({ listingId }: any) => {
    const [listing, setListing] = useState<DocumentData>(listingDefault);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
          setLoading(true);
          const docRef = doc(db, 'listings', listingId!);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            // //console.log(docSnap.data());
            setListing({ ...docSnap.data(), userRef: auth.currentUser?.uid });
            setLoading(false);
          }
        } 
  
        fetchListing();
      }, [listingId])
    
    //console.log(listing)

  return { loading, listing }
}

export default useListing