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

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        validationCheck();

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

    function validationCheck(){
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

    return (
        <>
        <Navbar/>
        <h1 style={{textAlign: 'center', color: '#ff9500', marginTop: '32px', marginBottom: '0', background: 'transparent'}}>Register</h1>
            <div className="register-container">
                <div className="register-form-box">
                    <form onSubmit={handleSubmit}>
                        <label className="label">First Name</label>
                        <input type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />

                        <label className="label">Second Name</label>
                        <input type="text"
                            value={secondName}
                            onChange={(e) => setSecondName(e.target.value)} />

                        <label className="label">Email</label>
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />

                        <label className="label">Password</label>
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <PasswordStrengthBar style={{ width: 160 }} password={password} />

                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterPage;