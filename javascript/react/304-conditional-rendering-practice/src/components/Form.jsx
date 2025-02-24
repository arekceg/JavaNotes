import React, { useState, useEffect } from "react";

const user = {
  username: "admin",
  password: "pass"
}

function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, updateLoginState] = useState(false);

  useEffect(() => {
    if (username === user.username && password === user.password) {
      updateLoginState(true);
    } else {
      updateLoginState(false);
    }
  }, [username, password]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Additional form submission logic can go here
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        aria-label="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="password"
        placeholder="Password"
        aria-label="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      {!isLoggedIn && (
        <input
          type="password"
          placeholder="Confirm Password"
          aria-label="Confirm Password"
        />
      )}
      <Submit isLoggedIn={isLoggedIn} />
    </form>
  );
}

function Submit({ isLoggedIn }) {
  const msg = isLoggedIn ? "Login" : "Register";
  return <button type="submit">{msg}</button>;
}

export default Form;

