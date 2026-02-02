import os
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.services.ai_engine import ai_engine

# Import Database tools
from app.core.database import engine, Base, get_db
from app.models.reading import ReadingTest, ReadingPassage, Question

app = FastAPI(title="IELTS AI Master")

# --- 1. CREATE TABLES ON STARTUP (The Auto-Migrate Trick) ---
# This checks your database and creates the tables if they don't exist
Base.metadata.create_all(bind=engine)

# --- CORS SETUP ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- READING ENDPOINTS (COMMERCIAL GRADE) ---

# Get specific test with all passages and questions
@app.get("/api/v1/reading/{test_id}")
def get_reading_test(test_id: int, db: Session = Depends(get_db)):
    # Fetch test with relationships (This is SQLAlchemy magic)
    test = db.query(ReadingTest).filter(ReadingTest.id == test_id).first()
    
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")
    
    # Structure the data for the frontend
    response = {
        "id": test.id,
        "title": test.title,
        "passages": []
    }
    
    for p in test.passages:
        passage_data = {
            "id": p.id,
            "title": p.title,
            "content": p.content,
            "questions": []
        }
        for q in p.questions:
            passage_data["questions"].append({
                "id": q.id,
                "text": q.text,
                "options": q.options,
                "type": q.question_type,
                # In a real app, maybe don't send correct_answer to frontend ;)
                # But for now we need it for instant grading script
                "correct_answer": q.correct_answer 
            })
        response["passages"].append(passage_data)
        
    return response

# --- SEED DATA ENDPOINT (Only for you to add data easily) ---
@app.post("/api/v1/admin/seed-test")
def seed_database(db: Session = Depends(get_db)):
    # Check if data exists
    if db.query(ReadingTest).first():
        return {"message": "Data already exists!"}

    # Create Test
    new_test = ReadingTest(title="Cambridge IELTS 18 - Test 1")
    db.add(new_test)
    db.commit()
    db.refresh(new_test)

    # Create Passage
    passage_text = "By the year 2050, nearly 80% of the earth's population will reside in urban centers..."
    new_passage = ReadingPassage(test_id=new_test.id, title="Vertical Farming", content=passage_text)
    db.add(new_passage)
    db.commit()
    db.refresh(new_passage)

    # Create Questions
    q1 = Question(
        passage_id=new_passage.id,
        text="What percentage of population will be urban by 2050?",
        question_type="MCQ",
        options=["60%", "70%", "80%", "90%"],
        correct_answer="80%"
    )
    db.add(q1)
    db.commit()

    return {"status": "Database Populated with Real Data"}
