import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';


const ProtectedRoute = ({component: Component}) =>{
    const { user, isAuthenticated,isLoading } = useAuth0();
    const userRole = user && user['http://demozero.net/roles'][0];
    const isAdmin=(userRole==='admin')
    console.log(isAdmin)
  
  
return (
    <Route render={props=>!isLoading&&!isAdmin?(<Redirect to='/games'/>):
(<Component {...props}/>)}/>
)
}


export default ProtectedRoute