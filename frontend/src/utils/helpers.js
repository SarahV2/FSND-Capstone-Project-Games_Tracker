export const filterGames = (list, status) => {
  const filteredList = list.filter((game) => {
    return game.status === status;
  });
  return filteredList;
};
