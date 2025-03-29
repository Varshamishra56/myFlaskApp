## 🧠 Features

- Lightweight Flask API
- Gemini API integration (`/ask` endpoint)
- Cloud Run compatible (listens on `0.0.0.0:8080`)
- Deployed via Docker + Artifact Registry

---


## 🔧 Environment Setup (Cloud Shell)

Set these variables in Cloud Shell:

```bash
export GOOGLE_CLOUD_PROJECT='qwiklabs-gcp-03-e16f0e61a04e'
export GOOGLE_CLOUD_REGION='us-central1'
export SERVICE_NAME='gemini-flask-app'
export AR_REPO='gemini-repo'
```

---

## 📦 Step 1: Build & Push Docker Image

```bash
gcloud builds submit \
  --tag $GOOGLE_CLOUD_REGION-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/$AR_REPO/$SERVICE_NAME
```

---

## 🚀 Step 2: Deploy to Cloud Run

```bash
gcloud run deploy $SERVICE_NAME \
  --image $GOOGLE_CLOUD_REGION-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/$AR_REPO/$SERVICE_NAME \
  --platform=managed \
  --region=$GOOGLE_CLOUD_REGION \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

> 🔐 Replace `YOUR_GEMINI_API_KEY` with your actual Gemini API key.  
> You can store it in Secret Manager for production use.

---

## 📬 API Endpoints

### `GET /`
Health check.

**Response:**
```json
{ "message": "Flask Gemini App is running!" }
```

---

### `POST /ask`
Send prompt to Gemini API.

**Request:**
```json
{
  "prompt": "What is the capital of France?"
}
```

**Response:**
Returns Gemini's generated content.

---

## 📚 References

- [Gemini API Docs](https://ai.google.dev/)
- [Cloud Run Docs](https://cloud.google.com/run/docs)

---
