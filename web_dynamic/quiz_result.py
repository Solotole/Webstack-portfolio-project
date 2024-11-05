#!/usr/bin/python3
from flask import redirect, Blueprint, request, jsonify, session
from models import storage
from models.result import Result
from models.question import Question
from models.answer import Answer

result_bp = Blueprint('quiz', __name__)

@result_bp.route('/submit-quiz', methods=['POST'])
def submit_quiz():
    """submission of quiz"""
    if not session.get('loggedin'):
        return redirect('/login')

    user_id = session.get('id')
    quiz_id = request.form.get('quiz_id')
    if not quiz_id:
        return jsonify({"error": "Quiz ID not provided"}), 400
    score = 0
    total_questions = 0

    for key, value in request.form.items():
        if key.startswith('question'):
            question_id = key[len('question'):]
            answer_id = value
            # selected_answer = request.form.get(f'question{key[len("answer_id"):]}') 
            selected_answer = value
            if not answer_id:
                print(f"No answer selected for question {question_id}")
                continue
            question = storage.get(Question, question_id)
            if question:            
                correct_answer_data = storage.get_existing(Answer, {'question_id': question.id})
                correct_answer = correct_answer_data.get('correct_answer') if correct_answer_data else None
                print('correct_answer: {}'.format(correct_answer))
                print('selected_answer: {}'.format(selected_answer))
                if selected_answer == correct_answer:
                    score += 1
            total_questions += 1  # Count total questions
    # Create a result document
    score = (score / total_questions) * 100 if total_questions > 0 else 0
    result_data = {
            "user_id": user_id,
            "quiz_id": quiz_id,
            "score": score,
    }
    new_result = Result(**result_data)
    # Save the result to the MongoDB collection
    new_result.save()
    # Return a JSON response with the result ID
    return jsonify({"result_id": str(new_result.id), "score": score}), 201
