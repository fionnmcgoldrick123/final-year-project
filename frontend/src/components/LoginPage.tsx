import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import Navbar from "./Navbar";
import '../css-files/RegisterPage.css';

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        
        const result = await login(email, password);
        
        if (result.success) {
            navigate("/");
        } else {
            setError(result.error || "Login failed");
        }
        
        setIsLoading(false);
    }

    return (
        <>
            <Navbar />
            <h1 style={{ textAlign: 'center', color: '#ff9500', marginTop: '32px', marginBottom: '0', background: 'transparent' }}>
                Login
            </h1>
            <div className="register-container">
                <div className="register-form-box">
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}
                        
                        <label className="label">Email</label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            disabled={isLoading}
                        />

                        <label className="label">Password</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            disabled={isLoading}
                        />

                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                        
                        <p className="auth-switch-text">
                            Don't have an account?{" "}
                            <span 
                                className="auth-switch-link" 
                                onClick={() => navigate("/register")}
                            >
                                Register here
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
