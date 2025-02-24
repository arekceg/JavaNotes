import React from "react";


export const Note = ({ noteData, removeNote }) => {
    return (
        <div className="note">
            <h1>{noteData.title}</h1>
            <p>{noteData.content}</p>
            <div className="bottom-button-container">

            <button className="delete-button" onClick={()=>removeNote(noteData.id)}>Delete</button>
            </div>
        </div>
    );
};

