import '../css-files/Navbar.css'
import '../components/RegisterPage'
import { useNavigate } from "react-router-dom";

function Navbar(){

    const navigate = useNavigate()

    function handleClick(path : string){
        navigate(path);
    }

    return(
        <>
            <div className = "nav-container">
                <button className="nav-button" onClick={()=> handleClick("/prompt")}>PromptPage</button>
                <button className="nav-button" onClick={()=> handleClick("/register")}>Register</button>
                <button className='nav-button' onClick={()=>handleClick("/")}>Landing Page</button>
            </div>
        </>
    )
}

export default Navbar