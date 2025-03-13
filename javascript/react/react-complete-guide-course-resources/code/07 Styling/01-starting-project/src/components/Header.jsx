import React from 'react';
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="text-2xl font-pacifico">
      <img className="mb-8 w-44" src={logo} alt="A canvas" />
      <h1>Welcome to My Site</h1>
      <p className="capitalize">A community of artists and art-lovers.</p>
    </header>
  );
};

export default Header;
