#!/usr/bin/python3
"""Routes file dealing with answers posting, getting, ..."""
from flask import Blueprint, jsonify, request
from api.v1.views import app_views
from models.answer import Answer
from models import storage
from models.user import User


@app_views.route('/admin/answers', methods=['POST'])
def create_answers():
    """creating answers from the admin page"""
    data = request.get_json()
    if not data or 'question_id' not in data or 'answers' not in data or 'correct_answer' not in data:
        return jsonify({"error": "Invalid input"}), 400
    new_answer = Answer(question_id=data['question_id'], answers=data['answers'], correct_answer=data['correct_answer'])
    new_answer.save()
    return jsonify(new_answer.to_dict()), 201

@app_views.route('/update_user_results', methods=['POST'])
def update_user_results():
    """update user results"""
    data = request.get_json()
    if not data or 'result' not in data:
        return jsonify({"error": "Invalid input"}), 400
    user = storage.get(User, user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    user.result.append(data['result'])
    storage.save()
    return jsonify({"message": "Result updated successfully"}), 200

@app_views.route('/answers/<answer_id>', methods=['DELETE'])
def delete_answer(answer_id):
    """Delete an answer by ID"""
    answer = storage.get(Answer, answer_id)
    if not answer:
        return jsonify({"error": "Answer not found"}), 404
    storage.delete(answer)
    storage.save()
    return jsonify({"message": "Answer deleted successfully"}), 200
