import React, {useState} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from '../../utils/loading.gif';
import { getUserRecords } from '../../utils/api';

let finalToken = '';
let userEmail=''
let userRecords=[]
const PrivateRoute = ({ component: Component,location, match, ...rest }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
    // const { getAccessTokenSilently } = useAuth0();
    // getToken(getAccessTokenSilently).then((data) => {
    //     setToken(data);
     
    //   });
//console.log(props)
    //const [userRecords,setRecords]=useState([])
//console.log(token)

  const userRole = user && user['http://demozero.net/roles'][0];
  console.log(userRole);
   const isGamer = userRole == 'gamer';
  console.log(isGamer);

  // if(!isLoading&&isAuthenticated){
  //   getUserRecords(user.email, token).then((data) => {
  //     if (data.userGames) { //get it from the props
  //       //setRecords(data.userGames)
  //       setRecords(data.userGames)
  //       console.log('hello?',userRecords)
  //     }
  //   });
  // }
//   if(isAuthenticated){
//  setEmail(user.email);
//  }

  return (
    <Route
      render={(props) =>
        !isLoading&& !isGamer ? (
          <Redirect to='/ooo' />
        ) :
         props.email!=''? 
        (
          <Component {...props} {...rest} />
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

const setRecords=(records)=>{
  userRecords=records;
  console.log('yay invoked!')
}

export default PrivateRoute;
