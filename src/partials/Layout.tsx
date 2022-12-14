import { Navigate, useLocation, useOutlet } from 'react-router-dom';
import Container from '../components/shared/Container';
import Spinner from '../components/shared/Spinner';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { privateRoutes } from '../routes';

const Layout = () => {
  const { loggedIn, loading } = useAuthStatus();
  const location = useLocation();
  const outlet = useOutlet();

  //console.log(loggedIn, loading)

  if(loading) {
    return <Container className='center-element'>
            <Spinner />
          </Container>
  }

  // if location.pathname in privateRoutes, and loggedIn == false, redirect to sign-in page
  
  if (!loggedIn && privateRoutes.find(({ path }) => location.pathname === path)) {
    return <Navigate to='/sign-in'/>;
  }

  return <Container>{outlet}</Container>
}

export default Layout;