# FSND-Capstone-Project-Games
Video games tracker is a full stack web app that allows users to keep track of their games by adding games to their account and moving them between various lists by changing the status of their play (want to play, currently playing, on hold, finished, and dropped).

## Deployment

## Technologies Used
* Flask
* PostgreSQL
* React
* Auth0
* React Bootstrap
* Heroku

## Installation

### Prerequisites
You'll need to have Flask and PostgreSQL installed on your machine prior proceesing with the rest of the installation process for this project.
* To install Flask run the command: ```pip3 install flask```
* Download and install <a href="https://www.postgresql.org/download/">PostgreSQL</a>

In order to run the application locally, clone this repository first and then follow the instructions below:

### Backend
First, navigate to the project's directory and then:
1. Install dependencies ```pip install -r requirements.txt```
2. Set up the app ```export FLASK_APP=flaskr```
3. Set up the development environment ```export FLASK_ENV=development```
4. Start the backend server by typing ```flask run```

### Frontend
In another terminal, navigate to the client's directory ```cd client``` followed by ```npm install``` or ```npm i``` to install the dependecies and finally start the server by using the command ```npm start```

## User Roles and Permissions
### Admin
A user with this role has the authority of adding and managing games (updating existing games'information as well as deleting games).

#### Admin's Permissions
```post:games``` : permission to add a new game to the website<br>
```patch:games```: permission to update some game's information<br>
```delete:games```: permission to delete a game

### Gamer
A user with this role has the ability to add games to their account, this is done in some form of creating a 'record' that links the chosen game to the user's account
#### Gamer's permissions
```get:records```: permission to get the user's records <br>
```post:records```: permission to link a game to the user's list <br>
```patch:records```: permission to update a user's record (game's status) <br>
```delete:records```: permission to delete (unlink) a game from a user's list

## API Reference


## Testing
