from flask import Flask, request, render_template, session, redirect, flash, abort
from flask_bootstrap import Bootstrap
import sqlite3
import os

app = Flask(__name__)
Bootstrap(app)

@app.route('/')
def index():
	if not session.get('logged_in'):
		return render_template('login.html')
	else:
		return "Hello"

@app.route('/login', methods=['POST'])
def do_admin_login():
    if request.form['password'] == 'password' and request.form['username'] == 'admin':
        session['logged_in'] = True
    else:
        flash('wrong password!')
    return index()

@app.route('/createAccount')
def createAccount():
	return render_template('createAccount.html')

@app.route('/addToLogin')
def addToLogin():	

	args = request.args
	username = args.get('username')
	password = args.get('password') 

	conn = sqlite3.connect('static/login.db')
	c = conn.cursor()

	c.execute("CREATE TABLE IF NOT EXISTS info (username text, password text)")

	vals = "INSERT INTO info VALUES (" + '"' + username + '"' + "," + '"' + password + '"' + ")"
	print(vals)

	c.execute(vals)

	conn.commit()
	conn.close()

	return index()


if __name__ == '__main__':
	app.secret_key = os.urandom(12)
	app.run(debug=True, port=5001)
