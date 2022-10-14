import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { useParams } from 'react-router-dom';
import { db } from '../lib/firebase';
import { toast } from 'react-toastify';
import Spinner from '../components/shared/Spinner';
import ListingItem from '../components/listings/ListingItem';


type Listing = {
    id: string | number,
    data: any
}

const Offers = () => {
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      const fetchListings = async () => {
        try {
            // Get reference 
            const listingsRef = collection(db, 'listings');

            // Create a query
            const q = query(listingsRef, 
                      where
                        ('offer', '==', true), 
                        orderBy('timestamp', 'desc'), 
                        limit(10));
            
            // Execute query
            const querySnap = await getDocs(q);
            const listings: Listing[] = [];
            querySnap.forEach((doc) => {
                console.log(doc.data())
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            });

            setListings(listings);
            setLoading(false);
        } catch(error) {
            toast.error('Could not fetch listings');
        }
      }
      fetchListings()

    }, [])
    
  return (
    <div className='category'>
        <header>
            <p className='page-header'>
              Offers
            </p>
        </header>

        {
            loading ? <Spinner /> : listings && listings.length > 0 ? 
            <>
                <main>
                    <ul className='category-listings'>
                        {listings.map((listing) => (
                            <ListingItem 
                              id={listing.id} 
                              listing={listing.data} 
                              />
                        ))}
                    </ul>
                </main>
            </> : <p>There are no current offers</p>
        }
    </div>
  )
}

export default Offers;