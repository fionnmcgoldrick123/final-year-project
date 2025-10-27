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
    response = f"Received prompt: {prompt}"
    return {"response": response}

