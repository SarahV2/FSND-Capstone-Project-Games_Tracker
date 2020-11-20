export const filterGames = (list, status) => {
  const filteredList = list.filter((game) => {
    console.log('hello game',game)
    return game.status === status;
  });

  return filteredList;
};

export const addGameRecord=(gameID,userEmail)=>{
  console.log('game ID:',gameID,'user email:',userEmail)

}

export const checkAddStatus = (arr, currentGameID) => {
  const filteredList = arr.filter((record) => {
    console.log('hello current game',currentGameID)
    return record.game_id === currentGameID;
  });

  if(filteredList.length>0){
    return true //already listed
  }
  else{
    return false
  }
}
