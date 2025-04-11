import React, { useState } from 'react'
import "./App.css"
import Axios from 'axios';

export default function App() {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyrics, setLyrics] = useState("");
  

    function searchLyrics() {
        if (artist === "" || song === "") {
            return;
        }
        Axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`).then(res => { //Read Data From API LINK then action
            console.log(res.data.lyrics);
            setLyrics(res.data.lyrics);
        })
    }
    return (
      <div className='App'>
            <h1>Lyrics Finder ????</h1>
            <input className="inp" type="text" 
                placeholder='Artist name'
                onChange={(e) => { setArtist(e.target.value) }} />
            <input className="inp" type="text" 
                placeholder='Song name'
                onChange={(e) => { setSong(e.target.value) }} />
            <button className="btn" 
                onClick={() => searchLyrics()}>
                    ???? Search</button>
            <hr />
            <pre>{lyrics}</pre>
        </div>
    );
}































































// import "./App.css"
// import { useState } from "react"
// import validator from 'validator'

// export default function App() {
//   const [errorMessage, setErrorMessage] = useState('') 

//   const validate = (value) => { 

//       if (validator.isStrongPassword(value, { 
//           minLength: 8, minLowercase: 1, 
//           minUppercase: 1, minNumbers: 1, minSymbols: 1 
//       })) { 
//           setErrorMessage('Is Strong Password') 
//       } else { 
//           setErrorMessage('Is Not Strong Password') 
//       } 
//   } 

//   return ( 
//       <div className="App"> 
//           <pre> 
//               <h2>Checking Password Strength in ReactJS</h2> 
//               <span>Enter Password: </span><input type="text"
//                   onChange={(e) => validate(e.target.value)}></input> <br /> 
//               {errorMessage === '' ? null : 
//                   <span style={{ 
//                       fontWeight: 'bold', 
//                       color: 'red', 
//                   }}>{errorMessage}</span>} 
//           </pre> 
//     </div>
//   )
// }
