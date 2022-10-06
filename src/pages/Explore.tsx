import React from 'react'
import { Link } from 'react-router-dom';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';



function Explore() {
  return (
    <div className='explore'>
      <header>
        <h1>Explore</h1>
      </header>

      <main>
        {/* Slider */}

        <p className="explore-category-heading">
          Categories
        </p>
        <div className="explore-categories">
          <Link to="/category/rent">
            <img
             src={rentCategoryImage}
             alt="rent" 
             className='explore-category-img'
             />
             <p className="explore-category-name">
              Places for rent
             </p>
          </Link>
          <Link to="/category/sale">
            <img
             src={sellCategoryImage}
             alt="sell" 
             className='explore-category-img'
             />
             <p className="explore-category-name">
              Places for sale
             </p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore