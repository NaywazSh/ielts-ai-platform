from fastapi import FastAPI, HTTPException
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