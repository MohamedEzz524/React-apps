import React from 'react'

const nameCheapUrl = 
"https://www.namecheap.com/domains/registration/results/?domain=";  // important

export default function NameCard(props) {
  return (
    <div>
       <a
            target="_blank"
            rel="noreferrer"
            className="card-link" href={`${nameCheapUrl}${props.suggestedName}`}>
            <div className="result-name-card">
                <p className="result-name">{props.suggestedName}</p>
            </div>
        </a>
    </div>
  )
}
