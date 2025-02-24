import React from 'react';

export const NotesContainer = ({ notes, removeNote }) => {
    return (
        <div className="notes-container">
            {notes.map(note => (
                <div key={note.id} className="note">
                    <h1>{note.title}</h1>
                    <p>{note.content}</p>
                    <button className="delete-button" onClick={() => removeNote(note.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};
