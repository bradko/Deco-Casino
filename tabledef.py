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
 
    username = Column(String, primary_key=True)
    password = Column(String)
 
    #----------------------------------------------------------------------
    def __init__(self, username, password):
        """"""
        self.username = username
        self.password = password

class Credits(Base):
    """"""
    __tablename__ = "credits"
 
    username = Column(String, primary_key=True)
    credits = Column(Integer)
 
    #----------------------------------------------------------------------
    def __init__(self, username, credits):
        """"""
        self.username = username
        self.credits = credits

class Blackjack(Base):
    """"""
    __tablename__ = "blackjack"
 
    username = Column(String, primary_key=True)
    totalScore = Column(Integer)
    handsWon = Column(Integer)
    bestStreak = Column(Integer)
    numBlackjacks = Column(Integer)
 
    #----------------------------------------------------------------------
    def __init__(self, username, totalScore, handsWon, bestStreak, numBlackjacks):
        """"""
        self.username = username
        self.totalScore = totalScore
        self.handsWon = handsWon
        self.bestStreak = bestStreak
        self.numBlackjacks = numBlackjacks

class HighLow(Base):
    """"""
    __tablename__ = "highlow"
 
    username = Column(String, primary_key=True)
    totalScore = Column(Integer)
    numWins = Column(Integer)
    bestStreak = Column(Integer)
 
    #----------------------------------------------------------------------
    def __init__(self, username, totalScore, handsWon, bestStreak):
        """"""
        self.username = username
        self.totalScore = totalScore
        self.numWins = handsWon
        self.bestStreak = bestStreak
 
# create tables
Base.metadata.create_all(engine)