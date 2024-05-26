import './App.css';
import updateIcon from './images/update.svg'
import deleteIcon from './images/delete.svg'

import { useState, useRef, useEffect } from 'react';

function App() {
  const [ allTasks, setAllTasks ] = useState([]) 

  const newTask = (event) =>{
    event.preventDefault()
    let taskName = document.getElementById("task-name").value
    let taskPriority = document.getElementById("task-priority").value
    let taskDescription = document.getElementById("task-description").value
    let taskDueDate = document.getElementById("task-dueDate").value
    let taskID = taskPriority + (Math.floor(Math.random() * 900) + 100) 
    setNewTask({taskName,taskPriority,taskDescription,taskDueDate, taskID, updateIcon, deleteIcon})
  }

  const setNewTask = (newTask) =>{
    setAllTasks([...allTasks,{newTask}])
    //console.log(allTasks)
  }

  const deleteTask = (taskID) =>{
    let findTask = allTasks.findIndex((value) => locateTask(value, taskID));
    let newAllTasks = allTasks.filter((item, index) => {return index != findTask})
    for(let i in allTasks){
      allTasks.pop()
    }
    setAllTasks(newAllTasks)
  }

  const locateTask = (value, taskID) =>{
    //console.log(value)
    return value.newTask.taskID === taskID;
  }

  const selectedTask = useRef(undefined)
  const modifyTask = (taskID) =>{
    selectedTask.current = taskID
    let findTask = allTasks.findIndex((value) => locateTask(value, taskID));
    //toggleModifyRecordPopup()
  }

  const modifyTaskRef = useRef(null)
  const toggleModifyRecordPopup = () =>{
      if(!modifyTaskRef.current){
          return
      }
      modifyTaskRef.current.hasAttribute("open")
          ? modifyTaskRef.current.close()
          : modifyTaskRef.current.showModal()
  }

  return (
    <div id='root-container'>

      <dialog ref={modifyTaskRef}>
         <div id='popup-container'>
             <h1>Modify Task {selectedTask.current}</h1>
             <button style={{backgroundColor: 'red'}} onClick={toggleModifyRecordPopup}>Cancel</button>
         </div>
     </dialog>

      <div id='grid-container'>
        <div id='left-content'>
          <h1>Left Side</h1>
          <form id='left-form'>
            <input id='task-name' placeholder='Task Name'></input>
            <label/>Priority<select id="task-priority">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <input id='task-description' placeholder='Description'></input>
            <label/>Due Date: <input id='task-dueDate' type='date'></input>
            <button type='submit' onClick={newTask}>Create Task</button>
          </form>
        </div>

        <div id='right-content'>
          <h1>Right Side</h1>
          {allTasks.length < 1 ? (<h1>No Data</h1>) : allTasks.map((item, index) =>{
            return (
              <div id='task-card' key={item.newTask.taskID}>
                <h1>Task: {item.newTask.taskName}</h1>
                <h1>Priority: {item.newTask.taskPriority}</h1>
                <h1>Description: {item.newTask.taskDescription}</h1>
                <h1>Due Date: {item.newTask.taskDueDate}</h1>
                <h1>Task ID: {item.newTask.taskID}</h1>
                <img onClick={() => modifyTask(item.newTask.taskID)} onClick={() => toggleModifyRecordPopup()} src={item.newTask.updateIcon} alt='Failed to load'></img>
                <img onClick={() => deleteTask(item.newTask.taskID)} src={item.newTask.deleteIcon} alt='Failed to load'></img>
              </div>
            )
          })}
        </div>
        
      </div>
    </div>  
  );
}

export default App;
