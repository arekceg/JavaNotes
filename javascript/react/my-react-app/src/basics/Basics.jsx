import React, {useState} from "react";
import ImageRenderer from "./ImageRenderer";
import ListRenderer from "./ListRenderer";
const Basics = () => {

    const [isHighlighted, setIsHighlighted] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

    const toggleHighlight = () => {
        setIsHighlighted(!isHighlighted);
    };

    const getHighlightClass = () => {
        return isHighlighted ? "hightlighted" : ""
    };

    const toggleListEditable = () => setIsEditable(!isEditable);

    const redColor = { color: "red" };

    return (
        <div>
            <h1>Hello World</h1>
            <button onClick={toggleHighlight}>Toggle Highlight</button>
            <br />
            <input
                type="checkbox"
                name="list-editable"
                id="list-editable"
                onChange={toggleListEditable}
            />
            <ListRenderer
                isEditable={isEditable}
                highlightClass={getHighlightClass()}
                elements={["one", "two", "three"]} />
            <ImageRenderer
                highlightClass={getHighlightClass()} />
            <h2 style={redColor}>Inline styling</h2>
        </div>
    );
};


export default Basics;