export const filterGames = (list, status) => {
  const filteredList = list.filter((game) => {
    //console.log('hello game', game)
    return game.status === status;
  });

  return filteredList;
};

export const addGameRecord = (gameID, userEmail) => {
  console.log('game ID:', gameID, 'user email:', userEmail)

}

export const checkAddStatus = (arr, currentGameID) => {
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


export const organizePlatforms = (platforms) => {
  let list = []
  let item = ''
  for (let i = 0; i < platforms.length; i++) {
    if (i === 3||i===5||i===8) {
      item = <div className='spaced'></div>
       list.push(item)

    }
    item = <span><span className='platforms'>{platforms[i]}</span>{' '}</span>

    list.push(item)
  }
  //const gamePlatforms = platforms.map((platform,index) => {index===3?return<span><span className='platforms'>{platform}</span>{' '}</span> })
  return list;
}