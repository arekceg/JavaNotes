import React from "react";

export const NoteCreator = ({ note, onNoteChange, onNoteSave }) => {
    return (
        <div className="note-creator">
            <div className="note">
                <input name="title" style={{fontWeight:"bold"}}type="text" placeholder="Note title" value={note.title} onChange={onNoteChange} />
                <input name="content" type="text" placeholder="Note content" value={note.content} onChange={onNoteChange} />
                <SaveButton saveNote={onNoteSave} />
            </div>
        </div>
    );
};

function SaveButton({ saveNote }) {
    return (
        <div className="bottom-button-container">
            <button className="save-button" onClick={saveNote}>Save</button>
        </div>
    );
}

