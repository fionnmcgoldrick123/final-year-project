# Adaptive Programming Quiz App

A web-based platform that generates personalised, AI-powered programming quizzes.  
Users choose the programming language, topic, and AI model, and the backend produces structured quizzes with automatic answer validation. This will be accompanied with a user profile with a 'gamified' experience reward system for user satisfaction and engagement.

This project uses:

- **Frontend:** ``React`` + ``Vite`` + ``TypeScript`` 
- **Backend:** ``FastAPI`` ``(Python)  ``
- **Database:** ``PostgreSQL`` with ``TablePlus``
- **Containerisation:** ``Docker`` / ``Docker Compose  ``
- **AI Layer:** Pluggable LLM endpoints

This app is part of my Final Year Project:  
**Development of an AI-Powered Web Platform for Adaptive Programming Quizzes and Practical Learning.**

---

## Features

- AI-generated quizzes based on language and topic  
- Ability to switch AI models  
- Adaptive difficulty  
- Strict JSON quiz format enforced server-side  
- User accounts and 'gamified' progress system
- Account registering, login and security.

---

## How to Run (Development)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-project>
```

### 2. Start the FastAPI Backend

Create a virtual environment:

```
python -m venv venv
```

Activate it:

```
source venv/bin/activate      # macOS/Linux
venv\Scripts\activate         # Windows
```

Install backend dependencies:

```
pip install -r requirements.txt
```

Run the backend server:

```
uvicorn main:app --reload
```

Backend will be available at:
http://127.0.0.1:8000

### 3. Start the React Frontend

Navigate to the frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

Frontend will be available at: http://localhost:5173

- - - 

### Note
*It is important to note that this set up pipline will be prone to change especially with future Docker implementation. The above section will be updated accordingly to changes*

- - - 

##  Local LLM Experiments (Ollama)

This project supports running large language models locally using Ollama.
I experimented with models like `llama3.1:8b` on my machine.

### To try the same setup:

Install [*Ollama*](https://ollama.com/download/windows) for *Windows, Mac or Linux*.

Pull any *Ollama* provided models.

They will be automatically downloaded to the directory: ``C:\Users\<YOUR_USERNAME>\.ollama\models\``. You will find the actual model under the ``model/blobs`` directory where the model is split up into files with hashed file names.

List of models are [here](https://ollama.com/search).

For me I pulled the ``llama3.1:8b``. 

*I selected the llama3.1:8b model because its 8-billion-parameter size provides a strong balance between capability and efficiency. It is large enough to deliver solid reasoning and generation quality, yet still lightweight enough to run locally on a standard laptop without a GPU. This makes it suitable for quick experimentation, offline testing, and integrating local LLM behaviour into my workflow. The model is also easy to install and manage through Ollama, which avoids the need for external API usage.*

```
ollama pull llama3.1:8b
```

You can now run the model with the following command: 

```
ollama run llama3.1:8b
```













##  Local LLM Experiments (Ollama)

This project supports running large language models locally using Ollama.
I experimented with models like `llama3.1:8b` on my machine.

### To try the same setup:

Install [*Ollama*](https://ollama.com/download/windows) for *Windows, Mac or Linux*.

Pull any *Ollama* provided models.

They will be automatically downloaded to the directory: ``C:\Users\<YOUR_USERNAME>\.ollama\models\``. You will find the actual model under the ``model/blobs`` directory where the model is split up into files with hashed file names.

List of models are [here](https://ollama.com/search).

For me I pulled the ``llama3.1:8b``. 

*I selected the llama3.1:8b model because its 8-billion-parameter size provides a strong balance between capability and efficiency. It is large enough to deliver solid reasoning and generation quality, yet still lightweight enough to run locally on a standard laptop without a GPU. This makes it suitable for quick experimentation, offline testing, and integrating local LLM behaviour into my workflow. The model is also easy to install and manage through Ollama, which avoids the need for external API usage.*

```
ollama pull llama3.1:8b
```

You can now run the model with the following command: 

```
ollama run llama3.1:8b
```

- - -

### Local LLM Testing (llama3.1:8b)

You can see my first interation with my local model [here](./docs/OllamaLocalRun.png). I am just using the Ollama desktop application.

I then ran the first test prompt to generate a quiz on Java Linked Lists. This prompt included the contents of **prompt-guide.txt**, which holds the internal formatting rules and instructions sent from the backend (not visible to the user).

See **prompt-guide.txt** details:

<details>

```
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

```
</details>


### Future LoRA Implentation

After researching how to modify locally run AI models, *LoRA* appears to be a strong option for future fine-tuning. However, I will first get the model running with my application to see if it has the capabilites to reach my standards first. 

For now, I am going to see if the model operates well with the tasks it's given. If it needs fine-tuning I look towards *LoRA* or *HuggingFace*.
















