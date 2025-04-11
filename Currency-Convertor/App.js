import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [info, setInfo] = useState([]);
  const [options, setOptions] = useState([]);
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.fastforex.io/convert",
      params: {
        from: from,
        to: to,
        amount: amount,
        api_key: "2e78192712-53db24674d-ssz2rt",
      },
      headers: { accept: "application/json" },
    };

    axios
      .request(options)
      .then((res) => {
        // console.log(res.data);
        setResult(amount * res.data.result.rate);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [from, to, amount]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.fastforex.io/currencies",
      params: { api_key: "2e78192712-53db24674d-ssz2rt" },
      headers: { accept: "application/json" },
    };

    axios
      .request(options)
      .then((res) => setOptions(Object.keys(res.data.currencies)));
  }, [info]);

  const flip = () => {
    var temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div className="conversion-area">
        <div className="amount">
          <label>Amount</label>
          <input
            type="text"
            placeholder="Enter the Amount..."
            onChange={(e) => setAmount(e.target.value || 0)}
          ></input>
        </div>
        <div className="from">
          <label>From</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            {options.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
        <div
          className="flip arrows"
          onClick={() => {
            flip();
          }}
        >
          <i className="fa-solid fa-arrow-right"></i>
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div className="to">
          <label>To</label>
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            {options.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="conversion-result">
        {/* <button type="button">Convert</button> */}
        Converted Amount:
        <div>
          {amount +
            " " +
            from +
            "=" +
            (amount === 0 ? 0 : result.toFixed(2)) +
            " " +
            to}
        </div>
      </div>
    </div>
  );
}
