import React, { useEffect, useRef, useState } from "react";
import Navbar from "../component/Navbar";
import "./Login.css";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import axios from "axios";
import { jwtDecode  } from 'jwt-decode';

const Login = () => {
  // const [name,setname]
  const containerRef = useRef(null);
  const overlayBtnRef = useRef(null);
  const [registername, setregistername] = useState("");
  const [registerusername, setregisterusername] = useState("");
  const [registeremail, setregisteremail] = useState("");
  const [registerpassword, setregisterpassword] = useState("");
  const [loginemail, setloginemail] = useState("");
  const [loginpassword, setloginpassword] = useState("");

  const handleregistername = (e) => {
    setregistername(e.target.value);
  };

  const handleregisterusername = (e) => {
    setregisterusername(e.target.value);
  };

  const handleregisteremail = (e) => {
    setregisteremail(e.target.value);
  };

  const handleregisterpassword = (e) => {
    setregisterpassword(e.target.value);
  };

  const handleregisterdetails = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/auth/register",
        {
          username: registerusername,
          name: registername,
          email: registeremail,
          password: registerpassword,
        }
      );
      console.log(response);
      const t = response.data;
      if (t.success) {
        console.log("regsitered successfully");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleloginemail = (e) => {
    setloginemail(e.target.value);
  };

  const handleloginpassword = (e) => {
    setloginpassword(e.target.value);
  };

  const handlelogindetails = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/auth/login",
        {
          email: loginemail,
          password: loginpassword,
        }
      );

      const t = response.data;
      if (t.success) {
        console.log(t.user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const overlayBtn = overlayBtnRef.current;

    const handleClick = () => {
      container.classList.toggle("right-panel-active");

      container.classList.remove("btnScaled");
      window.requestAnimationFrame(() => {
        overlayBtn.classList.add("btnScaled");
      });
    };

    overlayBtn.addEventListener("click", handleClick);
    
    return () => {
      overlayBtn.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <main className="login-main-section">
      <Navbar />

      <div className="login-main">
        <div
          className="login-container"
          id="login-container"
          ref={containerRef}
        >
          <div className="login-form-container sign-up-container">
            <form className="login-form" action="#">
              <h1 className="login-h1">Create Account</h1>
              <div className="login-infield">
                <input
                  className="login-input"
                  type="text"
                  placeholder="Username"
                  onChange={handleregisterusername}
                  value={registerusername}
                />
                <label className="login-label" />
              </div>
              <div className="login-infield">
                <input
                  className="login-input"
                  type="text"
                  placeholder="Name"
                  onChange={handleregistername}
                  value={registername}
                />
                <label className="login-label" />
              </div>
              <div className="login-infield">
                <input
                  className="login-input"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleregisteremail}
                  value={registeremail}
                />
                <label className="login-label" />
              </div>
              <div className="login-infield">
                <input
                  className="login-input"
                  type="password"
                  placeholder="Password"
                  onChange={handleregisterpassword}
                  value={registerpassword}
                />
                <label className="login-label" />
              </div>

              <button className="login-button" onClick={handleregisterdetails}>
                Sign Up
              </button>
            </form>
          </div>
          <div className="login-form-container sign-in-container">
            <form className="login-form" action="#">
              <h1 className="login-h1">Sign in</h1>
              <div className="login-infield">
                <input
                  className="login-input"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleloginemail}
                  value={loginemail}
                />
                <label className="login-label" />
              </div>
              <div className="login-infield">
                <input
                  className="login-input"
                  type="password"
                  placeholder="Password"
                  onChange={handleloginpassword}
                  value={loginpassword}
                />
                <label className="login-label" />
              </div>
              <Link to="/forgotpassword" className="login-link login-forgot">
                Forgot your password?
              </Link>
              <button className="login-button" onClick={handlelogindetails}>
                Sign In
              </button>
            </form>
          </div>
          <div
            className="login-overlay-container"
            id="overlayCon"
            ref={overlayBtnRef}
          >
            <div className="login-overlay">
              <div className="login-overlay-panel login-overlay-left">
                <h1 className="login-h1">Welcome Back!</h1>
                <p className="login-p">
                  To keep connected with us please login with your personal info
                </p>
                <button className="login-button">Sign In</button>
              </div>
              <div className="login-overlay-panel login-overlay-right">
                <h1 className="login-h1">Hello, Friend!</h1>
                <p className="login-p">
                  Enter your personal details and start journey with us
                </p>
                <button className="login-button">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Login;
