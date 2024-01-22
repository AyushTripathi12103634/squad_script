import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import SSLogo from '../images/SquadScript.png';

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-evenly">
          <Link className="navbar-brand" to="/"><img src={SSLogo} alt=""></img></Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/join">Join</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/meeting">Meeting</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/profile"></Link>
              </li>
            </ul>
          </div>
          <form className="d-flex" role="search">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
          </form>
        </div>
      </nav>


    </>
  )
}

export default Navbar;