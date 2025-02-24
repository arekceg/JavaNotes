import React from "react";
import { useState } from "react";

function App() {
const getCurrentDateString = () => new Date().toLocaleTimeString();
  const [date, setDate] = useState(getCurrentDateString());

  function updateDate() {
    return () => setDate(getCurrentDateString());
  }
  setInterval(updateDate(), 1000);
  return (
    <div className="container">
      <h1>{date}</h1>
      <button onClick={updateDate()}>Get Time</button>
    </div>
  );
}

export default App;

