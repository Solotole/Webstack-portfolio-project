#!/usr/bin/python3
"""retrieving quizzes and questions and answers"""
from flask import Flask, render_template, url_for, redirect, session
from models.quiz import Quiz
from flask import Blueprint
from models import storage
from models.answer import Answer
from models.question import Question

tasks_bp = Blueprint('task', __name__)

@tasks_bp.route('/show_quizzes')
def show_quizzes():
    """retrieving all quizzes"""
    if not session.get('loggedin', None):
        return redirect('/login')
    quizzes = storage.all(Quiz)
    return render_template('quiz.html', quizzes=quizzes)
