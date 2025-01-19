import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import '../MessagePage/MessagePage.css'; // Ensure the correct relative path for CSS

import { FaComments } from 'react-icons/fa'; // Import the chat bubble icon from react-icons

const Chat = ({ room, userId }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [unreadMessages, setUnreadMessages] = useState(0);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Join room
    newSocket.emit('joinRoom', { room, userId });

    // Listen for incoming messages
    newSocket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
      setUnreadMessages((prev) => prev + 1);
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [room, userId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        room,
        message: newMessage,
        sender: userId,
        timestamp: new Date(),
      };

      // Emit message to server
      socket.emit('sendMessage', messageData);

      // Update local state
      setMessages((prev) => [...prev, messageData]);
      setNewMessage('');
    }
  };

  return (
    <div className="message-page-body">
      <div className="message-chat-container">
        <div className="chat-header">
          <h2>
            <FaComments style={{ marginRight: '10px' }} /> Let's Chat!
          </h2>
          <p className="catchy-line">Connect, Share, Learn!</p>
          {unreadMessages > 0 && <span className="unread-badge">{unreadMessages}</span>}
        </div>

        <div className="chat-body">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === userId ? 'my-message' : 'their-message'}`}
            >
              <p className="message-content">{msg.message}</p>
              <small className="message-timestamp">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </small>
            </div>
          ))}
        </div>

        <div className="chat-footer">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="message-input"
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="send-button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
