import React, { useState } from 'react'
import Box from './Box'
import "./App.css"

export default function App() {

    const generateColors = ()=>{
        var colors = []
    for (let i = 0; i < 20; i++) {
        var red = rand(), green = rand(), blue = rand()
        colors.push(`rgb(${red},${blue},${green})`) 
    }
    return colors
}

    const rand = ()=> Math.floor(Math.random() * 256)

    const [arrColors,SetArrColors] = useState(generateColors())    

    const handleChangeColor = (e,c)=>{
        do{
          var newColor = `rgb(${rand()},${rand()},${rand()})`
        }while(newColor === c)
        
        e.target.style.backgroundColor = newColor
    }
    
  return (
    <div className='Color-Box'>
        {arrColors.map(c => {
            return    <Box color={c} changeColor={(c)=>handleChangeColor(c)}/>
        })
        }
        
    </div>
  )
}