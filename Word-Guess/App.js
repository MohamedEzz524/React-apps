import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const [word, setWord] = useState("EGYPT");
  const [written, setWritten] = useState("");
  const [index, setIndex] = useState(0);
  const [hints, setHints] = useState(3);
  const [chosen, setChosen] = useState([]);
  const guessBtn = useRef();
  const removeBtn = useRef();

  const write = (e, letter) => {
    if (written.length < word.length) {
      setWritten((prevWritten) => {
        const forCurrentValueWritten = prevWritten + letter;
        if (forCurrentValueWritten.length >= word.length) {
          guessBtn.current.classList.add("guess");
        }
        return forCurrentValueWritten;
      });
      removeBtn.current.classList.add("remove");
      setIndex((i) => i + 1);
      e.target.style.backgroundColor = "#9999";
      e.target.style.cursor = "not-allowed";
      setChosen((chosen) => [...chosen, e.target]);
    }
  };

  const getHint = () => {
    if (index < word.length && written.length < word.length && hints > 0) {
      setWritten((prevWritten) => {
        const forCurrentValueWritten =
          prevWritten.slice(0, index) +
          word[index] +
          prevWritten.slice(index + 1);
        if (forCurrentValueWritten.length >= word.length) {
          guessBtn.current.classList.add("guess");
        }
        return forCurrentValueWritten;
      });
      removeBtn.current.classList.add("remove");
      setIndex((i) => i + 1);
      setHints((hints) => hints - 1);
    }
  };

  const restart = () => {
    setWritten("");
    setHints(3);
    chosen.length !== 0
      ? chosen.map((e) => {
          e.style.cursor = "pointer";
          e.style.backgroundColor = "rgb(2, 111, 214)";
          return e;
        })
      : setChosen([]);
    guessBtn.current.classList.remove("guess");
    removeBtn.current.classList.remove("remove");
  };

  const removeLetter = () => {
    if (chosen.length > 0) {
      let span = chosen[chosen.length - 1];
      span.style.cursor = "pointer";
      span.style.backgroundColor = "rgb(2, 111, 214)";
      setChosen(chosen.slice(0, -1));
    }
    setWritten((written) => {
      const updatedWritten = written.slice(0, -1);
      if (updatedWritten.length === 0) {
        removeBtn.current.classList.remove("remove");
      }
      if (updatedWritten.length < word.length) {
        guessBtn.current.classList.remove("guess");
      }
      return updatedWritten;
    });
    setIndex((i) => i - 1);
  };

  const guess = () => {
    if (written === word) {
      window.alert("A WINNER");
    } else {
      window.alert("Try Again");
    }
  };

  return (
    <div className="App">
      <h1>Wordle</h1>
      <div className="container">
        <div className="try">
          Try Guessing <span>{word.length}</span> Letters Word!!
        </div>
        <div className="flex word">
          {written.length > 0 &&
            written.split("").map((l) => {
              return <span key={l}>{l}</span>;
            })}
        </div>
        <div className="flex btns">
          <button type="button" onClick={restart}>
            Restart
          </button>
          <button ref={removeBtn} type="button" onClick={removeLetter}>
            Remove Letter
          </button>
        </div>
        <div className="flex  letters">
          {letters.split("").map((letter) => {
            return (
              <span key={letter} onClick={(e) => write(e, letter)}>
                {letter}
              </span>
            );
          })}
        </div>
        <div className="flex hint">
          <p>Hints Remaining:{hints}</p>
          <button type="button" onClick={getHint}>
            Get Hint!
          </button>
        </div>
        <button ref={guessBtn} id="g" type="button" onClick={guess}>
          Guess
        </button>
      </div>
    </div>
  );
}
