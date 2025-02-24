import React from "react";
import { useState } from "react";
import { Task } from "./Task";

function App() {
  const [currentTask, setCurrentTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function handleTaskInputChange(event) {
    const newTaskValue = event.target.value;
    console.log(newTaskValue);
    setCurrentTask(newTaskValue)
  }

  function submitTask() {
    setTasks(prevTasks => [...prevTasks, currentTask])
    setCurrentTask("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" onChange={handleTaskInputChange} value={currentTask} />
        <button onClick={submitTask}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {renderTasks()}
        </ul>
      </div>
      <div>
      </div>
    </div>
  );

  function removeTask(index) {
    console.log("Removing task with index " + index)
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  }

  function renderTasks() {
    return tasks.map((task, index) => {
      return <Task key={index} index={index} task={task} removeTask={removeTask}/>
    })
  }
}

export default App;