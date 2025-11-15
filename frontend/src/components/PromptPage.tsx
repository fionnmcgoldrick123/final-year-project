import ComboBox from "./ComboBox";
import PromptForm from "./PromptForm";
import '../css-files/PromptForm.css'  
import Navbar from "./Navbar";

function PromptPage(){
    return(
        <>
        <Navbar></Navbar><br></br>
        <ComboBox />
        <PromptForm />
        </>
    )
}

export default PromptPage;