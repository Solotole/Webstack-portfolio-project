#!/usr/bin/python3
"""end-routes dealing directly various questions operations"""
from flask import Blueprint, jsonify, request
from models.question import Question
from models import storage
from api.v1.views import app_views
from models.answer import Answer


@app_views.route('/admin/questions', methods=['POST'])
def create_question():
    """creting a question from the admin page"""
    diction = {}
    data = request.get_json()
    if not data or 'question' not in data:
        return jsonify({"error": "Invalid input"}), 400
    # new_question = Question(quiz_id=data['quiz_id'], text=data['text'])
    diction['question'] = data.get('question')
    new_question = Question(**diction)
    new_question.save()
    return jsonify({"question_id": new_question.id, "data": new_question.to_dict()}), 201

@app_views.route('/<quiz_id>', methods=['GET'])
def get_questions_by_quiz(quiz_id):
    """getting all questions by quiz"""
    questions = [q.to_dict() for q in storage.all(Question).values() if q.quiz_id == quiz_id]
    return jsonify(questions)

@app_views.route('/admin/questions/<question_id>', methods=['DELETE'])
def delete_question(question_id):
    """Delete a question and answer associated with question ID"""
    question = storage.get(Question, question_id)
    if not question:
        return jsonify({"error": "Question not found"}), 404
    # Delete answers associated with the question
    storage.delete_existing(Answer, {'question_id': question_id})
    # deleting the question itself
    storage.delete(Question, question_id)
    return jsonify({"message": "Question and its answeres deleted successfully"}), 200

@app_views.route('/admin/questions/<question_id>', methods=['PUT'])
def update_question_answers(question_id):
    """end-route hanler that updates question and answers"""
    data = request.json
    updated_question = data.get('question')
    print('updated question---{}---'.format(updated_question))
    updated_options = data.get('options')
    updated_correct_answer = data.get('correctAnswer')
    
    question_update_data = {"question": updated_question}

    question_result = storage.update(Question, question_id, question_update_data)
    print('question result----{}---'.format(question_result))
    answer_update_data = {
            "answers": updated_options,
            "correct_answer": updated_correct_answer
    }
    answer_result = storage.update(Answer, question_id, answer_update_data)
    print('answer result---{}---'.format(answer_result))
    if question_result and answer_result:
        return jsonify({"message": "Updated successfully"}), 200
    elif not answer_result:
        return jsonify({"error": "Failed to update answers"}), 404
    else:
        return jsonify({"error": "Update failed"}), 404
