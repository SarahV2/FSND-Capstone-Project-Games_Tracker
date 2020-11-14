const link = 'http://localhost:5000/api';

export  const addGame = (gameDetails,token) => {
  fetch(`${link}/games`, {
    method: 'POST',
    body: JSON.stringify({
      title: gameDetails.title,
      about: gameDetails.title,
      imgSrc: gameDetails.imgSrc,
      releaseYear: gameDetails.releaseYear,
      genres: gameDetails.genres,
      platforms: gameDetails.platforms,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      //   window.location.href = `/admin/games`;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllGames = () => {
  return fetch(`${link}/games`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response
      .json()
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
