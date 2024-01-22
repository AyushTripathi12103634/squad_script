import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'
const Footer = () => {
  return (
    <div className="footer mt-auto footer-main">
      <div className="container">
        <h2 className="text-center" style={{fontSize:'20px',paddingTop:'15px'}}>All Right Reserved &copy; CoffeeCoders</h2>
        <p className="text-center mt-3">
          <Link className="footer-links" to="/about">About</Link> | <Link className="footer-links" to="/contact">Contact</Link> |{" "}
          <Link className="footer-links" to="/policy">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
