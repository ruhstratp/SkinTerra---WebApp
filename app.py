from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

from chat import ChatBot

import nltk
# nltk.download('punkt')

app = Flask(__name__)
CORS(app, resources={r"/chatbot": {"origins": "http://localhost:3000"}})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route("/chatbot", methods=['POST']) 
def chatbot():
    text = request.get_json().get("user_input") 
    # TODO: verify if text is valid
    if text is None:
        return jsonify({"error": "Invalid input"})
    bot = ChatBot("intents.json", "data.pth")
    response = bot.get_response(text)
    return jsonify({"response": response}) 

if __name__ == "__main__":
    app.run(debug=True)
