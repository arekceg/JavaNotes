import React from "react";
import { useState } from "react";

function App() {
  const [buttonColor, setButtonColor] = useState("white");
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [name, setName] = useState("");
  const [nameInput, setNameInput] = useState("");
    const handleInputChange = (event) => setNameInput(event.target.value);

  React.useEffect(() => {
    setButtonColor(isMouseOver ? "black" : "white");
  }, [isMouseOver]);

  const Button = () => {
    return (
      <button
        style={{ backgroundColor: buttonColor }}
        onClick={()=> setName(nameInput)}
        onMouseOver={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        Submit
      </button>
    );
  };

  const NameInput = () => {
    return (
      <input
        type="text"
        placeholder="What's your name?"
        value={nameInput}
        onChange={handleInputChange}
      />
    );
  };
  return (
    <div className="container">
      <h1>Hello {name}</h1>
      <NameInput/>
      <Button />
    </div>
  );
}


export default App;
