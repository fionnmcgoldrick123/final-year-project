import '../css-files/PromptForm.css'
import { useState } from 'react'

function PromptForm(){

    const [prompt, setPrompt] = useState("")

    async function handleSubmit(){

        setPrompt("")

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