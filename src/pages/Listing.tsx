import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc, DocumentData } from 'firebase/firestore';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';

import { auth, db } from '../lib/firebase';
import { convertToMoney } from '../lib/utils';
import Spinner from '../components/shared/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


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


const Listing = () => {
    const [listing, setListing] = useState<DocumentData>(listingDefault);
    const [loading, setLoading] = useState(false);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);

    const navigate = useNavigate();
    const { listingId } = useParams();

    // HANDLE LISTING-NOT-FOUND CASE
    useEffect(() => {
      const fetchListing = async () => {
        setLoading(true);
        const docRef = doc(db, 'listings', listingId!);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log(docSnap.data());
          setListing(docSnap.data());
          setLoading(false);
        }
      } 

      fetchListing();
    }, [navigate, listingId])

    if (loading) {
      return <Spinner />
    }
    
  return (
    <main>
      {/* SLIDER */}
      <Swiper
        slidesPerView={1}
        pagination={{clickable: true}}
        >
          { listing?.imgUrls.map((url: string, idx: number) => (
            <SwiperSlide key={idx}>
              <div style={{ 
                background: `url(${listing?.imgUrls[idx]}) center no-repeat`,
                backgroundSize: 'cover'
              }}
               className="swiper-slide-div"
              >
                
              </div>
            </SwiperSlide>
          ))}

      </Swiper>

      {/* SHARE ICON */}
      <div className="share-icon" onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        setShareLinkCopied(true);
        setTimeout(() => {
          setShareLinkCopied(false);
        }, 2000);
      }}>
        <img src={shareIcon} alt="share-icon" />
      </div>

      {
        shareLinkCopied && <p className='link-copied'>Link Copied!</p>
      }

      <div className="listing-details">
        <p className="listing-name">
          {listing?.name} - ${listing?.offer ? convertToMoney(listing?.discountedPrice) : convertToMoney(listing?.regularPrice)}
        </p>
      </div>

      <p className="listing-location">
        {listing.address}
      </p>
      <p className="listing-type">
        For {listing.type === "rent" ? 
              "Rent" : 
              "Sale"
              }
      </p>
      {listing.offer && (
        <p className="discount-price">
          ${listing.regularPrice - listing.discountedPrice} discount
        </p>
      )}

      <ul className="listing-details-list">
        <li>
          { listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
        </li>
        <li>
          { listing.bathrooms > 1 ? `${listing.bathrooms} Bathroom` : '1 Bathrooms'}
        </li>
        <li>
          { listing.parking && 'Parking Spot'}
        </li> 
        <li>
          { listing.furnished && 'Furnished'}
        </li>        
      </ul>

      <p className="listing-location-title">
        Location
      </p>
      

      { auth.currentUser?.uid !== listing.userRef && (
        <Link 
          to={`/contact/${listing.userRef}?listingName=${listing.name}&listinLocation=${listing.address}`}
          className='btn btn-primary'
          >
            Contact Landlord
        </Link>
      )}
    </main>
  )
}

export default Listing