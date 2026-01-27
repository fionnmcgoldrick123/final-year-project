import '../css-files/PromptForm.css'
import { useState } from 'react'
// import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

interface PromptFormProps {
    selectedModel: string;
}

function PromptForm({ selectedModel }: PromptFormProps){

    const [prompt, setPrompt] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    // const [loading, setLoading] = useState(false);

    async function handleSubmit(){
        setError("");

        if (!selectedModel) {
            setError("Please select a model before submitting.");
            return;
        }

        if (!prompt.trim()) {
            setError("Please enter a prompt.");
            return;
        }

        const currentPrompt = prompt;
        setPrompt("")
        // setLoading(true);

        let response;

        try{
            response = await fetch('http://127.0.0.1:8000/prompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: currentPrompt })
            })
        }
        catch(error){
            console.error("Error submitting prompt:", error)
            setError("Failed to submit prompt. Please try again.");
            return;
        }

        
        const quiz = await response.json();
        console.log("Quiz from backend:", quiz);
            
        navigate('/quiz', { state: { quizData: quiz } });

         // setLoading(false);
        
    }

    return(
        <>
            <div className='prompt-form'>
                {error && <div className='error-message'>{error}</div>}
                <textarea className='prompt-text-area'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)} 
                placeholder='Enter your prompt here...'
                >

                </textarea>

                <br></br>

                <button 
                    onClick={handleSubmit} 
                    className='submit-button'
                    disabled={!selectedModel}
                    title={!selectedModel ? "Please select a model first" : ""}
                >
                    Submit
                </button>
            </div>
        </>
    )
}

export default PromptForm