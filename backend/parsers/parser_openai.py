from pydantic_models import QuizSchema
import json

def openai_parser(response : dict) -> QuizSchema:
    content = response["choices"][0]["message"]["content"]

    try:
        data = json.loads(content)
    except json.JSONDecodeError as e:
        print("JSON parsing failed: ", e)
        return{"Error" : "Failed to parse JSON"}
    
    print("Parsed Quiz Data:", data)
    
    quiz_title = data.get("quiz_title", "Untitled Quiz") 
    
    questions = []

    for q in data["questions"]:
        questions.append(
            QuizSchema(
                title = quiz_title,
                question=q["question"],
                options=q["options"],
                correct_answer=q["answer"],
            )
        )
        print(q)
        print(f"question added: {q['question']}")

    return questions

    
    
    