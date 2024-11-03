#!/usr/bin/python3
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Define correct answers
CORRECT_ANSWERS = {
        "question1": "A",
        "question2": "A",
        "question3": "A"
        }

@app.route('/')
def quiz():
    return render_template('quiz.html')

@app.route('/submit-quiz', methods=['POST'])
def submit_quiz():
    user_answers = request.form
    score = 0
    total_questions = len(CORRECT_ANSWERS)

    for question, correct_answer in CORRECT_ANSWERS.items():
        if user_answers.get(question) == correct_answer:
            score += 1
    return render_template('result.html', score=score, total=total_questions)

if __name__ == '__main__':
    app.run(debug=True)
