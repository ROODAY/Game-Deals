import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import firebase from "gatsby-plugin-firebase";
import Navbar from "react-bootstrap/Navbar";

import { GhostButton } from "../styles";
import icon from "../images/icon.png";

/*
const Header = ({ siteTitle }) => (
  <Navbar
    style={{
      background: `rebeccapurple`,
    }}
  >
    <Link to="/">
      <Navbar.Brand
        style={{
          color: "white",
        }}
      >
        <img
          src={icon}
          alt="Oliver's face"
          style={{
            width: "2rem",
          }}
        />
        <span
          style={{
            marginLeft: "1rem",
          }}
        >
          {siteTitle}
        </span>
      </Navbar.Brand>
    </Link>
  </Navbar>
);
*/

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(newUser => {
      if (JSON.stringify(user) !== JSON.stringify(newUser)) {
        setUser(newUser);
      }
    });
  }, []);

  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <Navbar>
      <Navbar.Brand className="mr-auto">
        <Link to="/">
          <img src={icon} alt="Site Icon" />
          <span>Olly G's Game Deals</span>
        </Link>
      </Navbar.Brand>
      {user && <GhostButton onClick={logout}>Logout</GhostButton>}
    </Navbar>
  );
};

export default Header;
