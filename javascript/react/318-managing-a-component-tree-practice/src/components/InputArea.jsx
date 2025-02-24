import React from "react";
import { useState } from "react";

function InputArea({addItem}) {

  const [inputText, setInputText] = useState("");
  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function handleItemAdd() {
    addItem(inputText);
    setInputText("");
  }
  return (
    <div className="form">
      <input onChange={handleChange} type="text" value={inputText} />
      <button onClick={handleItemAdd}>
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
