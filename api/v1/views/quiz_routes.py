#!/usr/bin/python3
""" books api handler module """
from models import storage
from flask import jsonify, request, make_response
from api.v1.views import app_views
from models.quiz import Quiz

@app_views.route('/quiz', methods=['GET'])
def get_all_quizzes():
    """getting all quizes from database"""
    quizzes = storage.all(Quiz)
    return jsonify([quiz.to_dict() for quiz in quizzes.values()])

@app_views.route('/admin/create_quiz', methods=['POST'])
def create_quiz():
    """creating quizes from admin page"""
    data = request.get_json()
    if not data or 'title' not in data or 'description' not in data:
        return jsonify({"error": "Invalid input"}), 400
    new_quiz = Quiz(title=data['title'], description=data['description'])
    storage.new(new_quiz)
    return jsonify(new_quiz.to_dict()), 200
