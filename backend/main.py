from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import httpx

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:8000",
]

class PromptRequest(BaseModel):
    prompt: str
    

prompt_guide_file = "./prompt-guide.txt"

# Reads through 'prompt-guide.txt' and stores it inside QUIZ_FORMAT_GUIDE
with open(prompt_guide_file, "r", encoding="utf-8") as file:
    # This variable stores a string. A set of rules that is sent with the users prompt to the AI model. 
    QUIZ_FORMAT_GUIDE = file.read()


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
    prompt_request =  QUIZ_FORMAT_GUIDE + " \n" + prompt.prompt
    print(prompt_request)
    return {"response": prompt_request}

@app.get("/health")
async def health_check():
    return{"status" : "alive"}