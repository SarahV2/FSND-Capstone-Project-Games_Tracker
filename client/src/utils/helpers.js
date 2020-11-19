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

export const checkAddStatus = (list, currentGameID) => {
  const filteredList = list.filter((record) => {
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
