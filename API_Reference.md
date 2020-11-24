## API Reference
### Getting Started
Base URL: http://127.0.0.1:5000/api

### Error Handling
Errors are returned as JSON objects in the following format:
```
{
   "success":False,
   "code":404,
   "message":"resource not found"
}
```
The API will return 7 error types:
* 400: Bad request
* 404: Not found
* 405: Method not allowed
* 403: Forbidden
* 422: Unprocessable entity
* 500: Internal Server Error
* Auth Errors (status codes: 401, 403, 400)

### Endpoints

* #### GET ```/games```
  * General: Returns a list of game objects and a success value, along with the number of total games avaliable
  * Sample:
``` curl http://127.0.0.1:5000/api/games ```

```
{
    "games": [
        {
            "about": "description",
            "created_at": "Sat, 21 Nov 2020 04:41:23 GMT",
            "genres": [
                "Simulator"
            ],
            "id": 10,
            "imgSrc": "https://upload.wikimedia.org/wikipedia/en/3/32/The_Sims_4_Box_Art.png",
            "platforms": [
                "PC",
                "PS4",
                "Xbox One"
            ],
            "release_year": "2014",
            "title": "The Sims 4",
            "updated_at": "Sun, 22 Nov 2020 05:43:00 GMT"
        },
      
 
 .....
 
  {
            "about": "description",
            "created_at": "Fri, 20 Nov 2020 17:14:13 GMT",
            "genres": [
                "RPG"
            ],
            "id": 3,
            "imgSrc": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Cyberpunk_2077_box_art.jpg/220px-Cyberpunk_2077_box_art.jpg",
            "platforms": [
                "PC",
                "Xbox Series X",
                "PS5",
                "Xbox One X"
            ],
            "release_year": "2020",
            "title": "Cyperpunk 2077",
            "updated_at": "Fri, 20 Nov 2020 17:14:47 GMT"
        },
    ],
    "success": true,
    "total_games": 12
}        
```


* #### GET ```/games/<game_id>```
  * General: Returns an object containing the requested game and a success value
  * Sample:
``` curl http://127.0.0.1:5000/api/5 ```

```
{
    "game": {
        "about": "tl",
        "created_at": "Fri, 20 Nov 2020 22:31:17 GMT",
        "genres": [
            "Simulator"
        ],
        "id": 5,
        "imgSrc": "https://upload.wikimedia.org/wikipedia/en/b/b4/TomodachiLifeBoxartNA.jpg",
        "platforms": [
            "Nintendo 3DS/2DS"
        ],
        "release_year": "2014",
        "title": "Tomodachi Life",
        "updated_at": "Fri, 20 Nov 2020 22:31:17 GMT"
    },
    "success": true
}
```

```Note```: the following three endpoints require a token of a user with admin privileges, which we can pass as a local variable: ```export Token="ADMIN_TOKEN``` 

* #### POST ```/games```
  * General: Adds a new game and returns the newly created game along with a success value
  * Sample:
```
curl http://127.0.0.1:5000/api/games -X POST -H "Authorization: ${token}" -H "Content-Type:application/json" -d '{"title":"One Cool Game", "about":"some description about the cool game","imgSrc":"https://i.imgur.com/Kx7N0dG.png","releaseYear":2020,"genres": ["Adventure", "RPG"],"platforms": ["PC"]}' ```
```
```
{
    "new_game": {
        "about": "some description about the cool game",
        "created_at": "Mon, 23 Nov 2020 04:11:17 GMT",
        "genres": [
            "Adventure",
            "RPG"
        ],
        "id": 16,
        "imgSrc": "https://i.imgur.com/Kx7N0dG.png",
        "platforms": [
            "PC"
        ],
        "release_year": "2020",
        "title": "One Cool Game",
        "updated_at": "Mon, 23 Nov 2020 04:11:17 GMT"
    },
    "success": true
}
```

* #### PATCH ```/games/<game_id>```
  * General: Updates a game object's info using the game's id and returns a success value along with the updated game object

  * Sample:
```
curl http://127.0.0.1:5000/api/games/16 -X PATCH -H "Authorization: ${token}" -H "Content-Type:application/json" -d '{"title":"One Super Cool Game", "about":"some description about the cool game","imgSrc":"https://i.imgur.com/Kx7N0dG.png","releaseYear":2020,"genres": ["Adventure", "RPG"],"platforms": ["PC","PS5"]}'
```

```
{
    "success": true,
    "updated_game": {
        "about": "some description about the cool game",
        "created_at": "Mon, 23 Nov 2020 04:11:17 GMT",
        "genres": [
            "Adventure",
            "RPG"
        ],
        "id": 16,
        "imgSrc": "https://i.imgur.com/Kx7N0dG.png",
        "platforms": [
            "PC",
            "PS5"
        ],
        "release_year": "2020",
        "title": "One Super Cool Game",
        "updated_at": "Mon, 23 Nov 2020 04:18:08 GMT"
    }
}
```

* #### DELETE ```/games/<game_id>```
  * General: Deletes a game given its id and returns a success value and deleted game's id

  * Sample:
```curl http://127.0.0.1:5000/api/games/17 -X DELETE -H "Authorization: ${token}"```


