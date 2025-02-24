import React from "react";
const ListRenderer = ({ isEditable, highlightClass, elements }) => {
    return <ul
        spellCheck="false"
        contentEditable={isEditable}
        className={highlightClass}>
        {generateListContent()}
    </ul>

    function generateListContent() {
        if (elements.length !== 0) {
            return elements.map((e, index) => (
                createListElement(index, e)
            ));
        } else {
            return <li>0000</li>;
        }

        function createListElement(index, e) {
            return <li key={index}>{`Element ${index}: ${e}`}</li>;
        }
    }
}

export default ListRenderer;