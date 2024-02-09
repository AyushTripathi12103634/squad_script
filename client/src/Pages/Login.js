import React, { useEffect, useRef, useState } from "react";
import Navbar from "../component/Navbar";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import axios from "axios";
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [islogin, setislogin] = useState(false);

  const navigate = useNavigate();

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
      toast.success(`${response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (e) {
      toast.error(`Error ${e.response.status} :${e.response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
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
      const res = await axios.post(
        "/api/v1/auth/login",
        {
          email: loginemail,
          password: loginpassword,
        }
      );

      const t = res.data;
      if (t.success) {
        localStorage.setItem("auth",t.token);
        localStorage.setItem("name",t.user.name);
        localStorage.setItem("username",t.user.username);
        localStorage.setItem("email",t.user.email);
        localStorage.setItem("isVerified",String(t.user.isVerified));
        toast.success(`${t.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        navigate("/");
      }
    } catch (e) {
      toast.error(`${e.response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
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

  const checkislogin = async (e) => {
    try{
      if (localStorage.getItem("auth")===""){
        setislogin(false);
      }
      else{
        const headers = {
          "Authorization":localStorage.getItem("auth")
        }
        const response = await axios.post("/api/v1/auth/islogin",{},{headers:headers});
        setislogin(response.data.success);
      }
    }
    catch(error){
      setislogin(false);
    }
  }

  useEffect(()=>{
    const token = localStorage.getItem("auth");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username");
    const isVerified = localStorage.getItem("isVerified");
    localStorage.setItem("auth",token?token:"");
    localStorage.setItem("name",name?name:"");
    localStorage.setItem("username",username?username:"");
    localStorage.setItem("email",email?email:"");
    localStorage.setItem("isVerified",isVerified?isVerified:"");
    checkislogin();
  },[]);

  if (islogin) {
    toast.info('Already Logged in. Redirected to home', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    navigate("/");
  }

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
