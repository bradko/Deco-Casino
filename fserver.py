from flask import Flask, request, render_template, session, redirect, flash, abort
from flask_bootstrap import Bootstrap
from sqlalchemy.orm import sessionmaker
from tabledef import *
import os
engine = create_engine('sqlite:///static/casino.db', echo=True)

app = Flask(__name__)
Bootstrap(app)

@app.route('/')
def index():
	if not session.get('logged_in'):
		return render_template('login.html')
	else:
		return render_template('index.html', username=session['username'], credits=session['numCredits'])

@app.route('/login', methods=['POST'])
def do_admin_login():
 
	POST_USERNAME = str(request.form['username'])
	POST_PASSWORD = str(request.form['password'])

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
	return render_template('createAccount.html')

@app.route('/addToUsers')
def addToLogin():	

	args = request.args
	username = args.get('username')
	password = args.get('password') 

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

@app.route('/selectGame')
def selectGame():
	args = request.args
	game = str(args['game'])

	if game == 'highlow':
		return render_template('highlow.html')
	else:
		return render_template('blackjack.html')

@app.route('/addCredits')
def addCredits():
	Session = sessionmaker(bind=engine)
	s = Session()

	print("ADDDING")
	u = session['username']
	print(u)
	query = s.query(User).join(Credits).filter(User.username == u).all()
	for result in query:
		result.credits.credits += 1000

	session['numCredits'] = result.credits.credits
	s.commit()

	return render_template('index.html', username=session['username'], credits=session['numCredits'])

if __name__ == '__main__':
	app.secret_key = os.urandom(12)
	app.run(debug=True, port=5001)
