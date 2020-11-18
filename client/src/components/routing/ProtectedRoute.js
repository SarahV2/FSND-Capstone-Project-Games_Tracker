import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from '../../utils/loading.gif';
let finalToken = '';
const ProtectedRoute = ({ component: Component ,location, match, ...rest }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
 // const { getAccessTokenSilently } = useAuth0();
//console.log(location)

  // getToken(getAccessTokenSilently).then((data) => {
  //   setToken(data);
  // });

  const userRole = user && user['http://demozero.net/roles'][0];
  const isAdmin = userRole === 'admin';
  console.log(isAdmin);
  //console.log('all state',props)

  return (
    <Route
      render={(props) =>
        !isLoading && !isAuthenticated ? (
          <Redirect to='/games' />) 
          :props.token != '' ? 
          (<Component {...props} {...rest } />)
         : (
          <img src={Spinner} />
        )
      }
    />
  );
};

// const getToken = async (getAccessTokenSilently) => {
//   const token = await getAccessTokenSilently({ audience: 'vdtracker' });

//   return token;
// };

// const setToken = (token) => {
//   finalToken = token;
// };

export default ProtectedRoute;
