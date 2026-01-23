from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()

class Question(Base):
    __tablename__ = 'questions'
    id = Column(Integer, primary_key=True, index=True)
    module = Column(String) # Writing, Speaking
    text = Column(Text)
    category = Column(String) # e.g., Education, Environment

class UserAttempt(Base):
    __tablename__ = 'attempts'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer) # Link to User table
    question_id = Column(Integer, ForeignKey('questions.id'))
    user_response = Column(Text)
    ai_score = Column(Float)
    ai_feedback_json = Column(Text) # Store the full JSON result
    created_at = Column(DateTime, default=datetime.utcnow)