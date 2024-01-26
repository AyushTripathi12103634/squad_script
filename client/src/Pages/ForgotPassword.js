import React, { useState } from 'react'
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import "./FogotPassword.css";
import axios from 'axios';
const ForgotPassword = () => {
    const [verified, setverified] = useState(false);
    const [email, setemail] = useState("");
    const [otp, setotp] = useState("");
    const [otpverify, setotpverify] = useState(false);
    const [newpassword, setnewpassword] = useState("");
    const handleforgotemail = (e) => {
        setemail(e.target.value);
    }
    const handleforgototp = (e) => {
        setotp(e.target.value);
    }
    const handleforgotpassword = (e) => {
        setnewpassword(e.target.value)
    }
    const handleoptenter = async (e) => {
        e.preventDefault();
        if (!verified) {
            try {
                const response = await axios.post("/api/v1/auth/forgotpassword", {
                    email
                });
                const otpsend = response.data;
                setverified(otpsend.success);
                alert(otpsend.message)
            } catch (error) {
                console.log(error);
            }
        }
        else if (verified && !otpverify) {
            try {
                const response = await axios.post("/api/v1/auth/verifyotp", {
                    email,
                    otp
                });
                const otpcheck = response.data;
                setotpverify(otpcheck.success);
                alert(otpcheck.message)
            }
            catch (error) {
                console.log(error)
            }
        }
        else if (verified && otpverify) {
            try {
                const response = await axios.post("/api/v1/auth/recievepassword/true", {
                    email, password: newpassword
                });
                const result = response.data;
                if (result.success) {
                    alert("Password Changed Successfully");
                    window.location="/login";
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <Navbar />
            <div className='forgotpassward_main'>
                <div className='forgotpassward_background'>
                    <h1 className="text-center my-5">Forgot Password</h1>
                    <form className='forgotform'>
                        {verified ? (
                            otpverify ? (
                                <>
                                    <input className='form-control forgotemail my-3' placeholder='Enter email' disabled />
                                    <input className='form-control otp my-3' placeholder='Enter OTP' disabled />
                                    <input className='form-control otp my-3' placeholder='Enter New Password' onChange={handleforgotpassword} />
                                </>
                            ) : (
                                <>
                                    <input className='form-control forgotemail my-3' placeholder='Enter email' disabled />
                                    <input className='form-control otp my-3' placeholder='Enter OTP' onChange={handleforgototp} />
                                </>
                            )
                        ) : (
                            <input className='form-control forgotemail' placeholder='Enter email' onChange={handleforgotemail} />
                        )}
                    </form>
                    <div className='forgotsubmit'>
                        <button className='btn btn-primary mt-5' onClick={handleoptenter}>Submit</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ForgotPassword
