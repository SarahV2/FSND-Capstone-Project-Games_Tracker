import os
from sqlalchemy import Column, String, Integer, create_engine, DateTime, ARRAY
from flask_sqlalchemy import SQLAlchemy
import json
from flask_migrate import Migrate
from datetime import datetime
from sqlalchemy.sql import func


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
    # db.create_all()
    migrate = Migrate(app, db)


"""
Game
"""


class Game(db.Model):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    about = Column(String)
    imgSrc = Column(String)
    release_year = Column(String)
    genres = Column(ARRAY(String))
    platforms = Column(ARRAY(String))
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=func.now())

    def __init__(self, title, about, imgSrc, release_year, genres, platforms, created_at, updated_at):
        self.title = title
        self.about = about
        self.imgSrc = imgSrc
        self.release_year = release_year
        self.genres = genres
        self.platforms = platforms
        self.created_at = created_at
        self.updated_at = updated_at

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def undoInsert(self):
        db.rollback()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            "id": self.id,
            "title": self.title,
            "about": self.about,
            "imgSrc": self.imgSrc,
            "release_year": self.release_year,
            "genres": self.genres,
            "platforms": self.platforms,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }


"""
Game Record
"""


"""
User
"""

class User(db.Model):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now())

    def __init__(self, email, created_at, updated_at):
        self.email = email
        self.created_at = created_at
        self.updated_at = updated_at

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def undoInsert(self):
        db.rollback()
