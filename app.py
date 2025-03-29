from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={GEMINI_API_KEY}"

@app.route("/")
def home():
    return jsonify({"message": "Flask Gemini App is running!"})

@app.route("/ask", methods=["POST"])
def ask_gemini():
    data = request.get_json()
    prompt = data.get("prompt")

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }]
    }

    response = requests.post(
        GEMINI_URL,
        headers={"Content-Type": "application/json"},
        json=payload
    )

    result = response.json()
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
