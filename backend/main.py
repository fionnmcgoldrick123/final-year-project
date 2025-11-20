from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import httpx
from db import get_connection
import bcrypt
import json

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:8000",
]

class PromptRequest(BaseModel):
    prompt: str

class ModelRequest(BaseModel):
    model: str
    
class RegisterRequest(BaseModel):
    first_name: str
    second_name: str
    email: str
    password: str

prompt_guide_file = "./prompt-guide.txt"

current_model = "openai"

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
    global current_model
    if current_model == "openai":
        return await openai_request(prompt)
    if current_model == "llama3.1:8b":
        return await llama3_req(prompt)
        

async def openai_request(prompt: PromptRequest):
    prompt_request =  QUIZ_FORMAT_GUIDE + " \n" + prompt.prompt
    
    url = "https://api.openai.com/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload  = {
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": "you are a quiz generation assistant"},
            {"role": "user", "content": prompt_request}
        ]
    }
    
    timeout = httpx.Timeout(120.0, connect=10.0)
    
    async with httpx.AsyncClient(timeout = timeout) as client: 
        response = await client.post(url, headers=headers, json=payload)
        
    
    data = response.json()
    raw_quiz_string = data["choices"][0]["message"]["content"]
    
    try:
        quiz = json.loads(raw_quiz_string)
    except json.JSONDecodeError as e:
        print("JSON parsing failed: ", e)
        
    print(f"Parsed quiz object:\n{quiz}")
    
    return quiz
    
async def llama3_req(prompt: PromptRequest):
    prompt_request =  QUIZ_FORMAT_GUIDE + " \n" + prompt.prompt
    
    url = "http://localhost:11434/api/generate"
    
    headers = {
        "Content-Type": "application/json"
    }
    
    payload  = {
        "model": "llama3.1:8b",
        # just sending base prompt for now to see basic responses
        "prompt": prompt.prompt,
        "stream": False,  
    }
    
    timeout = httpx.Timeout(120.0, connect=10.0)
    
    async with httpx.AsyncClient(timeout = timeout) as client: 
        response = await client.post(url, headers=headers, json=payload)
        
    print(response.json())
    return response.json()  

@app.get("/health")
async def health_check():
    return{"status" : "alive"}

@app.post("/register")
async def register_user(user_data: RegisterRequest):
    
    password_hash = bcrypt.hashpw(user_data.password.encode(), bcrypt.gensalt()).decode()
    
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
            INSERT INTO users(first_name, second_name, email, password_hash)
            VALUES (%s, %s, %s, %s)
            RETURNING id;
            """,
            (
                user_data.first_name,
                user_data.second_name,
                user_data.email,         
                password_hash
            )
            )
            
            new_user_id = cur.fetchone()["id"]
            print(new_user_id)
    

@app.post("/model")
async def change_model(model: ModelRequest):
    
    if model.model not in ["openai", "llama3.1:8b"]:
        return {"error": "Unknown Model"}
    
    global current_model
    current_model = model.model
    
    print(f"Now using {current_model}")
    return {"message":  f"now using {current_model}"}
