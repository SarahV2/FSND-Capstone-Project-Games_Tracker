import os
from flask import Flask, request, jsonify, abort
from sqlalchemy import exc
import json
from flask_cors import CORS
import sys
from database.models import setup_db, Game
from auth.auth import AuthError, requires_auth

app = Flask(__name__)
setup_db(app)
CORS(app)

"""
@(Done) uncomment the following line to initialize the datbase
!! NOTE THIS WILL DROP ALL RECORDS AND START YOUR DB FROM SCRATCH
!! NOTE THIS MUST BE UNCOMMENTED ON FIRST RUN
"""
# db_drop_and_create_all()


# ROUTES

# GET all games
@app.route("/games", methods=["GET"])
def get_drinks():
    games = Game.query.all()
    # if len(games) == 0:
    #     abort(404)
    games = [game.format() for game in games]

    return jsonify({"success": True, "games": games}), 200


# -----------------------------------------------------------------

# POST a new game



# -----------------------------------------------------------------

# PATCH game



# -----------------------------------------------------------------

# DELETE game



# -----------------------------------------------------------------

# POST a new user



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

