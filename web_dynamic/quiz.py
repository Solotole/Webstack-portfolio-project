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
    for result in results.values():
        if result.user_id == session.get('id'):
            attempted_quizzes.append(result.quiz_id)
    return attempted_quizzes


@tasks_bp.route('/show_quizzes')
def show_quizzes():
    """retrieving all quizzes"""
    if not session.get('loggedin', None):
        return redirect('/login')
    # not retrieving quizzes done by user
    attempted = non_attempted()
    all_quizzes = storage.all(Quiz)
    unattempted_quizzes = {}
    for key, quiz in all_quizzes.items():
        if quiz.id in attempted:
            continue
        else:
            unattempted_quizzes[key] = quiz
    return render_template('quiz.html', quizzes=unattempted_quizzes)
