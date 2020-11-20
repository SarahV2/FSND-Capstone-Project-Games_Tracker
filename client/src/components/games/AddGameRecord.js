import React, { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { addGameRecord } from '../../utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { addGameToList } from '../../utils/api';
import { getUserRecords } from '../../utils/api';
//import { checkAddStatus } from '../../utils/helpers';
import { getUserGames } from '../../utils/api';

import { Link } from 'react-router-dom'
library.add(faPlusCircle);
let finalToken = '';
// let userRecords = []
let alreadyListed = false
let recordz = []
//let refresh=false
// let ready = false
const AddGameRecord = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const currentGame = props.game
  const [alreadyListed, setListedValue] = useState(false)
  const [ready, setReadyStatus] = useState(false)
  //const [records, setRecords] = useState([])
const [refresh, setRefresh] = useState(false)
  const userRole = user && user['http://demozero.net/roles'][0];
  //console.log(userRole);
  const isGamer = userRole == 'gamer';
  //console.log(isGamer);

  useEffect(() => {
    (async () => {
      try {
        if (props.token) {
          console.log('in addddddd', props)
          if (isGamer) {
            let records = await getUserGames(user.email, props.token)
            records = records.userGames
            // console.log('recordzzzz', records.userGames)
            setRecords(records)
            if (Array.isArray(getRecords())) {
              console.log('finally')
              console.log('records', checkAddStatus(getRecords(), currentGame.id))
              //setRefresh(checkAddStatus(getRecords(), currentGame.id))
              //let listval = checkAddStatus((props.userRecords, currentGame.id))

              // const filteredList = (props.userRecords).filter((record) => {
              //   console.log('hello current game', props.game.id)
              //   return record.game_id === props.game.id;
              // });

              // if (filteredList.length > 0) {
              //   //setListedValue(true) //already listed
              //   console.log(true)
              // }
              // else {
              //   console.log(false)
              // }
              //setListedValue(listval);
              // console.log('list value', alreadyListed)
              //console.log('listed?',checkAddStatus((props.userRecords, currentGame.id)))
              setReadyStatus(true)

            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  // const recordz = await getUserGames(user.email, token)
  // console.log('recordzzzz', recordz.userGames)
  // setRecords(recordz.userGames)
  // getUserGames(user.email, token).then((data) => {
  //   if (data.userGames) { //get it from the props
  //     setRecords(data.userGames)
  //     console.log('hello?')
  //   }
  // });
  //}
  //const { getAccessTokenSilently } = useAuth0();
  // if (isAuthenticated) {
  //   getToken(getAccessTokenSilently).then((data) => {
  //     setToken(data);
  //     getUserRecords(user.email, finalToken).then((data) => {
  //       if (data) { //get it from the props
  //         console.log('got eeeem')
  //         console.log('got',data.userGames)
  //         setRecords(data.userGames)
  //       }

  //     });


  //   });


  // }

 

  // if (records) {
  //   console.log('finally')
  //   console.log('records',checkAddStatus(records, currentGame.id))
  //   //setListedValue(checkAddStatus(records, currentGame.id));
  //   //setReadyStatus(true)
  // }
  // console.log('refresh?', refresh)
  // console.log('refresh?', getRefreshStatus())

 if (refresh){
  return (<p><Link to='/games/mygames'>Edit</Link></p>)
 }


  return (
    <div>{ready ?
      <div> <div>{!checkAddStatus(getRecords(), currentGame.id)? <FontAwesomeIcon className='addButton' icon='plus-circle' onClick={() => {handleAddGame(currentGame.id, user.email, props.token); setRefresh(true)}} />
        : <p><Link to='/games/mygames'>Edit</Link></p>}</div>
      </div> : ''}
    </div>
  )
 //   }
    // else{
    //   return (<p>Ready to go!</p>)
    // }

}

const getToken = async (getAccessTokenSilently) => {
  const token = await getAccessTokenSilently({ audience: 'vdtracker' });

  return token;
};

const setToken = (token) => {
  finalToken = token;
};

// const setRecords = (records) => {
//   userRecords = records;
// };

// const setReady=()=>{
//   ready=true
// }

// const setListedValue=(status)=>{
//   alreadyListed=status
// }

const checkAddStatus = (arr, currentGameID) => {
  const filteredList = arr.filter((record) => {
    console.log('hello current game', currentGameID)
    return record.game_id === currentGameID;
  });

  //return (true)
  if (filteredList.length > 0) {
    alreadyListed = true
    return true //already listed
  }
  else {
    alreadyListed = false

    return false
  }
}

const getAlreadyListed = () => {
  return alreadyListed;
}

const setRecords = (rec) => {
  recordz = rec
}

const getRecords = () => {
  return recordz
}



// const toggleRefresh=()=>{
//   refresh=true
// }

// const getRefreshStatus=()=>{
//   return refresh
// }
const  handleAddGame = (gameID, email, token) => {
  addGameToList(gameID, email, token)
  //toggleRefresh()
  //setRefresh(true)
}

export default AddGameRecord;
