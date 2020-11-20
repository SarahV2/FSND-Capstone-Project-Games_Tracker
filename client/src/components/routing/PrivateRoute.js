import React, {useState, useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from '../../utils/loading.gif';
import { getUserGames, getUserRecords } from '../../utils/api';

let finalToken = '';
let userEmail=''
//let userRecords=[]
const PrivateRoute = ({ component: Component,location, match, token, userRecords, ...rest }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
    // const { getAccessTokenSilently } = useAuth0();
    // getToken(getAccessTokenSilently).then((data) => {
    //     setToken(data);
     
    //   });
//console.log(props)
   // const [userRecords,setRecords]=useState([])
//console.log(token)
// console.log('reeeeeee',userRecords)
  const userRole = user && user['http://demozero.net/roles'][0];
 // console.log(userRole);
   const isGamer = userRole == 'gamer';
  //console.log(isGamer);


  useEffect(() => {
    (async () => {
      try {
        // const token = await getAccessTokenSilently({
        //   audience: 'vdtracker',
        // });
        //console.log(token)
        //setTokenValue(token);
        // if (!isLoading) {
        //   //setEmail(user.email);
        //   if (isGamer) {
        //     const recordz = await getUserGames(user.email, token)
        //     console.log('recordzzzz', recordz.userGames)
        //     setRecords(recordz.userGames)

        //     // const recordz = await getUserGames(user.email, token)
        //     // console.log('recordzzzz', recordz.userGames)
        //     // setRecords(recordz.userGames)
        //     // getUserGames(user.email, token).then((data) => {
        //     //   if (data.userGames) { //get it from the props
        //     //     setRecords(data.userGames)
        //     //     console.log('hello?')
        //     //   }
        //     // });
        //   }
        // }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);



  // if (isGamer){

  // }
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
// let me=userRecords
  return (
    <Route
      render={(props) =>
        !isLoading&& !isGamer ? (
          <Redirect to='/' />
        ) :
        props.token!=''? 
        (
          <Component userRecords={userRecords} token={token} {...props} {...rest} />
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

// const setRecords=(records)=>{
//   userRecords=records;
//   console.log('yay invoked!')
// }

export default PrivateRoute;
