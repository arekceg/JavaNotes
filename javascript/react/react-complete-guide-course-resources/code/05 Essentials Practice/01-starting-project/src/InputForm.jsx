export function InputForm({ fields, fieldUpdateHandler }) {
  function updateFieldValue({ target: { name, value } }) {
    console.log(`Setting field ${name} to ${value}`);
    fieldUpdateHandler(name, value);
  }
  return (
    <div id="user-input" className="input-group">
      {buildInputGroup(fields, updateFieldValue)}
    </div>
  );
}

function buildInputGroup(fields, updateFieldValue) {
  return Object.entries(fields).map(([name, value], index) => {
    console.log(`Generating field: ${name} : ${value}`);
    return (
      <div key={index}>
        <label>{name}</label>
        <input
          name={name}
          value={value}
          onChange={updateFieldValue}
          style={
            isNaN(value) || value === "" ? { border: "2px solid red" } : null
          }
          required
          type="number"
        />
      </div>
    );
  });
}
