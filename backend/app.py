from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

quiz_data = [
    {"question": "Capital of France?", "answer": "Paris"},
    {"question": "What is 2 + 1", "answer": "3"}
]

@app.route('/quiz', methods=['GET'])
def get_quiz():
    return jsonify(quiz_data)

@app.route('/quiz/submit', methods=['POST'])
def submit_quiz():
    user_answers = request.json
    score = 0
    for q in quiz_data:
        if q['question'] in user_answers and user_answers[q['question']] == q['answer']:
            score += 1
    return jsonify({"score": score})

if __name__ == '__main__':
    app.run(debug=True)
