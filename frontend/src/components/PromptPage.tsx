import '../css-files/PromptPage.css'  
import Navbar from "./Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mcqIcon from "../assets/imgs/test.png";
import codeIcon from "../assets/imgs/web-development.png";

type QuizType = "mcq" | "coding";

const programmingLanguages = [
    "JavaScript",
    "Python",
    "TypeScript",
    "Java",
    "C++",
    "C#",
    "Go",
    "Rust",
    "Ruby",
    "PHP",
];

const models = [
    { value: "openai", label: "OpenAI GPT" },
    { value: "llama3.1:8b", label: "Llama 3.1 (8B)" },
];

function PromptPage(){
    const [selectedModel, setSelectedModel] = useState<string>("");
    const [quizType, setQuizType] = useState<QuizType | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");
    const [prompt, setPrompt] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleModelChange(model: string) {
        setSelectedModel(model);
        try {
            await fetch("http://127.0.0.1:8000/model", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ model })
            });
        } catch (error) {
            console.error("Error setting model:", error);
        }
    }

    async function handleSubmit() {
        setError("");

        if (!quizType) {
            setError("Please select a quiz type.");
            return;
        }

        if (!selectedModel) {
            setError("Please select an AI model.");
            return;
        }

        if (!prompt.trim()) {
            setError("Please enter a prompt describing what you want to learn.");
            return;
        }

        if (quizType === 'coding' && !selectedLanguage) {
            setError("Please select a programming language.");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/prompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    prompt: prompt,
                    quiz_type: quizType,
                    language: selectedLanguage
                })
            });

            const quiz = await response.json();
            console.log("Quiz from backend:", quiz);
            
            if (quizType === 'coding') {
                navigate('/code-sandbox', { state: { quizData: quiz, language: selectedLanguage } });
            } else {
                navigate('/quiz', { state: { quizData: quiz } });
            }
        } catch (error) {
            console.error("Error submitting prompt:", error);
            setError("Failed to generate quiz. Please try again.");
        }
    }

    return(
        <>
        <Navbar />
        <div className="prompt-page">
            {/* Header Section */}
            <div className="prompt-header">
                <h1 className="prompt-page-title">Create Your Quiz</h1>
                <p className="prompt-page-subtitle">
                    Choose your quiz type, select a model, and describe what you want to learn
                </p>
            </div>

            {/* Main Content */}
            <div className="prompt-content">
                {/* Step 1: Quiz Type */}
                <div className="prompt-section">
                    <div className="section-header">
                        <span className="step-number">1</span>
                        <h2 className="section-title">Choose Quiz Type</h2>
                    </div>
                    <div className="quiz-type-cards">
                        <div 
                            className={`quiz-card ${quizType === 'mcq' ? 'selected' : ''}`}
                            onClick={() => setQuizType('mcq')}
                        >
                            <div className="quiz-card-icon">
                                <img src={mcqIcon} alt="MCQ Quiz" />
                            </div>
                            <div className="quiz-card-content">
                                <h3>Multiple Choice</h3>
                                <p>Test your knowledge with AI-generated questions and instant feedback</p>
                            </div>
                            <div className="quiz-card-check">
                                {quizType === 'mcq' && <span className="checkmark"></span>}
                            </div>
                        </div>
                        <div 
                            className={`quiz-card ${quizType === 'coding' ? 'selected' : ''}`}
                            onClick={() => setQuizType('coding')}
                        >
                            <div className="quiz-card-icon">
                                <img src={codeIcon} alt="Coding Quiz" />
                            </div>
                            <div className="quiz-card-content">
                                <h3>Coding Sandbox</h3>
                                <p>Solve programming challenges with a built-in code editor and test cases</p>
                            </div>
                            <div className="quiz-card-check">
                                {quizType === 'coding' && <span className="checkmark"></span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 2: Configuration Row */}
                <div className="prompt-section">
                    <div className="section-header">
                        <span className="step-number">2</span>
                        <h2 className="section-title">Configure Settings</h2>
                    </div>
                    <div className="config-row">
                        <div className="config-item">
                            <label className="config-label">AI Model</label>
                            <select 
                                className="config-select"
                                value={selectedModel}
                                onChange={(e) => handleModelChange(e.target.value)}
                            >
                                <option value="" disabled hidden>Select model...</option>
                                {models.map((model) => (
                                    <option key={model.value} value={model.value}>
                                        {model.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {quizType === 'coding' && (
                            <div className="config-item">
                                <label className="config-label">Language</label>
                                <select 
                                    className="config-select"
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                >
                                    <option value="" disabled hidden>Select language...</option>
                                    {programmingLanguages.map((lang) => (
                                        <option key={lang} value={lang.toLowerCase()}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>

                {/* Step 3: Prompt */}
                <div className="prompt-section">
                    <div className="section-header">
                        <span className="step-number">3</span>
                        <h2 className="section-title">Describe Your Quiz</h2>
                    </div>
                    <div className="prompt-input-container">
                        <textarea 
                            className="prompt-textarea"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder={quizType === 'coding' 
                                ? "Describe the coding challenges you want... (e.g., 'Create 5 array manipulation problems focusing on sorting algorithms')"
                                : "What topic would you like to be quizzed on? (e.g., 'JavaScript async/await and promises')"
                            }
                        />
                        <div className="prompt-input-footer">
                            <span className="char-count">{prompt.length} characters</span>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="prompt-error">
                        <span className="error-icon">!</span>
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <button 
                    className="generate-button"
                    onClick={handleSubmit}
                    disabled={!quizType || !selectedModel || !prompt.trim() || (quizType === 'coding' && !selectedLanguage)}
                >
                    <span className="button-text">Generate Quiz</span>
                    <span className="button-arrow">→</span>
                </button>
            </div>
        </div>
        </>
    )
}

export default PromptPage;