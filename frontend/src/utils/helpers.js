export const filterGames = (list, status) => {
  const filteredList = list.filter((game) => {
    return game.status === status;
  });
  return filteredList;
};

export const addGameRecord=(gameID,userEmail)=>{
  console.log('game ID:',gameID,'user email:',userEmail)

}