import axios from 'axios';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import './Join.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Join() {
  const [meetid, setmeetid] = useState("");
  const navigate = useNavigate();
  const handlemeetid = (e) => {
    setmeetid(e.target.value);
  }
  const join = async (e) => {
    e.preventDefault();
    const headers = {
      "Authorization": localStorage.getItem("auth")
    }
    const response = await axios.post(`/api/v1/meet/joinmeet/${meetid}`,{},{headers:headers});
    navigate(`/meeting/${response.data.meet_id}`);
  }
  const create = async (e) => {
    e.preventDefault();
    const headers = {
      "Authorization": localStorage.getItem("auth")
    }
    const response = await axios.post("/api/v1/meet/createmeet",{},{headers:headers});
    navigate(`/meeting/${response.data.meeting_id}`);
  }
  return (
    <>
      <Navbar />
      <div className='join-main'>
        <div className='join-content'>
          <div className='left-container'>
            <div className='left-heading w-75'>
              <h1>Connect,Indulge and Develop</h1>
            </div>
            <div className='left-content w-50'>
              <p>Our enhanced premium group project meeting platform, originally designed for secure business engagements as Squad Script, is now available to a broader audience at no cost.</p>
            </div>
            <div className='meet-join'>
              <form className='join-meet'>
                <input className='form-control w-50' placeholder='Enter meet id' onChange={handlemeetid}></input>
                <button className='btn join-button' onClick={join}>Join</button>
              </form>
              <form className='create-meet'>
                <button className='btn create-button w-50' onClick={create}>Create a new meeting</button>
              </form>
            </div>
          </div>
          <div className='right-container ms-5'></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Join;