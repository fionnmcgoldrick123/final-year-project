import { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";

function RegisterPage() {

    const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{7,}$/;

    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(!firstName || !secondName || !password){
            alert("all fields are required!");
            return;
        }

        if(!passwordRule.test(password)){
            alert("Password must contain uppercase, lowercase, number, special character, and be at least 7 characters long.");
            return;
        }

        fetch("http://127.0.0.1:8000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                first_name: firstName,
                second_name: secondName,
                password: password
            })
        })

        setFirstName("")
        setSecondName("")
        setPassword("")
    }

    return (
        <>
            <div className="register-container">
                <form onSubmit={handleSubmit}>
                    <label className="label">First Name</label><br></br>
                    <input type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} /><br></br>

                    <label className="label">Second Name</label><br></br>
                    <input type="text"
                        value={secondName}
                        onChange={(e) => setSecondName(e.target.value)} /><br></br>

                    <label className="label">Password</label><br></br>
                    <input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} /><br></br>
                        <PasswordStrengthBar style={{width: 160}} password={password}/>

                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    )
}

export default RegisterPage;