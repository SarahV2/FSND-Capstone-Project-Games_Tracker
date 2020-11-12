import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';


const PrivateRoute = ({component: Component}) =>{
    const { user, isAuthenticated,isLoading } = useAuth0();
    const userRole = user && user['http://demozero.net/roles'][0];
    console.log(userRole);
  
  
return (
    <Route render={props=>!isAuthenticated&&!isLoading?(<Redirect to='/games'/>):
(<Component {...props}/>)}/>
)
}

export default PrivateRoute