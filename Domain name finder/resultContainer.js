import React from 'react'
import NameCard from "./nameCard.js"

export default function ResultContainer(props) {
    const suggestedNamesJsx = props.suggestedNames.map((suggestedName)=>{
    return <NameCard key={suggestedName} suggestedName={suggestedName}/>})

  return (
    <div className='results-container'>
      {suggestedNamesJsx}
    </div>
  )
}
