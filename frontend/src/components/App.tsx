import ComboBox from './ComboBox'
import './PromptForm'
import PromptForm from './PromptForm'

const proLang = {
    placeholder: "Language",
    java: "java",
    python: "python",
    C: "C",
    Ruby: "C#",
}

const quizType = {
  placeholder : "QuizType",
  theory : "Theory",
  practical : "Practical",
}

function App() {
  return(
    <>
    <ComboBox data={proLang}/>
    <ComboBox data={quizType}/>
    <PromptForm />
    </>
  )
}

export default App
