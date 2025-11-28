import '../css-files/PromptForm.css'
import { useState } from 'react'
// import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

function PromptForm(){

    const [prompt, setPrompt] = useState("")
    const navigate = useNavigate()
    // const [loading, setLoading] = useState(false);

    async function handleSubmit(){

        setPrompt("")
        // setLoading(true);

        let response;

        try{
            response = await fetch('http://127.0.0.1:8000/prompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt })
            })
        }
        catch(error){
            console.error("Error submitting prompt:", error)
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
                <textarea className='prompt-text-area'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)} 
                placeholder='Enter your prompt here...'
                >

                </textarea>

                <br></br>

                <button onClick={handleSubmit} className='submit-button'>Submit</button>
            </div>
        </>
    )
}

export default PromptForm