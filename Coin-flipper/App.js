import React, { useState } from 'react'
import "./App.css"

export default function App() {
  const [state,setState] = useState({
    currFace:null,
    totalFlips:0,
    heads:0
  })
  const [coin,setCoin] = useState([{
    side:"head",
    imgSrc:'https://media.geeksforgeeks.org/wp-content/uploads/20200916123059/SHalfDollarObverse2016head-300x300.jpg'
  },
  {
    side:"tail",
    imgSrc:'https://media.geeksforgeeks.org/wp-content/uploads/20200916123125/tails-200x200.jpg'
  }
])

const [random, setRandom] = useState(0)

  const flipping =()=>{
    setRandom(Math.floor(Math.random() * coin.length))
    const newFace = coin[random]
    setState(prev => {
      const heads = prev.heads +
                  (newFace.side === 'head' ? 1 : 0)
     return {currFace:newFace,totalFlips:prev.totalFlips + 1, heads:heads}
    } )
  }

  return (
    <div className='App'>
        <h1>Lets's Flip a Coin</h1>
        {state.currFace && <img src={state.currFace.imgSrc} alt='Nothing'/>}
        <button onClick={flipping}>Flip Me!</button>
        <h5>Out of <span>{state.totalFlips}</span> Flips, there have been <span>{state.heads}</span> Heads and <span>{state.totalFlips-state.heads}</span> Tails.</h5>
    </div>
  )
}