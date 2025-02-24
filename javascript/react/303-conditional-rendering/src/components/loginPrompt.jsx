import React from "react";

export function LoginPrompt(params) {
  return <div>
    <form className="form">
      <LoginCredentialsInput />
      <button type="submit">Login</button>
    </form>
  </div>;
}

function LoginCredentialsInput() {
  return <div>
    <Input type="text" placeholder="Username" />
    <Input type="password" placeholder="Password" />
  </div>
}

function Input({ type, placeholder }) {
  return <input type={type} placeholder={placeholder} />
};