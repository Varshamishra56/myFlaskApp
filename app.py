from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
import requests

app = Flask(__name__)

# Firebase Setup
cred = credentials.Certificate("firebase_key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Gemini API Key (Use secret manager in production)
GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key={GEMINI_API_KEY}"

@app.route("/")
def home():
    return jsonify({"message": "Flask Gemini App is running!"})

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    prompt = data.get("prompt")

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    # Make a call to Gemini
    response = requests.post(
        GEMINI_URL,
        headers={"Content-Type": "application/json"},
        json={
            "prompt": {
                "text": prompt
            }
        }
    )

    result = response.json()
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
