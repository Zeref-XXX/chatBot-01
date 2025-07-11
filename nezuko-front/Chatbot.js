import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';


const apiUrl = "https://backend-two-flame-20.vercel.app/api/chat";

// const apiUrl="http://localhost:4000/";

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "I'm Nezuko cuteest one Meow 🐾", sender: 'bot' }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;


    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);


    try {
       
      // Send to backend API
      const response = await fetch(`${apiUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue })
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.message, sender: 'bot' }]);
      console.log(data.message)
    } catch (error) {
      setMessages(prev => [...prev, {
        text: "Sorry, I'm having trouble connecting. Nya~ 😿",
        // text : error.code.message,
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <h2>Nezuko Chat 🐱</h2>
        <div className="cat-ears">
          <div className="ear left-ear"></div>
          <div className="ear right-ear"></div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender}`}
          >
            {msg.sender === 'bot' && <div className="avatar">🐱</div>}
            <div className="bubble">{msg.text}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="avatar">🐱</div>
            <div className="bubble loading">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default Chatbot;
