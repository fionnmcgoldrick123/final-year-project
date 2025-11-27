from typing import List
from pydantic import BaseModel

class QuizSchema(BaseModel):
    question: str
    options: List[str]
    correct_answer: str
    
class PromptRequest(BaseModel):
    prompt: str

class ModelRequest(BaseModel):
    model: str
    
class RegisterRequest(BaseModel):
    first_name: str
    second_name: str
    email: str
    password: str