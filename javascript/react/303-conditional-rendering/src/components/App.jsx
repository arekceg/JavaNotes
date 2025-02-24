import React, { useState } from "react";
import { LoginPrompt as LoginPrompt } from "./loginPrompt";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCheckboxChange = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="container">
      <label>
        <input type="checkbox"
          checked={isLoggedIn}
          onChange={handleCheckboxChange} />
        Logged In
      </label>
      {!isLoggedIn && <LoginPrompt />}
    </div>
  );
}

export default App;