```
{
    "deleted": "17",
    "success": true
}

```

```Note```: the following four endpoints require a token of a user with "gamer" role, which we can pass as a local variable: ```export Token="GAMER_TOKEN``` as well as an email which can be set up in the same way.


* #### POST ```/user/records```
  * General: Returns a list of all games (records) that the user added to their list

  * Sample:
```curl http://127.0.0.1:5000/api/user/records -X POST -H "Authorization: ${token}" -H "Content-Type:application/json" -d '{"email":"${email}"}'```


```
{
    "success": true,
    "userGames": [
        {
            "about": "some description about the cool game",
            "game_id": 1,
            "genres": [
                "Action",
                "Adventure"
            ],
            "id": 71,
            "imgSrc": "https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/D1IOd0BWsAAiX5T.jpg/220px-D1IOd0BWsAAiX5T.jpg",
            "platforms": [
                "PC",
                "PS4",
                "Xbox One"
            ],
            "releaseYear": "2019",
            "status": "want to play",
            "title": "Control"
        }
    ]
}
```

* #### POST ```/user/games```
  * General: Add a game to the user records by creating a new one. It returns an object containing the newly created record, along with a detailed one, and a success value

  * Sample:
```curl http://127.0.0.1:5000/api/user/games -X POST -H "Authorization: ${token}" -H "Content-Type:application/json" -d '{"email":"${email}", "gameID":1}'```

```
{
    "gameRecord": {
        "about": "game description",
        "game_id": 1,
        "genres": [
            "Action",
            "Adventure"
        ],
        "id": 71,
        "imgSrc": "https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/D1IOd0BWsAAiX5T.jpg/220px-D1IOd0BWsAAiX5T.jpg",
        "platforms": [
            "PC",
            "PS4",
            "Xbox One"
        ],
        "releaseYear": "2019",
        "status": "want to play",
        "title": "Control"
    },
    "newRecord": {
        "created_at": "Mon, 23 Nov 2020 05:57:49 GMT",
        "game_id": 1,
        "id": 71,
        "status": "want to play",
        "updated_at": "Mon, 23 Nov 2020 05:57:49 GMT",
        "user_id": 4
    },
    "success": true
}

```

* #### PATCH ```/user/records/<record_id>```
  * General: Update user's game (record) by updating the status (eg. "Currently Playing","Finished"..etc). The endpoint returns the updated and populated record along with a success value

  * Sample:
```curl http://127.0.0.1:5000/api/user/records/71 -X PATCH -H "Authorization: ${token}" -H "Content-Type:application/json" -d '{"email":"${email}", "status":"Finished"}'```

```
{
    "success": true,
    "updatedRecord": {
        "about": "game description",
        "game_id": 1,
        "genres": [
            "Action",
            "Adventure"
        ],
        "id": 71,
        "imgSrc": "https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/D1IOd0BWsAAiX5T.jpg/220px-D1IOd0BWsAAiX5T.jpg",
        "platforms": [
            "PC",
            "PS4",
            "Xbox One"
        ],
        "releaseYear": "2019",
        "status": "Finished",
        "title": "Control"
    }
}

```
* #### DELETE ```/user/records/<record_id>```
  * General: Deletes a record given its id and returns a success value and deleted record's id

  * Sample:
```curl http://127.0.0.1:5000/api/user/records/71 -X DELETE -H "Authorization: ${token}"```

```
{
    "deleted_record": "71",
    "success": true
}

```
