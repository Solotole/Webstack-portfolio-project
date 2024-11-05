#!/usr/bin/python3
"""authentication code mechanism"""
from flask import Blueprint, Flask, render_template, request, redirect, url_for, flash
from flask import request, session
from werkzeug.security import generate_password_hash, check_password_hash
from models import storage
from models.user import User
from models.result import Result
from models.quiz import Quiz
from web_dynamic.admin import admin_bp
from web_dynamic.quiz import tasks_bp
from web_dynamic.chat import chat_bp
from web_dynamic.tasks import questions_bp
from web_dynamic.quiz_result import result_bp

app = Flask(__name__)
app.secret_key = 'teens coding hub'

app.register_blueprint(admin_bp, url_prefix='/admin')
app.register_blueprint(tasks_bp)
app.register_blueprint(questions_bp)
app.register_blueprint(chat_bp, url_prefix='/chat')
app.register_blueprint(result_bp)


admins = ['solomontoleak47@gmail.com', 'lizabayo@gmail.com']

@app.route('/signup', methods=['POST', 'GET'])
def signup():
    """signup route handler"""
    msg, user = '', {}
    dictionary = {}
    if (request.method == 'POST' and 'email' in request.form and
        'username' in request.form and
        'password' in request.form):
        email = request.form['email']
        password = request.form['password']
        username = request.form['username']
        password = generate_password_hash(password)
        dictionary = {'username': username, 'email': email}
        session['admin'] = False
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
    msg = ''
    if (request.method == 'POST' and 'email' in request.form and
        'password' in request.form):
        email = request.form['email']
        password = request.form['password']
        dictionary = {'email': email}
        user = storage.get_existing(User, dictionary)
        if user:
            if check_password_hash(user['password'], password):
                if email in admins:
                    session['admin'] = True
                session['loggedin'] = True
                session['id'] = user['id']
                session['username'] = user['username']
                return redirect(url_for('home'))
            if not check_password_hash(user['password'], password):
                msg = 'Wrong password!'
                return render_template('login.html', msg=msg)
        if not user:
            return redirect(url_for('signup'))
    return render_template('login.html', msg=msg)


@app.route('/logout')
def logout():
    """logout end-route handler"""
    # Remove session data, this will log the user out
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    # redirecting to login page
    return redirect(url_for('login'))


@app.route('/home')
def home():
    """home route handler"""
    perfomance = []
    perfomance_dict = {}
    # Checking if the user is logged in
    if 'loggedin' in session:
        # User is loggedin show them the home page
        username = session['username']
        id = session['id']
        results = storage.all(Result)
        for value in results.values():
            if value.user_id == id:
                quiz = storage.get(Quiz, value.quiz_id)
                perfomance_dict['score'] = value.score
                perfomance_dict['title'] = quiz.title
                perfomance.append(perfomance_dict)
        return render_template('home.html', username=username, perfomance=perfomance)
    # User is not loggedin redirect to login page
    return redirect(url_for('login'))

@app.route('/profile')
def profile():
    """profile route handler"""
    # Check if the user is logged in
    if 'loggedin' in session:
        account = storage.get(User, session['id'])
        # Show the profile page with account info
        return render_template('profile.html', account=account)
    # User is not logged in redirect to login page
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
