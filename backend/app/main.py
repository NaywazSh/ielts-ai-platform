import os
from dotenv import load_dotenv
# MUST be called before app initialization if you use env vars in app config
load_dotenv() 

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.services.ai_engine import ai_engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="IELTS AI Master")

# Allow frontend to communicate
# PLACE THE CORS MIDDLEWARE HERE
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ielts-ai-platform-7rab.vercel.app", # Your actual Vercel URL
        "http://localhost:3000"                     # For local testing
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ... (rest of your code starts from line 16)

class WritingSubmission(BaseModel):
    question: str
    answer: str

@app.post("/api/v1/evaluate/writing")
async def evaluate_writing(submission: WritingSubmission):
    try:
        result = await ai_engine.evaluate_writing(submission.question, submission.answer)
        # Here you would typically save 'result' to your PostgreSQL database
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def health_check():
    return {"status": "AI Core Online", "provider": ai_engine.provider}

    from fastapi import UploadFile, File
#import whisper # You'll need to add 'openai-whisper' to requirements.txt

@app.post("/evaluate_speaking")
async def evaluate_speaking(file: UploadFile = File(...)):
    # 1. Save and Transcribe
    with open("temp_audio.wav", "wb") as buffer:
        buffer.write(await file.read())
    
    model = whisper.load_model("base")
    result = model.transcribe("temp_audio.wav")
    transcription = result["text"]

    # 2. AI Grading (Reuse your ai_engine logic)
    feedback = ai_engine.analyze_speaking(transcription) 
    return {"transcription": transcription, "feedback": feedback}

    # Dummy data for testing - eventually this could come from a database
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
