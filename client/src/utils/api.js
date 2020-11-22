const link = 'http://localhost:5000/api';


//--------------------------------------------------- Game ----------------------------------------------

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
export const getAllGames = (page) => {
  return fetch(`${link}/games?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response
      .json()
      .then((data) => {
        //console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

// Delete a game using its ID
// DELETE '/api/games/<game_id>'
export const deleteGame = (gameID, token) => {
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
        //console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  });
};


// Update game's info
// PATCH '/api/games/<game_id>
export const updateGame = (gameID, gameDetails, token) => {
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

//--------------------------------------------------- User's Records ----------------------------------------------

// Get an array containing all user records
// GET '/api/games'
export const getUserRecords = (email, token) => {
  return fetch(`${link}/user/records`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ email })
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

// Add a game to the user's list
// POST '/api/user/games'
export const addGameToList = (gameID, email, token) => {
  fetch(`${link}/user/games`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      gameID,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response
        .json()
        .then((data) => {
          console.log(data);
          let currentList = JSON.parse(localStorage.getItem('userRecords'));
          currentList.push(data.gameRecord)
          localStorage.setItem('userRecords', JSON.stringify(currentList));
          // window.location.href = `/games`;
          window.location.href = `/games/mygames`;

          //return data;
        })
        .catch((error) => {
          console.log(error);
        });
    })
}



// Update a user's record
// PATCH '/api/user/records/<record_id>
export const updateGameRecord = (recordID, status, email, token) => {
  return fetch(`${link}/user/records/${recordID}`, {
    method: 'PATCH',
    body: JSON.stringify({
      status, email
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response
        .json()
        .then((data) => {
          console.log(data);
          let currentList = JSON.parse(localStorage.getItem('userRecords'));
          const filteredRecords = currentList.filter((record) => record.id !== recordID);
          filteredRecords.push(data.updatedRecord)
          console.log(data.updatedRecord)
          localStorage.setItem('userRecords', JSON.stringify(filteredRecords));
          window.location.href = `/games/mygames`;
          //return data;
        })
        .catch((error) => {
          console.log(error);
        });
    })
}



// Delete a record using its ID and the user's email
// DELETE '/api/games/<game_id>'
export const deleteUserRecord = (recordID, token) => {
  fetch(`${link}/user/records/${recordID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log('game successfully deleted', recordID);
      let currentList = JSON.parse(localStorage.getItem('userRecords'));
      const filteredRecords = currentList.filter((record) => record.id !== recordID);
      console.log(filteredRecords)
      localStorage.setItem('userRecords', JSON.stringify(filteredRecords));
      window.location.href = `/games/mygames`;

    })
    .catch((error) => {
      console.log(error)
    });
}


//--------------------------------------------------- User's Records ----------------------------------------------

// Get an array containing all user records
// GET '/api/games'
export const getUserGames = (email, token) => {
  return fetch(`${link}/user/records/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ email })
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