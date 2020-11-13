import os
from flask import Flask, request, jsonify, abort
from sqlalchemy import exc
import json
from flask_cors import CORS
import sys
from database.models import setup_db, Game
from auth.auth import AuthError, requires_auth
from datetime import datetime


app = Flask(__name__)
setup_db(app)
CORS(app)


# db_drop_and_create_all()


# ROUTES

# GET all games
@app.route("/games", methods=["GET"])
def get_games():
    games = Game.query.all()
    if len(games) == 0:
        abort(404)
    games = [game.format() for game in games]

    return jsonify({"success": True, "games": games}), 200


# -----------------------------------------------------------------

# POST a new game
@app.route("/games", methods=['POST'])
def addGame():
    body = request.get_json()
    title = body.get("title", None)
    about = body.get("about", None)
    imgSrc = body.get("imgSrc", None)
    release_year = body.get("releaseYear", None)
    genres = body.get("genres", None)
    platforms = body.get("platforms", None)
    print(about)
    newGame = Game(title=title, about=about, imgSrc=imgSrc, release_year=release_year,
                   genres=genres, platforms=platforms, created_at=datetime.now(), updated_at=datetime.now())

    try:

        newGame.insert()
    except:
        newGame.undoInsert()
    return jsonify({"success": True, "new_game": newGame.format()}), 200


# -----------------------------------------------------------------

# PATCH game
@app.route("/games/<game_id>", methods=['PATCH'])
def updateGameInfo(game_id):
    game = Game.query.filter(
        Game.id == game_id).one_or_none()

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
        game.undoInsert()
    return jsonify({"success": True, "updated_game": game.format()}), 200

# -----------------------------------------------------------------

# DELETE game


@app.route("/games/<game_id>", methods=["DELETE"])
def deleteGame(game_id):
    game = Game.query.filter(
        Game.id == game_id).one_or_none()

    if game is None:
        abort(404)

    game.delete()
    return jsonify({"success": True, "deleted": game_id}), 200

# -----------------------------------------------------------------

# add a new user
# def addUser(user_email):


# -----------------------------------------------------------------

# GET User's records


# -----------------------------------------------------------------

# POST a new game record


# -----------------------------------------------------------------

# PATCH user's game record (change game's status/ list)


# -----------------------------------------------------------------

# DELETE a user's game record


# -----------------------------------------------------------------


# Error Handling

@app.errorhandler(422)
def unprocessable(error):
    return jsonify({"success": False, "error": 422, "message": "unprocessable"}), 422


@app.errorhandler(404)
def not_found(error):
    return (
        jsonify({"success": False, "error": 404,
                 "message": "resource not found"}),
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


@app.errorhandler(AuthError)
def handle_auth_errors(error):
    return (
        jsonify({"success": False, "error": error.status_code,
                 "message": error.error}),
        401,
    )
