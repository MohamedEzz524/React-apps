import React, { useState,useEffect } from 'react'
import "./App.css"

export default function App() {

  const [temp,setTemp] = useState("")
  const [input,setInput] = useState("")
  const [size,setSize] = useState(400)
  const [bgColor,setBgColor] = useState("ffffff")
  const [qrCode, setQrCode] = useState("")

  useEffect(() => {
    //{1} qrCode generation link
    setQrCode(`http://api.qrserver.com/v1/create-qr-code/?data=${input}!&size=${size}x${size}&bgcolor=${bgColor}`);
  }, [input, size, bgColor]);


  const handleClick = (e)=>{
    e.preventDefault()
    setInput(temp)
  }

  return (
    <div className='App'>
      {/* Section 1 */}
      <h1>QR Code Generator</h1>
      <form>
        <label>Enter Text </label>
        <input type='text' onChange={(e)=>setTemp(e.target.value)}/> {/* 1 */}
        <button type='submit' onClick={e=> handleClick(e)}>Generate</button>  {/* 2 */}
        <label>Background Color:</label>
        <input type="color" onChange={e => setBgColor(e.target.value.substring(1)) }/> {/* delete "#" */}
        <label>Dimensions:</label>
        <input type='range' min="200" max="600" value={size} onChange={(e) => setSize(e.target.value)}/>
      </form>
      {/* Qr section 2 */}
      <div className="output-box">
        <img src={qrCode} alt="" />
        <a href={qrCode} download="QRCode">
          <button type="button">Download</button>
        </a>
      </div>
    </div>
  )
}
