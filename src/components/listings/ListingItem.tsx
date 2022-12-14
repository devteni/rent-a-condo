import React from 'react'
import { Link } from 'react-router-dom';

import { ReactComponent as DeleteIcon} from '../../assets/svg/deleteIcon.svg';
import { ReactComponent as EditIcon} from '../../assets/svg/editIcon.svg';
import bedIcon from '../../assets/svg/bedIcon.svg';
import bathtubIcon from '../../assets/svg/bathtubIcon.svg';
import { convertToMoney } from '../../lib/utils';

type Props = {
    id: string | number,
    listing: { 
        name: string, 
        type: string, 
        imgUrls: Array<string>,
        location: string,
        price: string | number,
        discountedPrice: string | number,
        regularPrice: string | number,
        offer: boolean,
        bedrooms: number,
        bathrooms: number
    },
    onDelete?: (id: string|number, name?: string) => void,
    onEdit?: (id: string|number) => void,
}

const ListingItem: React.FC<Props> = ({ listing, id, onDelete, onEdit}) => {
  return (
    <li className='category-listing'>
        <Link to={`/category/${listing.type}/${id}`} className="category-listing-link">
            <img src={listing.imgUrls[0]} alt={listing.name} className='category-listing-img'/>

            <div className='category-listing-details'>
                <p className='category-listing-location'>{listing.location}</p>
                <p className='category-listing-name'>{listing.name}</p>
                <p className='category-listing-price'>
                    ${listing.offer ? convertToMoney(listing.discountedPrice) : convertToMoney(listing.regularPrice)}

                    {listing.type === 'rent' && '/ Month'}
                </p>

                <div className='category-listing-infodiv'>

                    <img src={bedIcon} alt="bed" />
                    <p className='category-listing-infotext'>
                        {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms`: '1 Bedroom'}
                    </p>
                
                    <img src={bathtubIcon} alt="bath" />
                    <p className='category-listing-infotext'>
                        {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms`: '1 Bathroom'}
                    </p>
                </div>
            </div>
        </Link>

        {onDelete && (
                <DeleteIcon className='remove-icon' fill='rgb(231, 76, 60)' onClick={() => onDelete(id, listing.name)}/>
        )}
        {onEdit && (
            <EditIcon className='edit-icon' fill='rgb(76, 60, 231)' onClick={() => onEdit(id)}/>
        )}
    </li>
  )
}

export default ListingItem