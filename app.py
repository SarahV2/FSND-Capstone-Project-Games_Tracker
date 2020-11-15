import os
from flask import Flask, request, jsonify, abort
from sqlalchemy import exc
import json
from flask_cors import CORS
import sys

# from database.models import setup_db, Game, User, GameRecord
from database.models import *
from auth.auth import AuthError, requires_auth
from datetime import datetime


app = Flask(__name__)
setup_db(app)
CORS(app)


# db_drop_and_create_all()


# ROUTES

# GET all games
@app.route("/api/games", methods=["GET"])
def get_games():
    games = Game.query.all()
    if len(games) == 0:
        abort(404)
    games = [game.format() for game in games]

    return jsonify({"success": True, "games": games}), 200


# -----------------------------------------------------------------
# GET a game by ID
@app.route("/api/games/<game_id>", methods=["GET"])
def get_game(game_id):

    game = Game.query.filter(Game.id == game_id).one_or_none()

    if game is None:
        abort(404)

    return jsonify({"success": True, "game": game.format()}), 200

# -----------------------------------------------------------------


# POST a new game
@app.route("/api/games", methods=["POST"])
@requires_auth("post:games")
def addGame(token):
    body = request.get_json()
    title = body.get("title", None)
    about = body.get("about", None)
    imgSrc = body.get("imgSrc", None)
    release_year = body.get("releaseYear", None)
    genres = body.get("genres", None)
    platforms = body.get("platforms", None)
    print(about)
    newGame = Game(
        title=title,
        about=about,
        imgSrc=imgSrc,
        release_year=release_year,
        genres=genres,
        platforms=platforms,
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )

    try:
        newGame.insert()
    except:
        newGame.undo()
    return jsonify({"success": True, "new_game": newGame.format()}), 200


# -----------------------------------------------------------------

# PATCH game
@app.route("/api/games/<game_id>", methods=["PATCH"])
def updateGameInfo(game_id):
    game = Game.query.filter(Game.id == game_id).one_or_none()

    if game is None:
        abort(404)

    body = request.get_json()
    game.title = body.get("title", None)
    game.about = body.get("about", None)
    game.imgSrc = body.get("imgSrc", None)
    game.release_year = body.get("releaseYear", None)
    game.genres = body.get("genres", None)
    game.platforms = body.get("platforms", None)
    game.updated_at = datetime.now()

    try:
        game.update()
    except:
        game.undo()
    return jsonify({"success": True, "updated_game": game.format()}), 200


# -----------------------------------------------------------------

# DELETE game
@app.route("/api/games/<game_id>", methods=["DELETE"])
@requires_auth("delete:games")
def deleteGame(token, game_id):
    game = Game.query.filter(Game.id == game_id).one_or_none()

    if game is None:
        abort(404)
    try:
        for record in game.records:
            record.delete()

        game.delete()
    except:
        game.undo()
    return jsonify({"success": True, "deleted": game_id}), 200


# -----------------------------------------------------------------

# add a new user


def addUser(user_email):
    newUser = User(
        email=user_email, created_at=datetime.now(), updated_at=datetime.now()
    )

    try:
        newUser.insert()
    except:
        newUser.undo()
    return newUser.id


# get user's ID


def getUserID(user_email):
    user = User.query.filter(User.email == user_email).one_or_none()

    currentUserID = ""

    if user is None:
        currentUserID = addUser(user_email)
    else:
        currentUserID = user.id
    return currentUserID


def checkUniqueness(user_id, game_id):
    record = (
        db.session.query(GameRecord)
        .join(User, GameRecord.user_id == user_id)
        .join(Game, GameRecord.game_id == game_id)
        .one_or_none()
    )
    if record is None:
        return True
    else:
        return False


# -----------------------------------------------------------------

# GET User's records


