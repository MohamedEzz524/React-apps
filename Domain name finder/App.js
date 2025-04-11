import React, { useState } from 'react'
import "./App.css"
import Header from "./header.js"
import SearchBox from "./searchBox.js"
import ResultContainer  from "./resultContainer.js"

export default function App() {
  const [state,setState] = useState({
    headerTitle:"Just Name It!!",
    headerExpanded:true,
    suggestedNames: []
  })

  const onInputChange = (inputText) =>{
    setState({headerExpanded: !(inputText.length>0),suggestedNames: (inputText.length>0) ? name(inputText) : []})
  }
  

  const name = require('@rstacruz/startup-name-generator'); //generator "Important"
  
  
  return (
    <div className='App'>
      <Header headerTitle={state.headerTitle}/>
      <SearchBox onInputChange={onInputChange}/>
      <ResultContainer suggestedNames={state.suggestedNames}/>
    </div>
  )
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
