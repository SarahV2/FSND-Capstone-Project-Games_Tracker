import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy
from app import create_app
from database.models import setup_db, Game, User, GameRecord


class GamesTrackerTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client
        self.database_path = os.environ['TEST_DATABASE_URL']
        setup_db(self.app, self.database_path)

        self.gamer_token = os.environ('GAMER_TOKEN')
        self.admin_token = os.environ('ADMIN_TOKEN')

        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            self.db.create_all()

        def tearDown(self):
            pass

    if __name__ == "__main__":
        unittest.main()
