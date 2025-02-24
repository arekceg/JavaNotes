import React, { useState } from "react";
import { NotesContainer } from "./NotesContainer";
import { NoteCreator } from "./NoteCreator";
import { NoteData } from "./NoteData";

export const NoteManager = () => {
    const [note, setNote] = useState(new NoteData("", ""));
    const [notes, setNotes] = useState([]);

    function handleNoteChange(event) {
        const { name, value } = event.target;
        setNote(prevNote => ({ ...prevNote, [name]: value }));
    }

    function saveNote(event) {
        event.preventDefault();
        if (!note.title.trim()) {
            alert("Title cannot be empty");
            return;
        }
        setNotes(prev => [note, ...prev]);
        setNote(new NoteData("", ""));
    }

    function removeNote(noteId) {
        setNotes(notes.filter(note => note.id !== noteId));
    }

    return (
        <div>
            <NoteCreator
                note={note}
                onNoteChange={handleNoteChange}
                onNoteSave={saveNote}
            />
            <NotesContainer notes={notes} removeNote={removeNote}/>
        </div>
    );
};
