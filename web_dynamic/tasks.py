#!/usr/bin/python3
"""module dealing with questions and answers retrieval"""
from flask import Blueprint, redirect, render_template, session
from models import storage
from models.question import Question
from models.answer import Answer


questions_bp = Blueprint('question', __name__)

@questions_bp.route('/question/<quiz_id>')
def show_task(quiz_id):
    """questions and answers retrieval"""
    if not session.get('loggedin', None):
        return redirect('/login')
    questions_with_answers = []
    questions = storage.all(Question)
    for question in questions.values():
        if question.quiz_id == quiz_id:
            answer_doc = storage.get_existing(Answer, {'question_id': question.id})
            if answer_doc:
                questions_with_answers.append({
                    "question": question,
                    "answer_id": answer_doc['id'], 
                    "answers": answer_doc['answers'], 
                    "correct_answer": answer_doc['correct_answer'], 
                    "quiz_id": quiz_id, 
                    "user_id": session.get('id', None)
                })
    return render_template('task.html', questions_with_answers=questions_with_answers)
