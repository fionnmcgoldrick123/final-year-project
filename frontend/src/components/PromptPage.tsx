import ComboBox from "./ComboBox";
import PromptForm from "./PromptForm";
import '../css-files/PromptForm.css'  
import Navbar from "./Navbar";
import { useState } from "react";

function PromptPage(){
    const [selectedModel, setSelectedModel] = useState<string>("");

    return(
        <>
        <Navbar></Navbar><br></br>
        <ComboBox selectedModel={selectedModel} onModelChange={setSelectedModel} />
        <PromptForm selectedModel={selectedModel} />
        </>
    )
}

export default PromptPage;