import '../css-files/PromptForm.css'

function PromptForm(){

    function handleSubmit(){
        console.log("submitting prompt to backend...");
    }

    return(
        <>
            <div className='prompt-form'>
                <textarea className='prompt-text-area'>

                </textarea>

                <button onClick={handleSubmit} className='submit-button'>Submit</button>
            </div>
        </>
    )
}

export default PromptForm