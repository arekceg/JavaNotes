import React, { useState, useEffect, useRef } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { useActionState } from "react";

function CreateArea(props) {
  const [noteClicked, setNoteClicked] = useState(false);
  const formRef = useRef(null);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const showNoteContent = noteClicked || note.content !== "";

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setNoteClicked(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formRef]);

  return (
    <div>
      <form ref={formRef} className="create-note">
        <input
          name="title"
          onChange={handleChange}
          onClick={() => setNoteClicked(true)}
          value={note.title}
          placeholder="Title"
        />
        {showNoteContent && (
          <>
            <textarea
              name="content"
              onChange={handleChange}
              value={note.content}
              placeholder="Take a note..."
              rows="3"
            />
            <Zoom in={true}>
              <Fab onClick={submitNote}><AddIcon /></Fab>
            </Zoom>
          </>
        )}
      </form>
    </div>
  );
}

export default CreateArea;
