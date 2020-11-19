import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { addGameRecord } from '../../utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { addGameToList } from '../../utils/api';
import { getUserRecords } from '../../utils/api';
import { checkAddStatus } from '../../utils/helpers';

import { Link } from 'react-router-dom'
library.add(faPlusCircle);
let finalToken = '';
let userRecords=[]
let alreadyListed=false

const AddGameRecord = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const currentGame = props.game
  //const [alreadyListed, setListedValue] = useState(false)
  const [ready, setReadyStatus] = useState(false)

  const { getAccessTokenSilently } = useAuth0();
  if (isAuthenticated) {
    getToken(getAccessTokenSilently).then((data) => {
      setToken(data);
      getUserRecords(user.email, finalToken).then((data) => {
        if (data) { //get it from the props
          console.log('got eeeem')
          console.log('got',data.userGames)
          setRecords(data.userGames)
        }

      });


    });


  }

  if(userRecords.length>0){
    setListedValue(checkAddStatus(userRecords, currentGame.id));
    setReadyStatus(true)
  }
  return (
    <div>
      {ready? <div>{ isAuthenticated ? <div>{!alreadyListed ? <FontAwesomeIcon className='addButton' icon='plus-circle' onClick={() => addGameToList(currentGame.id, user.email, finalToken)} /> : <p><Link to='/games/mygames'>Edit</Link></p>}</div> : ''}</div>:<p>Waiting</p>}
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

const setRecords = (records) => {
  userRecords = records;
};

const setListedValue=(status)=>{
  alreadyListed=status
}
export default AddGameRecord;
