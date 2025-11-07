from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:8000",
]

class PromptRequest(BaseModel):
    prompt: str

# This variable stores a string. A set of rules that is sent with the users prompt to the AI model. 
QUIZ_FORMAT_GUIDE = """
You must format every quiz using this exact JSON structure:

{
  "title": "",
  "difficulty": "",
  "questions": [
    {
      "question": "",
      "options": ["A", "B", "C", "D"],
      "answer": ""
    }
  ]
}

Rules:
- Never include extra explanations unless specifically asked.
- Always return valid JSON.
- Always include exactly 4 multiple-choice options that are closely related and all plausible
  with only one right answer.
- Keep questions short and clear.

Now base this quiz off the following prompt:
"""


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   
    allow_credentials=True,
    allow_methods=["*"],           
    allow_headers=["*"],            
)

@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.post("/prompt")
async def send_prompt(prompt: PromptRequest):
    # Here you would typically process the prompt, e.g., send it to a model or service
    prompt_request =  QUIZ_FORMAT_GUIDE + " \n" + prompt
    return {"response": prompt_request}

