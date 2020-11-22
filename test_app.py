import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy
from app import app
from database.models import setup_db, Game, User, GameRecord
from datetime import datetime


class GamesTrackerTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.client = self.app.test_client
        self.database_path = os.environ['TEST_DATABASE_URL']
        setup_db(self.app, self.database_path)

        self.gamer_token = os.environ['GAMER_TOKEN']
        self.admin_token = os.environ['ADMIN_TOKEN']
        self.user_email = os.environ['EMAIL']

        self.gamer_header = {
            "Authorization": 'bearer '+self.gamer_token}

        self.admin_header = {
            "Authorization": 'bearer '+self.admin_token}

        self.new_game = {
            "title": "One cool game",
            "about": "this is such a cool game",
            "imgSrc": "https://i.imgur.com/Kx7N0dG.png",
            "releaseYear": 2020,
            "genres": ['Adventure', 'RPG'],
            "platforms": ['PC'],
            "created_at": datetime.now(),
            "updated_at": datetime.now(),
        }
        self.updated_game = {
            "title": "One Super Cool Game",
            "about": "this is such a cool game",
            "imgSrc": "https://i.imgur.com/Kx7N0dG.png",
            "releaseYear": 2020,
            "genres": ['Adventure', 'RPG'],
            "platforms": ['PC', 'PS5'],
            "created_at": datetime.now(),
            "updated_at": datetime.now(),

        }

        self.invalid_game = {
            "title": "",
            "about": "this is such a cool game",
            "releaseYear": 2020,
        }
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            self.db.create_all()

    def tearDown(self):
        pass

    # --------------------------------------------------------------------------------------

    # GET /api/games

    def test_get_games(self):
        res = self.client().get("/api/games")
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["games"])
        self.assertTrue(data["total_games"])

    def test_get_games_not_allowed(self):
        res = self.client().put("/api/games")
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 405)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"], "method not allowed")

    # --------------------------------------------------------------------------------------

    # GET /api/games/<game_id>

    def test_get_game(self):
        res = self.client().get("/api/games/10")
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["game"])

    def test_get_game_not_found(self):
        res = self.client().get("/api/games/5555")
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 404)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"], "resource not found")

    # --------------------------------------------------------------------------------------

    # POST /api/games

    def test_add_game(self):
        res = self.client().post("/api/games", json=self.new_game, headers=self.admin_header)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["new_game"])

    def test_add_game_bad_request(self):
        res = self.client().post("/api/games", json=self.invalid_game,
                                 headers=self.admin_header)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 400)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"], "bad request")

    # --------------------------------------------------------------------------------------

    # PATCH /api/games/<game_id>

    def test_update_game(self):
        res = self.client().patch("/api/games/17", json=self.updated_game,
                                  headers=self.admin_header)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["updated_game"])
        self.assertEqual(data["updated_game"].get(
            'title'), "One Super Cool Game")
        self.assertEqual(data["updated_game"].get('platforms'), ['PC', 'PS5'])

    def test_update_game_not_found(self):
        res = self.client().patch("/api/games/5555",
                                  json=self.updated_game, headers=self.admin_header)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 404)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"], "resource not found")

    # --------------------------------------------------------------------------------------

    # DELETE /api/games/<game_id>

    def test_delete_game(self):
        res = self.client().delete("/api/games/12", headers=self.admin_header)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertEqual(data["deleted"], '12')

    def test_delete_game_not_found(self):
        res = self.client().delete("/api/games/5555",
                                   headers=self.admin_header)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 404)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"], "resource not found")

    # --------------------------------------------------------------------------------------

    # POST /api/user/records

    def test_get_gameRecords(self):
        body = {"email": self.user_email}
        res = self.client().post("/api/user/records", json=body, headers=self.gamer_header)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["userGames"])

    def test_get_gameRecords_bad_request(self):
        res = self.client().post("/api/user/records", json={}, headers=self.gamer_header)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 400)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"], "bad request")
    # --------------------------------------------------------------------------------------

    # POST /api/user/games

    def test_add_gameRecord(self):
        body = {"email": self.user_email, "gameID": 8}
        res = self.client().post("/api/user/games", json=body, headers=self.gamer_header)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["newRecord"])
        self.assertTrue(data["gameRecord"])

    def test_add_gameRecord_game_not_found(self):
        body = {"email": self.user_email, "gameID": 5555}
        res = self.client().post("/api/user/games", json=body, headers=self.gamer_header)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 404)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"], "resource not found")
    # --------------------------------------------------------------------------------------

    # POST /api/user/records/<record_id>

    def test_update_gameRecord(self):
        body = {"email": self.user_email, "status": "Currently Playing"}
        res = self.client().patch("/api/user/records/71",
                                  json=body, headers=self.gamer_header)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["updatedRecord"])

    def test_update_gameRecord_record_not_found(self):
        body = {"email": self.user_email, "status": "Currently Playing"}
        res = self.client().patch("/api/user/records/555",
                                  json=body, headers=self.gamer_header)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 404)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"], "resource not found")
    # --------------------------------------------------------------------------------------

    # DELETE /api/user/records/<record_id>

    def test_delete_gamerecord(self):
        body = {"email": self.user_email}
        res = self.client().delete("/api/user/records/72",
                                   json=body, headers=self.gamer_header)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["deleted_record"])

    def test_delete_gamerecord_not_found(self):
        body = {"email": self.user_email}
        res = self.client().delete("/api/user/records/5555",
                                   json=body, headers=self.gamer_header)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 404)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"], "resource not found")
    # --------------------------------------------------------------------------------------

    # Admin Role/permissions Tests

    def test_add_game_no_header(self):
        res = self.client().post("/api/games", json=self.new_game)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 401)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"].get('code'),
                         "missing_authorization_header")

    def test_add_game_unauthorized(self):
        res = self.client().post("/api/games", json=self.new_game, headers=self.gamer_header)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 401)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"].get('code'), "unauthorized")
    # --------------------------------------------------------------------------------------

    # Gamer Role/permissions Tests

    def test_get_user_record_no_header(self):
        res = self.client().post("/api/user/records")
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 401)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"].get('code'),
                         "missing_authorization_header")

    def test_get_user_records_unauthorized(self):
        res = self.client().post("/api/user/records", headers=self.admin_header)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 401)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"].get('code'), "unauthorized")
    # --------------------------------------------------------------------------------------


if __name__ == "__main__":
    unittest.main()
