// src/Pages/Join.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import { setMeetingId, setUsername } from "../Redux/RoomSlice";
import { authToken, createMeeting } from "./VC/API";
import gif from "../images/joingif.gif";
import JoinScreen from "./JoinScreen";
import './Join.css';

const Join = () => {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.room.username);

    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
            dispatch(setUsername(savedUsername));
        }
    }, [dispatch]);

    const getMeetingAndToken = async (id) => {
        const meetingId = id == null ? await createMeeting({ token: authToken }) : id;
        dispatch(setMeetingId(meetingId));
        // Navigate to the meeting view
        window.location.href = `/user/room/${meetingId}`;
    };

    return (
        <>
            <Navbar />
            <div className="join-main">
                <div className="join-content">
                    <div className="join-left-container">
                        <div className="join-left-heading">
                            <h1>Connect Indulge And Develop</h1>
                        </div>
                        <div className="join-left-content">
                            <span>
                                Our enhanced premium group project meeting platform, originally
                                designed for secure business engagements as Squad Script, is now
                                available to a broader audience at no cost.
                            </span>
                        </div>
                        <JoinScreen getMeetingAndToken={getMeetingAndToken} />
                    </div>
                    <div className="join-right-container">
                        <img src={gif} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Join;
