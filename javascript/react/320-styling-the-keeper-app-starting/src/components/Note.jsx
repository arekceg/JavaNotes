import React from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}><DeleteForeverIcon/></button>
    </div>
  );
}

export default Note;
