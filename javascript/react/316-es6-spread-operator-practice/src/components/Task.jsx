import React from "react";

export function Task({ index, task, removeTask}) {

  function handleTaskClicked() {
    console.log("will remove task with index " + index);
    removeTask(index)
  }

  const taskStyle = {
    textDecoration: isCompleted ? "line-through" : "none"
  };

  return (
    <li key={index} onClick={handleTaskClicked} style={taskStyle}>
      {task}
    </li>
  );
}
