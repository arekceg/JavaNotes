import React from "react";

export const Footer = () => {
    const fullYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <p>Copyright (c) {fullYear}</p>
        </footer>
    );
};
