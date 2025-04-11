import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    let timerId;
    if (isRunning && !isPaused) {
      timerId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10); // Update every 10 milliseconds for smoother display
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId); //Cleanup interval on component unmount(delete app from dom)
  }, [isRunning, isPaused]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };
  const handlePause = () => {
    setIsPaused(true);
  };
  const handleResume = () => {
    setIsPaused(false);
  };

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;

  return (
    <div className="App">
      <h1>Stop Watch</h1>
      <div className="stop-watch">
        <div className="counter">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}:
          {String(milliseconds).padStart(3, "0").slice(0, -1)}
        </div>
        <div className="btns">
          {isRunning === false ? (
            <button className="start" type="button" onClick={handleStart}>
              START
            </button>
          ) : (
            <div className="btn-flex">
              <button className="reset" type="button" onClick={handleReset}>
                Reset
              </button>
              {isPaused === false ? (
                <button className="pause" type="button" onClick={handlePause}>
                  Pause
                </button>
              ) : (
                <button className="resume" type="button" onClick={handleResume}>
                  Resume
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2)
// seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2)
// milliseconds = ("0" + ((time / 10) % 100)).slice(-2)
