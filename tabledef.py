from sqlalchemy import *
from sqlalchemy import create_engine, ForeignKey
from sqlalchemy import Column, Date, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, backref
 
engine = create_engine('sqlite:///static/casino.db', echo=True)
Base = declarative_base()
 
########################################################################
class User(Base):
    """"""
    __tablename__ = "users"
 
    id = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String)
    credits = relationship("Credits", uselist=False, back_populates="user")
    game = relationship("Game")
 
    #----------------------------------------------------------------------
    def __init__(self, username, password):
        """"""
        self.username = username
        self.password = password

class Credits(Base):
    """"""
    __tablename__ = "credits"
 
    id = Column(Integer, primary_key=True)
    username = Column(String)
    credits = Column(Integer)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="credits")
 
    #----------------------------------------------------------------------
    def __init__(self, username, credits, user):
        """"""
        self.username = username
        self.credits = credits
        self.user = user

class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True)
    username = Column(String)
    game = Column(String)
    totalScore = Column(Integer)
    numWins = Column(Integer)
    bestStreak = Column(Integer)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User")

    def __init__(self, username, game, totalScore, numWins, bestStreak, user):
        """"""
        self.username = username
        self.game = game
        self.totalScore = totalScore
        self.numWins = numWins
        self.bestStreak = bestStreak
        self.user = user

# create tables
Base.metadata.create_all(engine)