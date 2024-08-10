import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'; 
import axios from 'axios';
import spinnerGif from '../images/spinner.gif';
import Spinner from './PrivateSpinner';

export default function PrivateRoute(){
  const [ok, setOk] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("auth");
  
  useEffect(() => {
    const authCheck = async () => {
      const response = await axios.post(
        `api/v1/auth/islogin`,{
          token: token
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        setOk(true);
      } else {
        setOk(false);
      }
      setIsLoading(false);
    };
    if (token) authCheck();
    else setIsLoading(false)
  }, [token]);

  if (isLoading) {
    return (
      <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <img src={spinnerGif} alt="Loading..." />
      <h1 className="text-center" style={{ fontSize: "30px" }}>
        Loading...
      </h1>
    </div>
    ); // or replace with a loading indicator if you prefer
  }

  return ok ? <Outlet /> : <Spinner />;
}
