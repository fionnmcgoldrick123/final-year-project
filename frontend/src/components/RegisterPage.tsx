import { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import Navbar from "./Navbar";
import '../css-files/RegisterPage.css'

function RegisterPage() {

    const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{7,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isFlipped, setIsFlipped] = useState(false);

    function handleRegisterSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        validationCheckRegister();

        fetch("http://127.0.0.1:8000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                first_name: firstName,
                second_name: secondName,
                email: email,
                password: password
            })
        })

        setFirstName("")
        setSecondName("")
        setPassword("")
        setEmail("")
    }

    function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        validationCheckLogin();

        fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword
            })
        })

        setLoginEmail("")
        setLoginPassword("")
    }

    function validationCheckRegister(){
        if (!firstName || !secondName || !password || !email) {
            alert("all fields are required!");
            return;
        }

        if (!passwordRule.test(password)) {
            alert("Password must contain uppercase, lowercase, number, special character, and be at least 7 characters long.");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("invalid email");
            return
        }
    }

    function validationCheckLogin(){
        if (!loginEmail || !loginPassword) {
            alert("Email and password are required!");
            return;
        }

        if (!emailRegex.test(loginEmail)) {
            alert("invalid email");
            return
        }
    }

    return (
        <>

        <Navbar/>

            <div className="register-container">
                <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
                    {/* Register Form */}
                    <div className="flip-card-front">
                        <form onSubmit={handleRegisterSubmit}>
                            <h1>Register</h1>
                            <label className="label">First Name</label><br></br>
                            <input type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} /><br></br>

                            <label className="label">Second Name</label><br></br>
                            <input type="text"
                                value={secondName}
                                onChange={(e) => setSecondName(e.target.value)} /><br></br>

                            <label className="label">Email</label><br></br>
                            <input type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} /><br></br>

                            <label className="label">Password</label><br></br>
                            <input type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} /><br></br>
                            <PasswordStrengthBar style={{ width: 160 }} password={password} /><br></br>

                            <button type="submit">Register</button>
                        </form>
                    </div>

                    {/* Login Form */}
                    <div className="flip-card-back">
                        <form onSubmit={handleLoginSubmit}>
                            <h1>Login</h1>
                            <label className="label">Email</label><br></br>
                            <input type="email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)} /><br></br>

                            <label className="label">Password</label><br></br>
                            <input type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)} /><br></br>

                            <button type="submit">Login</button>
                        </form>
                    </div>

                    {/* Flip Button */}
                    <button className="flip-button" onClick={() => setIsFlipped(!isFlipped)}>
                        →
                    </button>
                </div>
            </div>
        </>
    )
}

export default RegisterPage;