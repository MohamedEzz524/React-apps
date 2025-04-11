import React, { useState,useEffect } from 'react'
import "./App.css"
import Axios from "axios" //{1}

export default function App() {

  const [sprite, setSprite] = useState("bottts");
  const [seed, setSeed] = useState(1000);  

  const handleSprite = (type) => {
    setSprite(type)
  }

  // Function to generate random seeds for the API
    const handleGenerate = ()=> {
        let x = Math.floor(Math.random() * 1000);
        setSeed(x);
    }
    
    // Function to download image and save it in our computer
    const downloadImage = ()=> {
        Axios({
            method: "get",
            url: `https://api.dicebear.com/9.x/${sprite}/svg/seed${seed}`,
            responseType: "arraybuffer"
        })
        .then((response) => {
            var link = document.createElement("a");         
            link.href = window.URL.createObjectURL(
                new Blob([response.data], 
                { type: "application/octet-stream" })
            );
            link.download = `${seed}.svg`;
            document.body.appendChild(link);
            link.click();
            setTimeout( () => {
                window.URL.revokeObjectURL(link);
            }, 200);
        })
        .catch((error) => { });
    }

  return (
    <div className='App'>
       <div className="nav">
                <p>Random Avatar Generator</p>
            </div>
            <div className="home">
                <div className="btns">
                    <button onClick={() => { 
                        handleSprite("avataaars") }}>Human</button>
                    <button onClick={() => { 
                        handleSprite("pixel-art") }}>Pixel</button>
                    <button onClick={() => { 
                        handleSprite("bottts") }}>Bots</button>
                    <button onClick={() => { 
                        handleSprite("icons") }}>Icons</button>
                    <button onClick={() => { 
                        handleSprite("identicon") }}>Identi</button>
                    <button onClick={() => { 
                        handleSprite("lorelei") }}>Alien</button>
                    <button onClick={() => { 
                        handleSprite("micah") }}>Avatars</button>
                </div>
                <div className="avatar">
                    <img src={`https://api.dicebear.com/9.x/${sprite}/svg/seed=${seed}`} alt="Sprite" />
                </div>
                <div className="generate">
                    <button id="gen" onClick={() => { handleGenerate() }}>Next</button>
                    <button id="down" onClick={() => { downloadImage() }}>Download</button>
                </div>
            </div>
    </div>
  )
}