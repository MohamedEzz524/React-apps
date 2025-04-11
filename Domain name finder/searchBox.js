import React from 'react'

export default function SearchBox(props) {
  return (
        <div className="search-container">
            <input onChange={(e) => props.onInputChange(e.target.value)} 
            placeholder="Type keywords" className="search-input" />
        </div>
  )
}
