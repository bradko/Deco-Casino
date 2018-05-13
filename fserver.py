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
		return render_template('index.html')

@app.route('/login', methods=['POST'])
def do_admin_login():
 
    POST_USERNAME = str(request.form['username'])
    POST_PASSWORD = str(request.form['password'])
 
    Session = sessionmaker(bind=engine)
    s = Session()
    query = s.query(User).filter(User.username.in_([POST_USERNAME]), User.password.in_([POST_PASSWORD]) )
    result = query.first()
    if result:
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

	user = User(username, password)
	session.add(user)

	session.commit()

	return index()

if __name__ == '__main__':
	app.secret_key = os.urandom(12)
	app.run(debug=True, port=5001)
