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
CORS(app, resources={r"/api/*": {"origins": "*"}})


# db_drop_and_create_all()

GAMES_PER_PAGE = 9


def paginate_games(request, selection):
    page = request.args.get("page", 1, type=int)
    start = (page - 1) * GAMES_PER_PAGE
    end = start + GAMES_PER_PAGE
    games = [game.format() for game in selection]

    finalized_list = games[start:end]
    return finalized_list

# ROUTES

# GET all games


@app.route("/api/games", methods=["GET"])
def get_games():
    games_list = Game.query.all()

    current_list = paginate_games(request, games_list)

    return jsonify({"success": True, "games": current_list,
                    "total_games": len(games_list)}), 200


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
    # print(about)

    if title is None or about is None or imgSrc is None:
        abort(400)
    elif release_year is None or genres is None or platforms is None:
        abort(400)

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
    except BaseException:
        newGame.undo()
    return jsonify({"success": True, "new_game": newGame.format()}), 200


# -----------------------------------------------------------------

# PATCH game
@app.route("/api/games/<game_id>", methods=["PATCH"])
@requires_auth("patch:games")
def updateGameInfo(token, game_id):
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
    except BaseException:
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
    except BaseException:
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
    except BaseException:
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


def getRecordDetails(user_id, game_id):
    record = (
        db.session.query(GameRecord)
        .join(User, GameRecord.user_id == user_id)
        .join(Game, GameRecord.game_id == game_id)
        .one_or_none()
    )
    game = {
        "game_id": record.game_id,
        "title": record.Game.title,
        "about": record.Game.about,
        "imgSrc": record.Game.imgSrc,
        "releaseYear": record.Game.release_year,
        "genres": record.Game.genres,
        "platforms": record.Game.platforms,
        "id": record.id,
        "status": record.status
    }
    return game

# -----------------------------------------------------------------

# GET User's records


@app.route("/api/user/records", methods=["POST"])
@requires_auth("get:records")
def getUserRecords(token):
    body = request.get_json()
    user_email = body.get("email", None)
    # print(user_email)
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
            "id": record.id,
            "status": record.status
        }
        allRecords.append(games)

    return (
        jsonify({"success": True,
                 "userGames": allRecords}),
        200,
    )


# -----------------------------------------------------------------

# POST a new game record


@app.route("/api/user/games", methods=["POST"])
@requires_auth("post:records")
def addGameRecord(token):
    # detailedRecord={}
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
        detailedRecord = getRecordDetails(currentUserID, game_id)

    except BaseException:
        newRecord.undo()

    return (
        jsonify(
            {"success": True,
                "newRecord": newRecord.format(), "gameRecord": detailedRecord}
        ),
        200,
    )


# -----------------------------------------------------------------

# PATCH user's game record (change game's status/ list)
@app.route("/api/user/records/<record_id>", methods=["PATCH"])
@requires_auth("patch:records")
def updateGameRecord(token, record_id):
    detailedRecord = {}
    body = request.get_json()
    # detailedRecord={}
    # user_email = body.get("email", None)
    updated_status = body.get("status", None)
    user_email = body.get("email", None)
    if updated_status is None or user_email is None:
        abort(400)
    # //currentUserID = getUserID(user_email)
    record = GameRecord.query.filter(GameRecord.id == record_id).one_or_none()
    if record is None:
        abort(404)
    record.status = updated_status
    record.updated_at = datetime.now()
    game_id = record.game_id
    currentUserID = record.user_id
    try:
        record.update()

        detailedRecord = getRecordDetails(currentUserID, game_id)
    except BaseException:
        record.undo()

    return (
        jsonify(
            {"success": True, "updatedRecord": detailedRecord}
        ),
        200,
    )


# -----------------------------------------------------------------

# DELETE a user's game record
@app.route("/api/user/records/<record_id>", methods=["DELETE"])
@requires_auth("delete:records")
def deleteRecord(token, record_id):
    # body = request.get_json()
    # user_email = body.get("email", None)

    # if user_email is None:
    #     abort(400)
    # currentUserID = getUserID(user_email)
    record = GameRecord.query.filter(GameRecord.id == record_id).one_or_none()
    if record is None:
        abort(404)
    try:
        record.delete()
    except BaseException:
        record.undo()

    return (
        jsonify({"success": True, "deleted_record": record_id}),
        200,
    )


# -----------------------------------------------------------------

# GET User's games ids


@app.route("/api/user/records/games", methods=["POST"])
@requires_auth("get:records")
def getUserGamesIDs(token):
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
        }
        allRecords.append(games)

    return (
        jsonify({"success": True, "found": currentUserID,
                 "userGames": allRecords}),
        200,
    )

# Error Handling


@app.errorhandler(422)
def unprocessable(error):
    return jsonify({"success": False, "error": 422,
                    "message": "unprocessable"}), 422


@app.errorhandler(404)
def not_found(error):
    return (
        jsonify({"success": False, "error": 404,
                 "message": "resource not found"}),
        404,
    )


@app.errorhandler(405)
def not_allowed(error):
    return (
        jsonify({"success": False, "error": 405,
                 "message": "method not allowed"}),
        405,
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
        jsonify({"success": False, "error": 500,
                 "message": "internal server error"}),
        500,
    )


@app.errorhandler(401)
def unauthorized(error):
    return (
        jsonify({"success": False, "error": 401, "message": "unauthorized"}),
        401,
    )


@app.errorhandler(403)
def forbidden(error):
    return (
        jsonify({"success": False, "error": 403, "message": "forbidden"}),
        403,
    )


@app.errorhandler(AuthError)
def handle_auth_errors(error):
    return (
        jsonify({"success": False, "error": error.status_code,
                 "message": error.error}),
        401,
    )
