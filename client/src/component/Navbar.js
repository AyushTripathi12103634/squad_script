import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import SSLogo from "../images/SquadScript.png";

const Navbar = () => {
  return (
    <>
      <div className="Navbar-header px-5 py-3">
     
      <Link className="navbar-brand" to="/"><img src={SSLogo} alt=""></img></Link>
        <ul className="Navbar">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about"> About us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/join">Join</Link>
          </li>
        </ul>

        <div className="Navbar-main">
          <Link to="/login" className="Navbar-user">
            <i className="ri-user-fill" />
            Sign In / Register
          </Link>
          <div className="bx bx-menu" id="Navbar-menu-icon" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
