import React, {useEffect, useRef} from "react";
import Navbar from "../component/Navbar";
import "./Login.css";
import { Link } from "react-router-dom";
import Footer from '../component/Footer';
const Login = () => {
    // const [name,setname]
    const containerRef = useRef(null);
    const overlayBtnRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const overlayBtn = overlayBtnRef.current;

        const handleClick = () => {
            container.classList.toggle('right-panel-active');

            container.classList.remove('btnScaled');
            window.requestAnimationFrame(() => {
                overlayBtn.classList.add('btnScaled');
            });
        };

        overlayBtn.addEventListener('click', handleClick);

        // Clean up the event listener when the component unmounts
        return () => {
            overlayBtn.removeEventListener('click', handleClick);
        };
    }, []);
  return (
    <main className="login-main-section">
      <Navbar />

      <div className="login-main">
        <div className="login-container" id="login-container" ref={containerRef}>
          <div className="login-form-container sign-up-container">
            <form className="login-form" action="#">
              <h1 classname="login-h1">Create Account</h1>
              <div className="login-social-container">
                <Link className="login-link login-social">
                  <i className="fab fa-facebook-f" />
                </Link>
                <Link className="login-link login-social">
                  <i className="fab fa-google-plus-g" />
                </Link>
                <Link className="login-link login-social">
                  <i className="fab fa-linkedin-in" />
                </Link>
              </div>
              <span className="login-span">
                or use your email for registration
              </span>
              <div className="login-infield">
                <input
                  className="login-input"
                  type="text"
                  placeholder="Username"
                />
                <label className="login-label" />
              </div>
              <div className="login-infield">
                <input className="login-input" type="text" placeholder="Name" />
                <label className="login-label" />
              </div>
              <div className="login-infield">
                <input
                  className="login-input"
                  type="email"
                  placeholder="Email"
                  name="email"
                />
                <label className="login-label" />
              </div>
              <div className="login-infield">
                <input
                  className="login-input"
                  type="password"
                  placeholder="Password"
                />
                <label className="login-label" />
              </div>
            
              <button className="login-button">Sign Up</button>
            </form>
          </div>
          <div className="login-form-container sign-in-container">
            <form className="login-form" action="#">
              <h1 classname="login-h1">Sign in</h1>
              <div className="login-social-container">
                <Link className="login-link login-social">
                  <i className="fab fa-facebook-f" />
                </Link>
                <Link className="login-link login-social">
                  <i className="fab fa-google-plus-g" />
                </Link>
                <Link className="login-link login-social">
                  <i className="fab fa-linkedin-in" />
                </Link>
              </div>
              <span className="login-span">or use your account</span>
              <div className="login-infield">
                <input
                  className="login-input"
                  type="email"
                  placeholder="Email"
                  name="email"
                />
                <label className="login-label" />
              </div>
              <div className="login-infield">
                <input
                  className="login-input"
                  type="password"
                  placeholder="Password"
                />
                <label className="login-label" />
              </div>
              <Link className="login-link login-forgot">
                Forgot your password?
              </Link>
              <button className="login-button">Sign In</button>
            </form>
          </div>
          <div className="login-overlay-container" id="overlayCon" ref={overlayBtnRef}>
            <div className="login-overlay">
              <div className="login-overlay-panel login-overlay-left">
                <h1 classname="login-h1">Welcome Back!</h1>
                <p className="login-p">
                  To keep connected with us please login with your personal info
                </p>
                <button className="login-button">Sign In</button>
              </div>
              <div className="login-overlay-panel login-overlay-right">
                <h1 classname="login-h1">Hello, Friend!</h1>
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
