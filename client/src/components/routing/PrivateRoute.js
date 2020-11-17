import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from '../../utils/loading.gif';
let finalToken = '';
let userEmail=''
const PrivateRoute = ({ component: Component, location, match, ...rest }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
    // const { getAccessTokenSilently } = useAuth0();
    // getToken(getAccessTokenSilently).then((data) => {
    //     setToken(data);
     
    //   });

  const userRole = user && user['http://demozero.net/roles'][0];
  console.log(userRole);
   const isGamer = userRole == 'gamer';
  console.log(isGamer);
//   if(isAuthenticated){
//   setEmail(user.email);
//   }

  return (
    <Route
      render={(props) =>
        !isLoading&& !isGamer ? (
          <Redirect to='/games' />
        ) :
         props.email != '' ? 
        (
          <Component  {...props} {...rest} />
        ) 
        : (<img src={Spinner} />)
      }
    />
  );
};

// const getToken = async (getAccessTokenSilently) => {
//     const token = await getAccessTokenSilently({ audience: 'vdtracker' });
  
//     return token;
//   };
  
//   const setToken = (token) => {
//     finalToken = token;
//   };
  
//   const setEmail=(email)=>{
//       userEmail=email
//   }

export default PrivateRoute;
