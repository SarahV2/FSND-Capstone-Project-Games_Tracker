const link = 'http://localhost:5000/api';

// Add a new game
// POST '/api/games'
export const addGame = (gameDetails, token) => {
  fetch(`${link}/games`, {
    method: 'POST',
    body: JSON.stringify({
      title: gameDetails.title,
      about: gameDetails.about,
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
      window.location.href = `/admin/games`;
    })
    .catch((error) => {
      console.log(error);
    });
};

// Get an array containing all games
// GET '/api/games'
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

// Delete a game using its ID
// DELETE '/api/games/<game_id>'
export const deleteGame=(gameID, token)=>{
    fetch(`${link}/games/${gameID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
      })
        .then((response) => {
          console.log('game successfully deleted', gameID);
          window.location.href = `/admin/games`;

        })
        .catch((error) => {
          console.log(error)
        });
}

// Get a game by ID
// GET '/api/games/<game_id>
export const getGame = (gameID) => {
return fetch(`${link}/games/${gameID}`, {
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


// Update game's info
// PATCH '/api/games/<game_id>
export const updateGame = (gameID,gameDetails, token) => {
    fetch(`${link}/games/${gameID}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: gameDetails.title,
        about: gameDetails.about,
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
        window.location.href = `/admin/games`;
      })
      .catch((error) => {
        console.log(error);
      });
  };