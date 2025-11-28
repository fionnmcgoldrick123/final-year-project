import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function QuizPage() {
    const location = useLocation();
    const quiz = location.state?.quizData ?? [];

    const navigate = useNavigate();

    if (!quiz.length) {
        return (
            <div>
                <p>No quiz data found. Go back and generate a quiz first.</p>
                <button onClick={() => navigate('/')}>Back</button>
            </div>
        );
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const [finished, setFinished] = useState(false);

    const currentQ = quiz[currentIndex];

    function handleAnswer(option: string) {
        const isCorrect = option === currentQ.correct_answer;

        if (!isCorrect) {
            alert("Incorrect! Try again.");
            return;
        }

        if (currentIndex + 1 < quiz.length) {
            setCurrentIndex(currentIndex + 1);
            console.log("Correct!");
        } else {
            setFinished(true);
        }
    }

    if (finished) {
        <h1>Quiz Complete! 🎉</h1>;
        <button onClick={() => navigate('/')}>Go Home</button>;
    }

    if (!currentQ) {
        return <p>No quiz data found</p>;
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h2>{currentQ.title}</h2>

            <h3>{currentQ.question}</h3>

            {currentQ.options.map((opt: string, i: number) => (
                <button 
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    style={{
                        display: "block",
                        margin: "0.5rem 0",
                        padding: "0.75rem 1rem",
                        fontSize: "1rem"
                    }}
                >
                    {opt}
                </button>
            ))}
        </div>
    );
}

export default QuizPage;
