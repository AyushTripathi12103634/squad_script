import React, { useEffect, useState, useRef } from 'react';
import './Meeting.css';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { useParams } from 'react-router-dom';
import Compiler from '../component/Compiler';
import Chat from '../component/Chat';
import { io } from "socket.io-client";

const Meeting = () => {
  const params = useParams();
  const [id,setid] = useState({});
  useEffect(()=>{
    if (params?.meet_id) setid(params.meet_id);
  },[params?.meet_id]);
  const [fileContent, setFileContent]=useState("");
  const room = id;


  const socketRef = useRef();

  const fun = (value) => {
    if (socketRef.current) {
      socketRef.current.emit('code', { room, text: value });
    }
  }
  

  useEffect(() => {
    const serverurl = process.env.SEVRER_URL || 'http://localhost:5000';
    socketRef.current = io.connect(serverurl);

    socketRef.current.on('connect_error', () => {
      window.location.reload();
    });

    socketRef.current.emit('join room', room);

    socketRef.current.on('code', (text) => {
      setFileContent(text);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [room]);

  return (
    <main className='meeting-main-section'>
      <Navbar />
      <Compiler socketRef={socketRef} fun={fun} FileContent={fileContent} room={room} />
      <Chat room={id} />
      <Footer />
    </main>
  )
}

export default Meeting;
