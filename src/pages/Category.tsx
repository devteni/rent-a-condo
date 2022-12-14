import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where, orderBy, limit, startAfter, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import { useParams } from 'react-router-dom';
import { db } from '../lib/firebase';
import { toast } from 'react-toastify';
import Spinner from '../components/shared/Spinner';
import ListingItem from '../components/listings/ListingItem';


type Listing = {
    id: string | number,
    data: any
}

const Category = () => {
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastFetchedListing, setLastFetchedListing] = useState<QueryDocumentSnapshot<DocumentData>>();
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalListings, setTotalListings] = useState(0);

    const params = useParams();

    const onDelete = () => {
        return null
    }

    useEffect(() => {
      const fetchListings = async () => {
        try {
            // Get reference 
            const listingsRef = collection(db, 'listings');

            // Create a query
            const q = query(listingsRef, where
                        ('type', '==', params.name), 
                        orderBy('timestamp', 'desc'), 
                        limit(10));
            
            // Execute query
            const querySnap = await getDocs(q);

            if(querySnap.docs.length > itemsPerPage) {
                console.log(querySnap.docs.length);
                const lastVisible = querySnap.docs[querySnap.docs.length - 1];
                setLastFetchedListing(lastVisible);
            }

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

    }, [params.name])

    // Paginations/Load more listings
    const loadMoreListing = async () => {
        try {
            // Get reference 
            const listingsRef = collection(db, 'listings');

            // Create a query
            const q = query(listingsRef, where
                        ('type', '==', params.name), 
                        orderBy('timestamp', 'desc'), 
                        startAfter(lastFetchedListing),
                        limit(itemsPerPage));
            
            // Execute query
            const querySnap = await getDocs(q);
            
            if(querySnap.docs.length > itemsPerPage) {
                console.log(querySnap.docs.length);
                const lastVisible = querySnap.docs[querySnap.docs.length - 1];
                setLastFetchedListing(lastVisible);
            }


            const listings: any = [];
            querySnap.forEach((doc) => {
                console.log(doc.data())
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            });

            setListings((prev) => ([...prev, listings]));
            setLoading(false);
        } catch(error) {
            toast.error('Could not fetch listings');
        }
      }
    
  return (
    <div className='category'>
        <header>
            <p className='page-header'>
                {params.name === 'rent' ? 'Places For Rent' : 'Places For Sale'} 
            </p>
        </header>

        {
            loading ? <Spinner /> : listings && listings.length > 0 ? 
            <>
                <main>
                    <ul className='category-listings'>
                        {listings.map((listing, idx) => (
                            <ListingItem key={idx} listing={listing.data} id={listing.id} onDelete={onDelete}/>
                        ))}
                    </ul>
                </main>
                <br />
                <br />

                {/* USE TOTAL LISTING COUNT TO DETERMINE PAGINATION */}
                {console.log(lastFetchedListing?.data())}
                { lastFetchedListing?.data() && 
                    <p className='load-more' onClick={loadMoreListing}>
                        Load more
                    </p>
                }
            </> : <p>No listings for {params.name}</p>
        }
    </div>
  )
}

export default Category