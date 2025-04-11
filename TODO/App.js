import { useState,useRef } from "react"
import "./App.css"

export default function App() {
    const [taskName,setTaskName] = useState({})
    const [taskList,setTasklist] = useState([])
    const [count,setCount] = useState(0)
    const [complete,setComplete] = useState(0)
    const Input = useRef()


    // write
    const addingTask = (e)=>{          
            setTaskName({name: e.target.value, id: Date.now()})
    }

    // add
    const addTask = ()=> {
        if (Object.keys(taskName).length !== 0 && Input.current.value !== "") { // check if object length != 0
        setTasklist(prev => [...prev,taskName])
        Input.value =""
        setCount(c => c + 1)
    }}
    // delete
    const deleteTask =  (id)=> {
         setTasklist(prev => prev.filter(elem => elem.id !== id)) 
         setCount(c => c - 1)
    }

    // edit
    const editTask = (i)=> {
        const editedTodo = window.prompt("Edit the todo:")
        if (editedTodo !== null && editedTodo.trim() !== ''){
            let updatedTodo = [...taskList]            // imp
            updatedTodo[i].name = editedTodo
            setTasklist(updatedTodo)
        }
    }

    // complete
    const isComplete = (e)=> {
        e.target.classList.toggle('complete')
        setComplete(document.querySelectorAll(".complete").length)
    }


  return (
        <div className="App">
            <h1 style={{color:"#BDB395"}}>TODO LIST</h1>
            <hr/>
            <input ref={Input} type="text" id="add-item" placeholder="add item..." onChange={(e)=>addingTask(e)} />
            <button className="add" onClick={()=>addTask()}>ADD</button>
            {taskList.length > 0 && taskList.map((task, index) => {
             return <div key={index} className="task" >
                        <span onClick={(e)=> isComplete(e)}>{task.name}</span>
                        <div className="bt">
                            <button  className="btn delete" onClick={()=>deleteTask(task.id)}>Delete</button>
                            <button  className="btn edit" onClick={()=>editTask(index)}>Edit</button>
                        </div>
            </div>
            })}
            <span className="stats" style={{float:"left"}}>Tasks: <span>{count}</span></span>
            <span className="stats" style={{float:"right"}}>Complete: <span>{complete}</span></span>
        </div>          
                
  )
}