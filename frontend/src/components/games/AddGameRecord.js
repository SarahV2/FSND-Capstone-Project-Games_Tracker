import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {addGameRecord} from '../../utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faPlusCircle);
const AddGameRecord =(props)=> {
    const { user, isAuthenticated, isLoading } = useAuth0();
     const currentGame=props.game
    console.log(props)


        return (
            <div>
           { isAuthenticated? <FontAwesomeIcon icon='plus-circle' onClick={()=>addGameRecord(currentGame.id,user.email)}/>:''}
           </div>
        )
    
} 
export default AddGameRecord;
