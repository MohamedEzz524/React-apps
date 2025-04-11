import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    getAdvice();
  }, []);

  const getAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((res) => {
        setAdvice(res.data.slip.advice);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="App">
      <h1>Quote Generator</h1>
      <div className="container">
        <div className="content">
          <span className="top"></span>
          <span className="right"></span>
          <span className="bottom"></span>
          <span className="left"></span>
          <q>{advice}</q>
        </div>
        <button onClick={getAdvice} type="button">
          Get Advice
        </button>
      </div>
    </div>
  );
}
