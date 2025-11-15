import PromptPage from './PromptPage'
import '../css-files/App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './LandingPage';
import RegisterPage from './RegisterPage';

function App() {
  return(
    <>
    <Router>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/prompt" element = {<PromptPage />} />
        <Route path="/register" element = {<RegisterPage/>} />
      </Routes>

    </Router>



    </>
  )
}

export default App