@app.route("/api/user/gameRecords", methods=["GET"])
def getUserRecords():
    body = request.get_json()
    user_email = body.get("email", None)
    if user_email is None:
        abort(400)
    currentUserID = getUserID(user_email)

    records = (
        db.session.query(GameRecord)
        .join(User, GameRecord.user_id == currentUserID)
        .join(Game)
        .all()
    )
    allRecords = []
    for record in records:
        games = {
            "game_id": record.game_id,
            "title": record.Game.title,
            "about": record.Game.about,
            "imgSrc": record.Game.imgSrc,
            "releaseYear": record.Game.release_year,
            "genres": record.Game.genres,
            "platforms": record.Game.platforms,
        }
        allRecords.append(games)

    return (
        jsonify({"success": True, "found": currentUserID, "userGames": allRecords}),
        200,
    )


# -----------------------------------------------------------------

# POST a new game record


@app.route("/api/user/gameRecords", methods=["POST"])
def addGameRecord():
    body = request.get_json()
    user_email = body.get("email", None)
    game_id = body.get("gameID", None)
    if user_email is None or game_id is None:
        abort(400)

    currentUserID = getUserID(user_email)
    game = Game.query.filter(Game.id == game_id).one_or_none()

    if game is None:
        abort(404)

    isUnique = checkUniqueness(currentUserID, game_id)

    if not isUnique:
        abort(400)

    newRecord = GameRecord(
        user_id=currentUserID,
        game_id=game_id,
        status="want to play",
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )

    try:
        newRecord.insert()
    except:
        newRecord.undo()

    return (
        jsonify(
            {"success": True, "found": currentUserID, "newRecord": newRecord.format()}
        ),
        200,
    )


# -----------------------------------------------------------------

# PATCH user's game record (change game's status/ list)
@app.route("/api/user/gameRecords/<record_id>", methods=["PATCH"])
def updateRecord(record_id):
    body = request.get_json()
    user_email = body.get("email", None)
    updated_status = body.get("status", None)

    if user_email is None or updated_status is None:
        abort(400)
    currentUserID = getUserID(user_email)
    record = GameRecord.query.filter(GameRecord.id == record_id).one_or_none()
    if record is None:
        abort(404)
    record.status = updated_status
    record.updated_at = datetime.now()
    try:
        record.update()
    except:
        record.undo()
    return (
        jsonify(
            {"success": True, "found": currentUserID, "updated_record": record.format()}
        ),
        200,
    )


# -----------------------------------------------------------------

# DELETE a user's game record
@app.route("/api/user/gameRecords/<record_id>", methods=["DELETE"])
def deleteRecord(record_id):
    body = request.get_json()
    user_email = body.get("email", None)

    if user_email is None:
        abort(400)
    currentUserID = getUserID(user_email)
    record = GameRecord.query.filter(GameRecord.id == record_id).one_or_none()
    if record is None:
        abort(404)
    try:
        record.delete()
    except:
        record.undo()

    return (
        jsonify({"success": True, "found": currentUserID, "deleted_record": record_id}),
        200,
    )


# -----------------------------------------------------------------


# Error Handling


@app.errorhandler(422)
def unprocessable(error):
    return jsonify({"success": False, "error": 422, "message": "unprocessable"}), 422


@app.errorhandler(404)
def not_found(error):
    return (
        jsonify({"success": False, "error": 404, "message": "resource not found"}),
        404,
    )


@app.errorhandler(400)
def bad_request(error):
    return (
        jsonify({"success": False, "error": 400, "message": "bad request"}),
        400,
    )


@app.errorhandler(500)
def internal_server_error(error):
    return (
        jsonify({"success": False, "error": 500, "message": "internal server error"}),
        500,
    )


@app.errorhandler(401)
def unauthorized(error):
    return (
        jsonify({"success": False, "error": 401, "message": "unauthorized"}),
        401,
    )


@app.errorhandler(AuthError)
def handle_auth_errors(error):
    return (
        jsonify({"success": False, "error": error.status_code, "message": error.error}),
        401,
    )
