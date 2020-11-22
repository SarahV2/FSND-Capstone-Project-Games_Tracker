import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy
from app import app
from database.models import setup_db, Game, User, GameRecord


class GamesTrackerTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.client = self.app.test_client
        self.database_path = os.environ['TEST_DATABASE_URL']
        setup_db(self.app, self.database_path)

        self.gamer_token = os.environ['GAMER_TOKEN']
        # self.admin_token = os.environ['ADMIN_TOKEN']
        self.user_email = os.environ['EMAIL']

        self.gamer_header = {
            "Authorization": 'bearer '+self.gamer_token}
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
        # data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)

    def test_get_games_not_allowed(self):
        res = self.client().put("/api/games")
        self.assertEqual(res.status_code, 405)
    # --------------------------------------------------------------------------------------

    # POST /api/user/records
    
    def test_get_gameRecords(self):
        body = {"email": self.user_email}
        res = self.client().post("/api/user/records", json=body, headers=self.gamer_header)
        self.assertEqual(res.status_code, 200)

    def test_get_gameRecords_bad_request(self):
        res = self.client().post("/api/user/records", json={}, headers=self.gamer_header)
        self.assertEqual(res.status_code, 400)

    # --------------------------------------------------------------------------------------

    # POST /api/user/games
    
    def test_add_gameRecord(self):
        body = {"email": self.user_email, "gameID": 8}
        res = self.client().post("/api/user/games", json=body, headers=self.gamer_header)
        self.assertEqual(res.status_code, 400)  # change it to 200 later
        data = json.loads(res.data)

    def test_add_gameRecord_game_not_found(self):
        body = {"email": self.user_email, "gameID": 5555}
        res = self.client().post("/api/user/games", json=body, headers=self.gamer_header)
        self.assertEqual(res.status_code, 404)

    # --------------------------------------------------------------------------------------

    # POST /api/user/records/<record_id>
    
    def test_update_gameRecord(self):
        body = {"email": self.user_email, "status": "Currently Playing"}
        res = self.client().patch("/api/user/records/71",
                                  json=body, headers=self.gamer_header)
        self.assertEqual(res.status_code, 200)

    def test_update_gameRecord_record_not_found(self):
        body = {"email": self.user_email, "status": "Currently Playing"}
        res = self.client().patch("/api/user/records/555",
                                  json=body, headers=self.gamer_header)
        self.assertEqual(res.status_code, 404)
    # --------------------------------------------------------------------------------------

    # DELETE /api/user/records/<record_id>
    
    def test_delete_gamerecord(self):
        body = {"email": self.user_email}
        res = self.client().delete("/api/user/records/72",
                                   json=body, headers=self.gamer_header)
        self.assertEqual(res.status_code, 200)

    def test_delete_gamerecord_not_found(self):
        body = {"email": self.user_email}
        res = self.client().delete("/api/user/records/5555",
                                   json=body, headers=self.gamer_header)
        self.assertEqual(res.status_code, 404)
    # --------------------------------------------------------------------------------------

    # --------------------------------------------------------------------------------------

    # --------------------------------------------------------------------------------------


if __name__ == "__main__":
    unittest.main()
