import React from "react";
import "./public/styles.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { NoteManager } from "./NoteManager";

const Keeper = () => {
    return <div>
        <Header/>
        <NoteManager/>
        <Footer/>
    </div>

}

export default Keeper;