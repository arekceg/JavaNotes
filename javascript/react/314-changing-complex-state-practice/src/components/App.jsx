import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  const [tempContact, setTempContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  function handleSubmit(event) {
    setContact(tempContact);
    event.preventDefault();
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setTempContact(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form onSubmit={handleSubmit}>
        <input
          name="fName"
          placeholder="First Name"
          value={tempContact.fName}
          onChange={handleInputChange}
        />
        <input
          name="lName"
          placeholder="Last Name"
          value={tempContact.lName}
          onChange={handleInputChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={tempContact.email}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

