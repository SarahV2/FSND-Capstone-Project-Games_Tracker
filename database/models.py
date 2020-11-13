import os
from sqlalchemy import Column, String, Integer, create_engine
from flask_sqlalchemy import SQLAlchemy
import json

database_name = "caps"
database_path = "postgres://{}/{}".format("localhost:5432", database_name)

db = SQLAlchemy()

"""
setup_db(app)
    binds a flask application and a SQLAlchemy service
"""


def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    db.create_all()


"""
Game
"""


class Game(db.Model):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    release_year = Column(String)

    def __init__(self, title, release_year):
        self.title = title
        self.release_year = release_year
    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            "id": self.id,
            "title": self.title,
            "release_year": self.release_year,
        }

"""
Game Record
"""



"""
User
"""