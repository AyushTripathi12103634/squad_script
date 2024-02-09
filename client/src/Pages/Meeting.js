import React, { useEffect, useState, useRef } from 'react';
import './Meeting.css';
import { useNavigate, useParams } from 'react-router-dom';
import Compiler from '../component/Compiler';
import Chat from '../component/Chat';
import { io } from "socket.io-client";
import { GiCctvCamera, GiChatBubble, GiMicrophone, GiPhotoCamera, GiVideoConference } from "react-icons/gi";
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Meeting = () => {
  const params = useParams();
  const [id, setid] = useState({});
  useEffect(() => {
    if (params?.meet_id) setid(params.meet_id);
  }, [params?.meet_id]);
  const [fileContent, setFileContent] = useState("");
  const [messages, setMessages] = useState([]);
  const room = id;

  const navigate = useNavigate();

  const socketRef = useRef();

  const fun1 = (value) => {
    if (socketRef.current) {
      socketRef.current.emit('code', { room, text: value });
    }
  }

  const sendMessage = (message) => {
    const username = localStorage.getItem('username');
    socketRef.current.emit('message', { room, text: message, username });
  };

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

    socketRef.current.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [room]);

  const [mic, setmic] = useState(false);
  const [video, setvideo] = useState(false);
  const [screen, setscreen] = useState(false);
  const [record, setrecord] = useState(false);
  const [chat, setchat] = useState(false);
  const [editor, seteditor] = useState(false);
  const [editorwidth, seteditorwidth] = useState('960px');

  const handlemic = (e) => {
    setmic(!mic);
  }
  const handlevid = (e) => {
    setvideo(!video);
  }
  const handlescreen = (e) => {
    setscreen(!screen);
  }
  const handlerecord = (e) => {
    setrecord(!record);
  }
  const handlechat = (e) => {
    setchat(!chat);
  }
  const handleeditor = (e) => {
    seteditor(!editor);
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className='meeting-main-content mb-0'>
        <div className='meeting-content'>
          {editor?(
            <>
              <button onClick={handleeditor} className='btn btn-dark'>Hide Editor</button>
              <div className='editor'>
                <Compiler socketRef={socketRef} fun={fun1} FileContent={fileContent} room={room} width={editorwidth} />
              </div>
            </>
          ):(
            <button onClick={handleeditor} className='btn btn-dark'>Show Editor</button>
          )}
        </div>
        <div className='meeting-list'></div>
        <div className='meeting-controls'>
          <div className='button-layout pb-4'>
            <div className='meet-control me-5'>
              {mic?(
                <button className="btn btn-dark" title='Turn off Microphone' onClick={handlemic}><GiMicrophone /></button>
              ):(
                <button className="btn btn-danger" title='Turn on Microphone' onClick={handlemic}><GiMicrophone /></button>
              )}
              
              {video?(
                <button className="btn btn-dark" title='Turn off Video' onClick={handlevid}><GiPhotoCamera /></button>
              ):(
                <button className="btn btn-danger" title='Turn on Video' onClick={handlevid}><GiPhotoCamera /></button>
              )}

              {screen?(
                <button className="btn btn-dark" title='Stop Sharing' onClick={handlescreen}><GiVideoConference /></button>
              ):(
                <button className="btn btn-danger" title='Share Screen' onClick={handlescreen}><GiVideoConference /></button>
              )}

              {record?(
                <button className="btn btn-danger" title='Save Record' onClick={handlerecord}><GiCctvCamera /></button>
              ):(
                <button className="btn btn-dark" title='Record Screen' onClick={handlerecord}><GiCctvCamera /></button>
              )}
              
              {chat?(
                <>
                <button className="btn btn-light" title='Close Chat' onClick={handlechat}><GiChatBubble /></button>
                </>
              ):(
                <button className="btn btn-dark" title='Chat with others' onClick={handlechat}><GiChatBubble /></button>
              )}
              
            </div>
          </div>
        </div>
        <div className='chat'>
        {chat?(
          <Chat messages={messages} sendMessage={sendMessage} />
        ):""}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Meeting;
