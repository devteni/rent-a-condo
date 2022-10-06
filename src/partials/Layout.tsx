import React from 'react';
import { Navigate, Outlet, useLocation, useOutlet } from 'react-router-dom';
import Spinner from '../components/shared/Spinner';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { privateRoutes } from '../routes';

type Props = {
    children?: JSX.Element
}

const Layout = () => {
  const { loggedIn, loading } = useAuthStatus();
  const location = useLocation();
  const outlet = useOutlet();

  console.log(loggedIn, loading)

  if(loading) {
    return <Spinner />
  }

  // if location.pathname in privateRoutes, and loggedIn == false, redirect to sign-in page
  if (privateRoutes.find(({ path }) => location.pathname === path) && !loggedIn) {
    return <Navigate to='/sign-in'/>;
  }

  return <div className='page-container'>{outlet}</div>
}

export default Layout;