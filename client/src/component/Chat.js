import React, { useState, useEffect, useRef } from 'react';
import './Chat.css'; // Import the CSS file

const Chat = ({ messages, sendMessage }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    sendMessage(input);
    setInput('');
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <p key={index} className="chat-message text-light">
            <span className="username">{message.username}</span>: {message.text}
          </p>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input className='form-control' placeholder='Enter Message' value={input} onChange={e => setInput(e.target.value)} />
        <button className='btn btn-dark' onClick={handleSend} disabled={input === ''}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
