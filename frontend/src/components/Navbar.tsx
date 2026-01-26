import '../css-files/Navbar.css'
import '../components/RegisterPage'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

function Navbar(){

    const navigate = useNavigate()
    const { user, isAuthenticated, logout } = useAuth()

    function handleClick(path : string){
        navigate(path);
    }

    function handleLogout(){
        logout();
        navigate("/");
    }

    return(
        <>
            <div className = "nav-container">
                <div className="nav-left">
                    <button className="nav-button" onClick={()=> handleClick("/")}>Home</button>
                    <button className="nav-button" onClick={()=> handleClick("/prompt")}>Quiz</button>
                </div>
                <div className="nav-right">
                    {isAuthenticated && user ? (
                        <>
                            <div className="nav-user-info" onClick={() => handleClick("/profile")}>
                                <span className="nav-user-avatar">
                                    {user.first_name.charAt(0).toUpperCase()}
                                </span>
                                <span className="nav-user-name">{user.first_name}</span>
                            </div>
                            <button className="nav-button nav-logout" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <button className="nav-button" onClick={()=> handleClick("/login")}>Login</button>
                            <button className="nav-button nav-register" onClick={()=> handleClick("/register")}>Register</button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar