import os
# from dotenv import load_dotenv
# load_dotenv() # Optional on Render (it uses Environment Variables settings)

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.services.ai_engine import ai_engine

app = FastAPI(title="IELTS AI Master")

# --- CORS SETUP ---
# This allows Vercel to talk to Render
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For now, allow all. Later change to your Vercel URL.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- WRITING SECTION ---
class WritingSubmission(BaseModel):
    question: str
    answer: str

@app.post("/api/v1/evaluate/writing")
async def evaluate_writing(submission: WritingSubmission):
    try:
        # Call the AI Engine (OpenAI/Gemini)
        result = await ai_engine.evaluate_writing(submission.question, submission.answer)
        return result
    except Exception as e:
        print(f"Error: {str(e)}") # Print to Render logs
        raise HTTPException(status_code=500, detail=str(e))

# --- HEALTH CHECK ---
@app.get("/")
def health_check():
    return {"status": "AI Core Online", "provider": ai_engine.provider}

# --- READING SECTION (Safe to keep) ---
READING_TESTS = {
    "test_1": {
        "title": "The Impact of Artificial Intelligence on Modern Education",
        "passage": "Artificial Intelligence (AI) has moved from the realm of science fiction into our daily lives... [Long IELTS-style passage here] ...Ultimately, the goal is to enhance the human teacher, not replace them.",
        "questions": [
            {"id": 1, "text": "When did AI move into daily lives?", "answer": "Recently"},
            {"id": 2, "text": "What is the ultimate goal of AI in education?", "answer": "To enhance the human teacher"}
        ]
    }
}

@app.get("/reading/{test_id}")
async def get_reading_test(test_id: str):
    test = READING_TESTS.get(test_id)
    if not test:
        return {"error": "Test not found"}
    return test
