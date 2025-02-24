import React from "react";
import Basics from "./basics/Basics";
import Greetings from "./greetings/Greetings"
import RouterRenderer from "./routing/RouterRenderer";
import Keeper from "./keeper/Keeper";

const routes = [
    { route: "/basics", element: <Basics/>, displayName: "Basics"},
    { route: "/greetings", element: <Greetings/>, displayName: "Greetings"},
    { route: "/keeper", element: <Keeper/>, displayName: "Keeper App"}
];

const App = () => {
    return (
        <RouterRenderer routes={routes}/>
    );
};
export default App;
