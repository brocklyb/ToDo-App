import './App.css';
import updateIcon from './images/update.svg'
import deleteIcon from './images/delete.svg'

import { useState, useRef, useEffect } from 'react';
import { type } from '@testing-library/user-event/dist/type';

function App() {
  const [ allTasks, setAllTasks ] = useState([]) 

  const newTask = (event) =>{
    event.preventDefault()
    let taskName = document.getElementById("task-name").value
    let taskPriority = document.getElementById("task-priority").value
    let taskDescription = document.getElementById("task-description").value
    let taskDueDate = document.getElementById("task-dueDate").value
    let taskID = taskPriority + (Math.floor(Math.random() * 900) + 100) 
    setNewTask({taskName,taskPriority,taskDescription,taskDueDate, taskID, updateIcon, deleteIcon, isComplete: false})
  }

  const setNewTask = (newTask) =>{
    setAllTasks([...allTasks,{newTask}])
    //console.log(allTasks)
  }

  //delete task 
  const deleteTask = (taskID) =>{
    let findTask = allTasks.findIndex((value) => locateTask(value, taskID));
    let newAllTasks = allTasks.filter((item, index) => {return index !== findTask})
    for(let i in allTasks){
      allTasks.pop()
    }
    setAllTasks(newAllTasks)
  }

  const clearAllTasks = () =>{
    //console.log(allTasks)
    for(let i in allTasks){
      allTasks.pop()
    }
  }

  //looksup where the object inside the array is stored
  //returns a number indicating the position for refernce
  const locateTask = (value, taskID) =>{
    return value.newTask.taskID === taskID;
  }

  //this usestate stores the selected task that is potentially being modified
  //saves
  const [ selectedTask, setSelectedTask ] = useState()
  const modifyTask = (taskID) =>{
    let findTask = allTasks.findIndex((value) => locateTask(value, taskID));
    setSelectedTask(allTasks[findTask])
    //console.log(allTasks[findTask])
    //console.log(selectedTask)
  }

  const updateTask = (taskID) =>{
    let findTask = allTasks.findIndex((value) => locateTask(value, taskID));
   
    let taskName = document.getElementById("task-name").value
    let taskPriority = document.getElementById("task-priority").value
    let taskDescription = document.getElementById("task-description").value
    let taskDueDate = document.getElementById("task-due-date").value
    let isTaskComplete = document.getElementById("task-isComplete").value

    let modifiedNewTask = {taskName, taskPriority, taskDescription, taskDueDate, taskID, updateIcon, deleteIcon, isTaskComplete}

    let newAllTasks = allTasks.filter((item, index) => {return item.newTask.taskID !== taskID})

    let newAllTasksArray = []

    newAllTasks.map((item) => newAllTasksArray.push(item))

    newAllTasksArray.push({newTask: modifiedNewTask})
    
    //console.log(newAllTasksArray.forEach((item) => item.locateTask()))

    setAllTasks(newAllTasksArray)
    
    toggleModifyRecordPopup()
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
              {selectedTask && selectedTask.newTask && selectedTask.newTask.taskID ? (
                <div id='modify-task-popup'>
                  <h1>Modify Task - {selectedTask.newTask.taskID}</h1>
                  <label>Task Name: </label><input type='text' id='task-name' placeholder={selectedTask.newTask.taskName}></input>
                  <label/>Priority<select id="task-priority">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <label>Task Description: </label><input type='text' id='task-description' placeholder={selectedTask.newTask.taskDescription}></input>
                  <label>Task Due Date: </label><input id='task-due-date' type='date'></input>
                  <label>Task Complete?</label><input type='checkbox' id='task-isComplete'></input>
                </div>  
              ) : (
                <h1>No Task Selected</h1>
              )}
          <button style={{backgroundColor: 'red'}} onClick={toggleModifyRecordPopup}>Cancel</button>
          <button style={{backgroundColor: 'green'}} onClick={() => updateTask(selectedTask.newTask.taskID)}>Submit</button>
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
          {allTasks.length < 1 ? (<div><h1>Zero Tasks, Congrats!</h1><h1>Create a task in the left panel</h1></div>) : allTasks.map((item, index) =>{
            return (
              <div id='task-card' key={item.newTask.taskID}>
                
                <div className='grid-item-one'><h1>Task Name: {item.newTask.taskName}</h1></div>
                <div className='grid-item-two'><h1>Priority: {item.newTask.taskPriority}</h1></div>
                <div className='grid-item-three'><h1>Details: {item.newTask.taskDescription}</h1></div>
                <div className='grid-item-four'><h1>Due Date: {item.newTask.taskDueDate}</h1></div>
                <div className='grid-item-five'><h1>Task ID: {item.newTask.taskID}</h1></div>
                <div className='grid-item-six'><h3>Edit Task</h3><img onClick={() => modifyTask(item.newTask.taskID) + toggleModifyRecordPopup()} src={item.newTask.updateIcon} alt='Failed to load'></img></div>
                <div className='grid-item-seven'><h3>Delete Task</h3><img onClick={() => deleteTask(item.newTask.taskID)} src={item.newTask.deleteIcon} alt='Failed to load'></img></div>
              </div>
            )
          })}
        </div>
        
      </div>
    </div>  
  );
}

export default App;
