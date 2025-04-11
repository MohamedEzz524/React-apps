import { useState } from "react";
import "./App.css";

function App() {
  const choices = ["paper", "rock", "scissors"];
  var [pcChoice, setPcChoice] = useState("");
  var [yourChoice, setYourChoice] = useState("");
  var [yourScore, setYourScore] = useState(0);
  var [pcScore, setPcScore] = useState(0);

  const random = (arr) =>
    (pcChoice = arr[Math.floor(Math.random() * arr.length)]);

  const setRock = () => {
    setYourChoice("rock");
    setPcChoice(random(choices));
    if (pcChoice === "scissors") {
      setYourScore((prev) => prev + 1);
    } else if (pcChoice === "paper") {
      setPcScore((prev) => prev + 1);
    } else {
      return;
    }
  };
  const setPaper = () => {
    setYourChoice("paper");
    setPcChoice(random(choices));
    if (pcChoice === "rock") {
      setYourScore((prev) => prev + 1);
    } else if (pcChoice === "scissors") {
      setPcScore((prev) => prev + 1);
    } else {
      return;
    }
  };
  const setScissors = () => {
    setYourChoice("scissors");
    setPcChoice(random(choices));
    if (pcChoice === "paper") {
      setYourScore((prev) => prev + 1);
    } else if (pcChoice === "rock") {
      setPcScore((prev) => prev + 1);
    } else {
      return;
    }
  };

  return (
    <div className="App">
      <h1>WELCOME TO ROCK, PAPER, SCISSORS GAME</h1>
      <button className="rock" onClick={() => setRock()}>
        <i className={`fas fa-hand-rock`} /> ROCK
      </button>
      <button className="paper" onClick={() => setPaper()}>
        <i className={`fas fa-hand-paper`} /> PAPER
      </button>
      <button className="scissors" onClick={() => setScissors()}>
        <i className={`fas fa-hand-scissors`} /> SCISSORS
      </button>
      <div className="yourChoice">
        Your Choice: <span>{yourChoice.toUpperCase()}</span>
      </div>
      <div className="pcChoice">
        Computer's Choice: <span>{pcChoice.toUpperCase()}</span>
      </div>
      <div className="score">
        Your Score: <span>{yourScore}</span>
      </div>
      <div className="score">
        Computer's Score: <span>{pcScore}</span>
      </div>
    </div>
  );
}

export default App;
