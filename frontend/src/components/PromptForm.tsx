import '../css-files/PromptForm.css'
import { useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import LandingPage from './LandingPage';

function PromptForm(){

    const [prompt, setPrompt] = useState("")
    const [loading, setLoading] = useState(false);

    async function handleSubmit(){

        setPrompt("")
        setLoading(true);

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
        console.log(quiz);

         setLoading(false);
        < LandingPage />
        
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

                {loading && (
                    <div style={{ marginTop: "20px" }}>
                        <ClipLoader color="#36d7b7" size={50} />
                    </div>
                )}


            </div>
        </>
    )
}

export default PromptForm