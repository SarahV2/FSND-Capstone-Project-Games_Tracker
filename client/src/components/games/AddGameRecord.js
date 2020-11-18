import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {addGameRecord} from '../../utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { addGameToList } from '../../utils/api';

library.add(faPlusCircle);
let finalToken = '';

const AddGameRecord =(props)=> {
    const { user, isAuthenticated, isLoading } = useAuth0();
     const currentGame=props.game

      const { getAccessTokenSilently } = useAuth0();
if(isAuthenticated){
  getToken(getAccessTokenSilently).then((data) => {
    setToken(data);
  });
    console.log(props)
}
console.log(props.token)
        return (
            <div>
           { isAuthenticated? <FontAwesomeIcon icon='plus-circle' onClick={()=>addGameToList(currentGame.id,user.email,finalToken)}/>:''}
           </div>
        )
    
} 

const getToken = async (getAccessTokenSilently) => {
  const token = await getAccessTokenSilently({ audience: 'vdtracker' });

  return token;
};

const setToken = (token) => {
  finalToken = token;
};
export default AddGameRecord;
