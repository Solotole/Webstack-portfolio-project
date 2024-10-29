#!/usr/bin/python3
"""authentication code mechanism"""
from flask import Blueprint, Flask, render_template, request, redirect, url_for, flash
from flask import request, session
import hashlib
from models import storage
from models.user import User

app = Flask(__name__)

app.secret_key = 'teen coding hub'

@app.route('/signup', methods=['POST', 'GET'])
def signup():
    """signup rout handler"""
    msg, user = '', {}
    dictionary = {}
    if (request.method == 'POST' and 'email' in request.form and
        'username' in request.form and
        'password' in request.form):
        print('-----sskbhcbdjh----')
        email = request.form['email']
        password = request.form['password']
        username = request.form['username']
        hash = password + app.secret_key
        hash = hashlib.sha1(hash.encode())
        password = hash.hexdigest()
        dictionary = {'username': username, 'email': email}
        print(dictionary)
        user = storage.get_existing(User, dictionary)
        if user:
            msg = 'Account already exists'
        else:
            dictionary['password'] = password
            instance = User(**dictionary)
            instance.save()
            msg = 'You have successfully registered!'
    return render_template('signup.html', msg=msg)

@app.route('/login', methods=['GET', 'POST'])
def login():
    """login route handler"""
    if (request.method == 'POST' and 'email' in request.form and
        'password' in request.form):
         email = request.form['email']
         password = request.form['password']
         hash = password + app.secret_key
         hash = hashlib.sha1(hash.encode())
         password = hash.hexdigest()
         dictionary = {'username': username, 'email': email}
         user = storage.get_existing(User, dictionary)
         if user:
             session['loggedin'] = True
             session['id'] = user['id']
             return redirect(url_for('home'))
    return render_template('login.html')


@app.route('/')
def home():
    """home route handler"""
    return "Welcome to Teens Coding Hub!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
