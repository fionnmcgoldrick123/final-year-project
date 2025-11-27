from backend.pydantic_models import QuizSchema
import json

def openai_parser(response : dict) -> QuizSchema:
    message = response["choices"][0]["message"]["content"]
    try:
        data = json.loads(message)
    except json.JSONDecodeError as e:
        print("JSON parsing failed: ", e)
        return{"Error" : "Failed to parse JSON"}
    
    print("Parsed Quiz Data:", data)
    
    return QuizSchema(
        question=data["question"],
        options=data["options"],
        correct_answer=data["correct_answer"]
    )
    
    