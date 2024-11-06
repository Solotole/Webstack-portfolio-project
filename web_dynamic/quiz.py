#!/usr/bin/python3
"""retrieving quizzes and questions and answers"""
from flask import Flask, render_template, url_for, redirect, session
from models.quiz import Quiz
from flask import Blueprint
from models import storage
from models.answer import Answer
from models.question import Question
from models.result import Result


tasks_bp = Blueprint('task', __name__)


def non_attempted():
    """ retrieving unattempted quizzes"""
    attempted_quizzes = []
    results = storage.all(Result)
    for value in results.values():
        if value.user_id == session.get('id'):
            attempted_quizzes.append(value.id)
    return attempted_quizzes


@tasks_bp.route('/show_quizzes')
def show_quizzes():
    """retrieving all quizzes"""
    if not session.get('loggedin', None):
        return redirect('/login')
    attempted = non_attempted()
    quizz = storage.all(Quiz)
    quizzes = {}
    for key, value in quizzes.items():
        if value.id in attempted:
            continue
        else:
            quizzes[key] = value
    return render_template('quiz.html', quizzes=quizzes)
