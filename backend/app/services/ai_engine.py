from langchain_openai import ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.schema import HumanMessage, SystemMessage
import os
import json

class AIEngine:
    def __init__(self):
        self.provider = os.getenv("AI_PROVIDER", "openai")
        
        if self.provider == "openai":
            self.llm = ChatOpenAI(model="gpt-4-turbo", temperature=0.7)
        elif self.provider == "google":
            self.llm = ChatGoogleGenerativeAI(model="gemini-pro")
        # Add Grok or others easily here

    async def evaluate_writing(self, question: str, user_answer: str):
        prompt = f"""
        Act as a senior IELTS Examiner. Evaluate the following Writing Task 2 essay.
        
        Question: {question}
        User Answer: {user_answer}
        
        Return a strictly valid JSON response with these keys:
        - "band_score": (float, e.g., 6.5),
        - "feedback": (string, general summary),
        - "corrections": (list of strings, specific grammar/vocab fixes),
        - "vocabulary_score": (float),
        - "coherence_score": (float)
        """
        
        response = self.llm.invoke([SystemMessage(content="You are a strict API returning JSON."), HumanMessage(content=prompt)])
        
        # Clean the response to ensure it's pure JSON
        content = response.content.replace("```json", "").replace("```", "")
        return json.loads(content)

ai_engine = AIEngine()
