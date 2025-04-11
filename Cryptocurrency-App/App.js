import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios"; //{1}

export default function App() {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    Axios.get("https://openapiv1.coinstats.app/coins")
      .then((res) => setCrypto(res.data.result)) //console.log(res.data) to see how data look like
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>All Cryptocurrencies</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <table>
          <thead>
            <tr>
              <td>Rank</td>
              <td>Name</td>
              <td>Symbol</td>
              <td>Market Cap</td>
              <td>Price</td>
              <td>Available Supply</td>
              <td>Volume(24hrs)</td>
            </tr>
          </thead>
          {/* Mapping all the cryptos */}
          <tbody>
            {/* Filtering to check for the searched crypto */}
            {crypto
              .filter((val) => {
                return val.name.toLowerCase().includes(search.toLowerCase());
              })
              .map((val, id) => {
                return (
                  <tr key={id}>
                    <td className="rank">{val.rank}</td>
                    <td className="logo">
                      <a href={val.websiteUrl}>
                        <img src={val.icon} alt="logo" width="30px" />
                      </a>
                      <p>{val.name}</p>
                    </td>
                    <td className="symbol">{val.symbol}</td>
                    <td>₹{val.marketCap}</td>
                    <td>₹{val.price.toFixed(2)}</td>
                    <td>{val.availableSupply}</td>
                    <td>{val.volume.toFixed(0)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//
// import axios from 'axios';
// const options = {
//   method: "GET",
//   url: "https://openapiv1.coinstats.app/coins",
//   headers: {
//     accept: "application/json",
//     "X-API-KEY": "hpcXTpbQ3uRE5PHHypouVDP9Tbfyder93dNheirA9b0=",
//   },
// };

// axios
//   .request(options)
//   .then((res) => console.log(res.data))
//   .catch((err) => console.error(err));
