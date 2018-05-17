from flask import Flask, request, render_template, session, redirect, flash, abort
from flask_bootstrap import Bootstrap
from flask_wtf import Form
from sqlalchemy.orm import sessionmaker
from tabledef import *
import os
from wtforms import TextField, TextAreaField, validators, StringField, SubmitField, PasswordField, SelectField
from wtforms.validators import DataRequired
engine = create_engine('sqlite:///static/casino.db', echo=True)

app = Flask(__name__)
Bootstrap(app)

class AccountForm(Form):
	username = TextField('Username:', validators=[validators.required()])
	password = PasswordField('Password:', validators=[validators.required(), validators.Length(min=3, max=35)])
	submit = SubmitField('Submit')

class CreateAccountForm(Form):
	submit = SubmitField('Create Account')

class SelectGameForm(Form):
	game = SelectField('Select Game', choices=[("blackjack","Blackjack"), ("highlow", "High-Low")])
	submit = SubmitField('Play')

class AddCreditsForm(Form):
	submit = SubmitField('Add Credits')

@app.route('/')
def index():
	if not session.get('logged_in'):
		form = AccountForm()
		form2 = CreateAccountForm()
		return render_template('login.html', form=form, form2=form2)
	else:
		form = SelectGameForm()
		form2 = AddCreditsForm()
		return render_template('index.html', username=session['username'], credits=session['numCredits'], form=form, form2=form2)

@app.route('/login', methods=['POST'])
def do_admin_login():
 
	form = AccountForm()
	if form.validate_on_submit():
		POST_USERNAME = str(form.username.data)
		POST_PASSWORD = str(form.password.data)

	Session = sessionmaker(bind=engine)
	s = Session()
	query = s.query(User).filter(User.username.in_([POST_USERNAME]), User.password.in_([POST_PASSWORD]) )
	result = query.first()
	if result:
		query = s.query(User).join(Credits).filter(User.username == POST_USERNAME).all()
		for result in query:
			credits = result.credits.credits
		session['numCredits'] = credits
		session['username'] = POST_USERNAME
		session['logged_in'] = True
	else:
	    flash('Invalid Credentials, Please Try Again')
	return index()

@app.route("/logout")
def logout():
    session['logged_in'] = False
    return index()

@app.route('/createAccount')
def createAccount():
	form = AccountForm()
	return render_template('createAccount.html', form=form)

@app.route('/addToUsers', methods=['POST'])
def addToLogin():	

	form = AccountForm()
	if form.validate_on_submit():
		username = str(form.username.data)
		password = str(form.password.data)
	else:
		return render_template('createAccount.html', form=form)

	Session = sessionmaker(bind=engine)
	session = Session()

	if session.query(exists().where(User.username == username)).scalar():
		flash('Username Already Exists, Please Try Another')
		return createAccount()
	else:
		user = User(username, password)
		session.add(user)

		credits = Credits(username, 1000, user)
		session.add(credits)

		session.commit()

		return index()

@app.route('/selectGame', methods=['POST'])
def selectGame():

	form = SelectGameForm()

	game = str(form.game.data)
	session['currentGame'] = game

	Session = sessionmaker(bind=engine)
	s = Session()

	u = session['username']
	user = s.query(User).filter(User.username == u).all()
	numGame = s.query(User).join(Game).filter(User.username == u).filter(Game.game == game).count()

	if numGame == 0:
		g = Game(u, game, 0, 0, 0, user[0])
		s.add(g)
		s.commit()
	
	gameTable = s.query(User).join(Game).filter(User.username == u).filter(Game.game == game).all()

	totalScore = gameTable[0].game[0].totalScore
	numWins = gameTable[0].game[0].numWins
	bestStreak = gameTable[0].game[0].bestStreak

	if game == 'highlow':
		return render_template('highlow.html', username=session['username'], credits=session['numCredits'], totalScore=totalScore, numWins=numWins, bestStreak=bestStreak, currentStreak=0)
	else:
		return render_template('blackjack.html', username=session['username'], credits=session['numCredits'], totalScore=totalScore, numWins=numWins, bestStreak=bestStreak, currentStreak=0)

@app.route('/addCredits')
def addCredits():
	Session = sessionmaker(bind=engine)
	s = Session()

	u = session['username']
	query = s.query(User).join(Credits).filter(User.username == u).all()
	for result in query:
		result.credits.credits += 1000

	session['numCredits'] = result.credits.credits
	s.commit()

	form = SelectGameForm()
	form2 = AddCreditsForm()

	return render_template('index.html', username=session['username'], credits=session['numCredits'], form=form, form2=form2)

@app.route('/updateGame')
def updateGame():	
	Session = sessionmaker(bind=engine)
	s = Session()

	game = session['currentGame']
	args = request.args
	print(args)

	bestStreak = int(args.get('bestStreak'))
	betWon = args.get('betWon')
	betAmount = int(args.get('betAmount'))
	currentStreak = int(args.get('currentStreak'))

	u = session['username']
	print(bestStreak)
	print(betWon)
	print(betAmount)

	gameTable = s.query(User).join(Game).filter(User.username == u).filter(Game.game == game).all()

	creds = s.query(User).join(Credits).filter(User.username == u).all()

	if betWon == "true":
		gameTable[0].game[0].totalScore += betAmount
		gameTable[0].game[0].numWins += 1
		creds[0].credits.credits += betAmount
		flash("You Won!")
	else:
		gameTable[0].game[0].totalScore -= betAmount
		creds[0].credits.credits -= betAmount
		flash("You Lost!")
	gameTable[0].game[0].bestStreak = bestStreak

	session['numCredits'] = creds[0].credits.credits
	totalScore = gameTable[0].game[0].totalScore
	numWins = gameTable[0].game[0].numWins
	bestStreak = gameTable[0].game[0].bestStreak

	s.commit()

	if game == 'highlow':
		return render_template('highlow.html', username=session['username'], credits=session['numCredits'], totalScore=totalScore, numWins=numWins, bestStreak=bestStreak, currentStreak=currentStreak)
	else:
		return render_template('blackjack.html', username=session['username'], credits=session['numCredits'], totalScore=totalScore, numWins=numWins, bestStreak=bestStreak, currentStreak=currentStreak)

@app.route('/map')
def map():	
	return render_template('map.html', username=session['username'], credits=session['numCredits'])

if __name__ == '__main__':
	app.secret_key = os.urandom(12)
	app.run(debug=True, port=5001)
