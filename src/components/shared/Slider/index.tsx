import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'; 

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { db } from '../../../lib/firebase';
import Spinner from '../Spinner';


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


const Slider = () => {
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState<Array<QueryDocumentSnapshot<DocumentData>>>();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            const listingsRef = collection(db, 'listings');
        const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));

        const querySnap = await getDocs(q);

        let listings: any = [];

        querySnap.forEach((doc) => {
            return listings.push(doc);
        })

        setListings(listings);
        setLoading(false);
        }

        fetchListings();

    }, [])

    if(loading) {
        return <Spinner />
    }


    if (listings?.length === 0) {
        return <></>
    }

    return listings! && (
        <div>
            <p className="explore-heading">Recommended</p>
            
            <Swiper slidesPerView={1} pagination={{clickable: true}}>
                { listings.map((listing, idx) => {
                    //console.log(listing.data().imgUrls[0])

                    return <SwiperSlide key={idx} onClick={() => navigate(`/category/${listing.data().type!}/${listing.id}`)}>
                            <div 
                                style={{ background: `url(${listing.data().imgUrls[0]!}) center no-repeat`}} 
                                className='swiper-slide-div'
                            >
                                <p className="swiper-slide-text">
                                    {listing.data().name}
                                </p>
                                <p className="swiper-slide-price">
                                    ${listing.data().discountedPrice ?? listing.data().regularPrice}
                                    {' '}
                                    {listing.data().type === "rent" && '/month'}
                                </p>

                            </div>
                        </SwiperSlide>
                })}
            </Swiper>
        </div>
    )
};

export default Slider;