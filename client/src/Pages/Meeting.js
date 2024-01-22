import React from 'react';
import './Meeting.css';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer'
const Meeting = () => {
  return (
    <main className='meeting-main-section'>
    <Navbar />
    <h1>Meeting</h1>
    <Footer />
    </main>
  )
}

export default Meeting;