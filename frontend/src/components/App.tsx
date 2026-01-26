import PromptPage from './PromptPage'
import '../css-files/App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../utils/AuthContext";
import LandingPage from './LandingPage';
import RegisterPage from './RegisterPage';
import QuizPage from './QuizPage';
import LoginPage from './LoginPage';
import UserPage from './UserPage';

function App() {
  return(
    <>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/prompt" element = {<PromptPage />} />
          <Route path="/register" element = {<RegisterPage/>} />
          <Route path="/login" element = {<LoginPage/>} />
          <Route path="/profile" element = {<UserPage/>} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </AuthProvider>
    </Router>
    </>
  )
}

export default App
