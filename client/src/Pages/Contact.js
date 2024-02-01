import React from 'react'
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { Link } from 'react-router-dom';
import './Contact.css';
import { useState } from 'react';
import axios from 'axios';
const Contact = () => {
    const [email, setemail] = useState("");
    const [content, setcontent] = useState('');
    const [check, setcheck] = useState(false);
    const [type, settype] = useState('');
    const handleemail = (e) => {
        setemail(e.target.value);
    }
    const handlecontent = (e) => {
        setcontent(e.target.value);
    }
    const handlecheck = (e) => {
        setcheck(e.target.checked);
    }
    const handletype = (e) => {
        settype(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (check && email.endsWith("@gmail.com") && type !== "default") {
            const response = await axios.post("/api/v1/auth/contact", {
                email: email,
                content: content,
                type: type,
            })
            console.log(response.data);
        }
        else if (check && !email.endsWith("@gmail.com")) {
            console.log("Enter a valid email address");
        }
        else if (check && type === "default") {
            console.log("Select type of message");
        }
        else {
            console.log("Check the terms and conditions to send the message")
        }
    }
    return (
        <>
            <Navbar />
            <div className='contact-main'>
                <div className='contact-content'>
                    <div className='contact-heading mt-5 mb-5'>
                        <h1>Contact Us</h1>
                    </div>
                    <div className='contact-form mt-5'>
                        <form>
                            <select className='form-control w-75 mx-auto mt-5' onChange={handletype}>
                                <option value="default">Select type of message</option>
                                <option value="complaint">Complaint</option>
                                <option value="suggestion">Sugegstion</option>
                                <option value="enquiry">Enquiry</option>
                            </select>
                            <input className='form-control w-75 mx-auto mt-3' placeholder='Enter Email Address' onChange={handleemail}></input>
                            <textarea className='form-control w-75 mx-auto mt-3 h-100' placeholder='Enter Content' onChange={handlecontent}></textarea>
                            <div className='form-submit'>
                                <div className='form-check mt-4'>
                                    <input type='checkbox' name='check' onChange={handlecheck}></input>
                                    <label htmlFor='check' className='ms-2'>I agree to all <Link to="/tnc">Terms and Conditions</Link></label>
                                </div>
                                <button className='btn btn-success mx-auto mt-3' onClick={handleSubmit}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contact