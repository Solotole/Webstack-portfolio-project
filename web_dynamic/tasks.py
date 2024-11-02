#!/usr/bin/python3
"""module dealing with questions and answers retrieval"""
from flask import Blueprint, redirect, render_template, session
from models import storage
from models.question import Question
from models.answer import Answer


tasks_bp = Blueprint('task', __name__)

@tasks_bp.route('/task')
def task():
    """questions and answers retrieval"""
    if not session.get('loggedin', None):
        return redirect('/login')
    questions_with_answers = []
    questions = storage.all(Question)
    for question in questions.values():
        answer_doc = storage.get_existing(Answer, {'question_id': question.id})
        if answer_doc:
            questions_with_answers.append({
                "question": question,
                "answers": answer_doc['answers'],
                "correct_answer": answer_doc['correct_answer']
            })
    return render_template('quiz.html', questions_with_answers=questions_with_answers)
