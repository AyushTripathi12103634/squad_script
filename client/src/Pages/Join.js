import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import './Join.css';
import React , {useState} from 'react';
function Join() {
  const [status,setstatus] = useState("Enter meeting link");
  return (
    <main className='join-main-section'>
      <Navbar />
      <div>
        <form>
          <h1>Squad Script Meeting</h1>
          <input className='form-control' placeholder={status}></input>
          <select className='form-control'>
            <option value={"join"}></option>
            <option value={"join"}></option>
          </select>
        </form>
      </div>
      <Footer />
    </main>
  );
}

export default Join;