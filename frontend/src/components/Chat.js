// Chat.js
import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    setMessages([...messages, { text: message, sender: 'student' }]);
    setMessage('');
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((msg, idx) => (
          <div key={idx}>{msg.sender}: {msg.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
