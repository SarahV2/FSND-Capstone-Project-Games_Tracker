import React, { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
//import { addGameRecord } from '../../utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { addGameToList } from '../../utils/api';
//import { getUserRecords } from '../../utils/api';
//import { getUserGames } from '../../utils/api';

library.add(faPlusCircle);
let records = []

const AddGameRecord = (props) => {
  const { user } = useAuth0();
  const currentGame = props.game
  const [ready, setReadyStatus] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const userRole = user && user['http://demozero.net/roles'][0];
  const isGamer = userRole == 'gamer';

  useEffect(() => {
    (async () => {
      try {
        if (props.token) {
          console.log('in addddddd', props)
          if (isGamer) {
            //let records = await getUserGames(user.email, props.token)
            //records = records.userGames
            let records = JSON.parse(localStorage.getItem('userRecords'));

            setRecords(records)
            if (Array.isArray(getRecords())) {
              setReadyStatus(true)

            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  
 if (refresh){
    return (<p><a href='/games/mygames'>Edit</a></p>)
 }


  return (
    <div>{ready ?
      <div> <div>{!checkAddStatus(getRecords(), currentGame.id)? <FontAwesomeIcon className='addButton' icon='plus-circle' onClick={() => {handleAddGame(currentGame.id, user.email, props.token); setRefresh(true)}} />
        : <p><a href='/games/mygames'>Edit</a></p>}</div>
      </div> : ''}
    </div>
  )


}


const checkAddStatus = (arr, currentGameID) => {
  const filteredList = arr.filter((record) => {
    console.log('hello current game', currentGameID)
    return record.game_id === currentGameID;
  });

  if (filteredList.length > 0) {
    return true //already listed
  }
  else {
    return false
  }
}


const setRecords = (rec) => {
  records = rec
}

const getRecords = () => {
  return records
}



const  handleAddGame = (gameID, email, token) => {
  addGameToList(gameID, email, token)
}

export default AddGameRecord;
