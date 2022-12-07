import React, { LazyExoticComponent, ReactNode } from 'react';
import Explore from '../pages/Explore';
import Offers from '../pages/Offers';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Profile from '../pages/Profile';
import Category from '../pages/Category';
import CreateListing from '../pages/CreateListing';
import Listing from '../pages/Listing';
import Contact from '../pages/Contact';


const publicRoutes = [
    {   
        path: "/",
        element: <Explore />
    },
    { 
        path: "/sign-in",
        element: <SignIn />
    },
    { 
        path: "/sign-up",
        element: <SignUp />
    },
    { 
        path: "/offers",
        element: <Offers />
    },
    { 
        path: "/category/:name",
        element: <Category />
    },
    { 
        path: "/category/:name/:listingId",
        element: <Listing />
    },
    { 
        path: "/contact/:landlordId",
        element: <Contact />
    },
    { 
        path: "/forgot-password",
        element: <ForgotPassword />
    },
]

const privateRoutes = [ 
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/create-listing",
        element: <CreateListing />
    },

];

export { privateRoutes, publicRoutes };