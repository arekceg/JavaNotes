import React from "react";

export const NoteManager = () => {
    const notesArray = [];
    for (let index = 0; index < 50; index++) {
        notesArray.push(
            <div key={index} className="note">
                <h1>Note title {index + 1}</h1>
                <p>Note content {index + 1}</p>
            </div>
        );
    }
    return <div className="notes-container">{notesArray}</div>;
};
