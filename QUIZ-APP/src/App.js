import { useEffect, useRef, useState } from "react";
import "./App.css";
import Axios from "axios";
import { Bullet } from "./Bullet";
// import qBank from "./qBank";
// import Options from "./options";
// import Question from "./question.js";
// import Score from "./score.js";

export default function App() {
  const [quizBank, setQuizBank] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [notFinished, setNotFinished] = useState(false);
  const [quizEnd, setQuizEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState({});
  const score = useRef(0);

  //theme
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const fetchQuiz = () => {
    setIsLoading(true);
    Axios.get("https://restcountries.com/v3.1/all")
      .then((res) => {
        const filtered = res.data.filter(
          (country) => country.capital && country.capital.length > 0
        );

        // getting random questions data
        const random = ~~(Math.random() * (filtered.length - 10));
        const countries = filtered.slice(random, random + 10);

        const generatedQuiz = countries.map((country, index) => {
          const correct = country.capital[0];
          // Filtering rest options
          const allCapitals = filtered
            .filter((c) => c.capital[0] !== correct)
            .map((c) => c.capital[0]);

          const wrongOptions = allCapitals
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

          const options = [...wrongOptions, correct].sort(
            () => Math.random() - 0.5
          );

          return {
            id: index + 1,
            question: `What is the capital of ${country.name.common}?`,
            options,
            answer: correct,
          };
        });

        // Set the quiz data
        setQuizBank(generatedQuiz);

        // Prepare blank answers
        const initialAnswers = {};
        generatedQuiz.forEach((_, index) => {
          initialAnswers[index] = { answer: "", mark: false };
        });
        setUserAnswers(initialAnswers);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false)); // ✅ hide spinner
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  //handle userAnswer
  const handleAnswer = (userAnswer, userMark) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion]: { answer: userAnswer, mark: userMark },
    }));
  };

  // Handle Option change
  const handleOptionChange = (e) => {
    const userAnswer = e.target.value;
    const useMark = userAnswer === quizBank[currentQuestion].answer;
    handleAnswer(userAnswer, useMark);
  };

  // Submit All
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (Object.values(userAnswers).some((entry) => entry.answer === "")) {
      setNotFinished(true);
      setTimeout(() => {
        setNotFinished(false);
      }, 5000);
      const unansweredKey = Object.entries(userAnswers).find(
        ([key, value]) => value.answer === ""
      )?.[0];
      setCurrentQuestion(Number(unansweredKey));
    } else {
      score.current = Object.values(userAnswers).reduce(
        (acc, e) => acc + (e.mark ? 1 : 0),
        0
      );
      setQuizEnd(!quizEnd);
    }
  };

  // Restart Quiz
  const restartQuestions = () => {
    setCurrentQuestion(0);
    score.current = 0;
    setQuizEnd(false);
    fetchQuiz(); // ✅ Refetch fresh quiz
  };

  return (
    <div className="quiz-app">
      {/* Quiz title */}
      <h1>
        <span>Country</span> Quiz
      </h1>
      <div className="container">
        {/* Question */}
        {isLoading ? (
          <div className="loader">⏳ Preparing your quiz...</div>
        ) : (
          <div className="content">
            <div className="up">
              <div className="bullets">
                {Array.from({ length: quizBank.length })
                  .fill(0)
                  .map((_, i) => (
                    <Bullet
                      key={i}
                      index={i}
                      status={
                        quizEnd
                          ? userAnswers[i]?.answer === quizBank[i]?.answer
                            ? "correct"
                            : "wrong"
                          : userAnswers[i]?.answer
                          ? "active"
                          : currentQuestion === i
                          ? "here"
                          : "notActive"
                      }
                      onClick={setCurrentQuestion}
                    />
                  ))}
                <div>{}</div>
              </div>
            </div>
            <div className="question">
              <h3 className="question-title">
                Question {quizBank[currentQuestion].id}
              </h3>
              <h5 className="question-p">
                {quizBank[currentQuestion].question}
              </h5>
              <form onSubmit={(e) => handleFormSubmit(e)}>
                {/* Options */}
                <div className="option-group">
                  {quizBank[currentQuestion].options.map((option, i) => (
                    <div key={i} className="option">
                      <input
                        id={i}
                        type="radio"
                        name="option"
                        disabled={quizEnd}
                        value={option}
                        checked={
                          userAnswers[currentQuestion]?.answer === option
                        }
                        onChange={handleOptionChange}
                      />
                      <label
                        htmlFor={i}
                        className={`${
                          quizEnd &&
                          (option === quizBank[currentQuestion].answer
                            ? "correct"
                            : "wrong")
                        }`}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="btns">
                  <div className="navigation-btns">
                    <button
                      type="button"
                      disabled={currentQuestion === 0}
                      onClick={() => setCurrentQuestion((c) => c - 1)}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      disabled={currentQuestion === quizBank.length - 1}
                      onClick={() => setCurrentQuestion((c) => c + 1)}
                    >
                      →
                    </button>
                  </div>
                  <button type="submit" disabled={quizEnd}>
                    Submit All
                  </button>
                </div>
              </form>
              {notFinished && (
                <p className="not-finished-message">
                  Please, answer all questions
                </p>
              )}
            </div>
          </div>
        )}

        {/* Score section */}
        {quizEnd && (
          <div className="score">
            <h2 className="result-title">
              {score.current >= 8 && <p>🔥 Excellent job!</p>}
              {score.current >= 5 && score.current < 8 && (
                <p>👍 Good effort!</p>
              )}
              {score.current < 5 && <p>💡 Keep practicing!</p>}
            </h2>
            <h4 className="score-text">
              You scored <span>{score.current}</span> out of {quizBank.length}
            </h4>
            <button onClick={restartQuestions}>Retry Attempt</button>
          </div>
        )}
      </div>
      {/* Theme */}
      <button
        className="theme"
        onClick={toggleTheme}
        type="button"
        aria-label={`data-theme-toggle:${theme}`}
      >
        {theme === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
}
