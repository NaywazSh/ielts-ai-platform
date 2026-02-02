from sqlalchemy import Column, Integer, String, Text, JSON, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class ReadingTest(Base):
    __tablename__ = "reading_tests"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # A test has many passages
    passages = relationship("ReadingPassage", back_populates="test")

class ReadingPassage(Base):
    __tablename__ = "reading_passages"

    id = Column(Integer, primary_key=True, index=True)
    test_id = Column(Integer, ForeignKey("reading_tests.id"))
    title = Column(String) # E.g., "Passage 1: Vertical Farming"
    content = Column(Text) # The massive text
    
    test = relationship("ReadingTest", back_populates="passages")
    questions = relationship("Question", back_populates="passage")

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    passage_id = Column(Integer, ForeignKey("reading_passages.id"))
    text = Column(String)
    question_type = Column(String) # 'MCQ', 'TRUE_FALSE', 'FILL_GAP'
    
    # We store options as JSON so we don't need a separate table for A/B/C/D
    # Example: ["60%", "70%", "80%"]
    options = Column(JSON) 
    
    correct_answer = Column(String)
    explanation = Column(Text) # For AI feedback later
    
    passage = relationship("ReadingPassage", back_populates="questions")
