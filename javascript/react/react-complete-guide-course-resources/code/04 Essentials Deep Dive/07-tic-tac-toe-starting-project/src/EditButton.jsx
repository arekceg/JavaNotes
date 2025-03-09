export function EditButton({ updateEditable, editable, isStarted }) {
  const buttonCaption = editable ? "Save" : "Edit";
  return (
    <button onClick={updateEditable} hidden={isStarted}>
      {buttonCaption}
    </button>
  );
}
