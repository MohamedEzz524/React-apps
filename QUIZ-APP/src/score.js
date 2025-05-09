import React from "react";

export default function Score(props) {
  const restartQuestions = () => {
    props.setCurrentQuestion(0);
    props.setScore(0);
    props.setQuizEnd(false);
  };

  return (
    <div className="score">
      <h2 style={{ color: "#FFB22C" }}>Results</h2>
      <h4>Your score: {props.score}</h4>
      <button onClick={restartQuestions}>Retry Attempt</button>
    </div>
  );
}
