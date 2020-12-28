# Video Game Tracker
Video games tracker is a full stack web app that allows users to keep track of their games by adding games to their account and moving them between various lists by changing the status of their play (want to play, currently playing, on hold, finished, and dropped).

This project is my capstone project of Udacity's Full Stack Nanodegree, where I attempted to build a full stack web application that uses Flask as a backend server, React as a frontend framework, and Auth0 for authentication.

## Deployment
You can access the live version of the website <a href="https://vdgtracker.herokuapp.com">here</a>

## Technologies Used
* Flask
* PostgreSQL
* React
* Auth0
* React Bootstrap
* Heroku

## Installation

### Prerequisites
You'll need to have Flask and PostgreSQL installed on your machine prior proceeding with the rest of the installation process for this project.
* To install Flask run the command: ```pip3 install flask```
* Download and install <a href="https://www.postgresql.org/download/">PostgreSQL</a>

In order to run the application locally, clone this repository first and then follow the instructions below:

### Database Setup
First, navigate to the project's directory and then run the following commands:
1. ```source setup.sh```
2. ```createdb vgtracker```
3. ```psql -U postgres -f vgtracker.psql vgtracker```

### Backend
1. Install dependencies ```pip install -r requirements.txt```
2. Set up the app ```export FLASK_APP=app.py```
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
A user with this role has the ability to link games to their account, this is done in some form of creating a 'record' that links the chosen game to the user's account. New users aquire this role automatically.
#### Gamer's permissions
```get:records```: permission to get the user's records <br>
```post:records```: permission to link a game to the user's list <br>
```patch:records```: permission to update a user's record (game's status) <br>
```delete:records```: permission to delete (unlink) a game from a user's list

## API Reference
a detailed description of all the endpoints is provided <a href="https://github.com/SarahV2/FSND-Capstone-Project-Games/blob/master/API_Reference.md">here</a>

## Testing
To run the tests, run the following commands:
<br/>if exists, drop the database first: ```dropdb vgtracker_test``` 
1. ```source setup.sh```
2. ```createdb vgtracker_test```
3. ```psql -U postgres -f vgtracker.psql vgtracker_test```
4. ```python test_app.py```

