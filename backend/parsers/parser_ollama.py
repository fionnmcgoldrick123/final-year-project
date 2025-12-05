import re
from pydantic_models import QuizSchema
import json

from pydantic_models import QuizSchema
import json
import re

def ollama_parser(response: dict) -> list[QuizSchema]:
    """
    Parses the response from the local-running ollama model
    by fixing formatting issues and extracting quiz data. 
    Parses the cleaned content into QuizSchema objects.

    Args:
        response (dict): The response dictionary from the ollama model.

    Returns:
        list[QuizSchema]: A list of QuizSchema objects extracted from the response.
    """
    content = response["response"]

    content = re.sub(r'"\s*([A-D])"]\s*', r'"\1: ', content)

    def fix_options(match):
        block = match.group(1)
        opts = re.findall(r'"[^"]*"', block)
        return '"options": [' + ", ".join(opts) + "]"

    content = re.sub(r'"options":\s*\[(.*?)\]', fix_options, content, flags=re.DOTALL)

    content = re.sub(r',\s*([}\]])', r'\1', content)

    try:
        data = json.loads(content)
    except json.JSONDecodeError as e:
        print("JSON parsing failed:", e)
        print("Final content was:\n", content)
        return {"Error": "Failed to parse JSON"}

    quiz_title = data.get("title", "Untitled Quiz")

    questions = []

    for q in data.get("questions", []):
        raw_opts = q.get("options", [])

        # Clean options by removing prefixes like "A: ", "B: ", etc.
        clean_options = [
            opt.split(": ", 1)[1] if ": " in opt else opt
        for opt in raw_opts
        ]

        questions.append(
            QuizSchema(
                title=quiz_title,
                question=q["question"],
                options=clean_options,
                correct_answer=q["answer"]
            )
        )

    return questions


    