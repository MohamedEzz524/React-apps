import React, { useState } from 'react'
import "./App.css"
import qBank from "./qBank"
import Question from './question.js'
import Score from './score.js'

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState("")
  const [quizEnd,setQuizEnd] = useState(false)
  const [score,setScore] = useState(0)

  //get selectedValue
  const handleOptionChange = (e)=>{
    setSelectedOption(e.target.value)
  }

  //handle onSubmit ==> 1: check selectedValue with answer
  // 2: Move to next page(r/w) and clear selectedValue
  const handleFormSubmit = (e)=>{
    e.preventDefault()
    checkAnswer();
    handleNextQuestion();
    }
  const  checkAnswer = () => {
      if (selectedOption === qBank[currentQuestion].answer) {
          setScore(score => score +1)
      }
  };  

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < qBank.length) {
      setCurrentQuestion(c => c + 1)
      setSelectedOption("")
    }else{
      setQuizEnd(!quizEnd)
    }
};

  return (
    <div className='Quiz-App'>
        <h1>QUIZ APP</h1>
        {!quizEnd ? (
                    <Question
                        question={qBank[currentQuestion]}
                        onSubmit={handleFormSubmit}
                        selectedOption= {selectedOption}
                        onOptionChange= {handleOptionChange}
                    />                    
                ) : (
                    <Score
                        score={score}
                        onNextQuestion={handleNextQuestion}
                        setCurrentQuestion = {setCurrentQuestion}
                        setQuizEnd = {setQuizEnd}
                        setScore = {setScore}
                    />
                )}
    </div>
  )
}