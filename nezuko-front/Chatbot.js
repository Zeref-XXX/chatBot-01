import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

// const apiUrl = "http://localhost:4000/api/chat";
const apiUrl = "https://backend-two-flame-20.vercel.app/api/chat";


function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "I'm Nezuko, the cutest chatbot! Meow 🐾 How can I help you today?", sender: 'bot' }
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
      const response = await fetch(`${apiUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue })
      });

      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.message, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        text: "Sorry, I'm having trouble connecting. Nya~ 😿",
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (text) => {
    setInputValue(text);
  };

  return (
    <div className="chatbot-fullscreen">
      <div className="chat-header">
        <div className="header-content">
          <div className="bot-avatar">
            <div className="cat-avatar">🐱</div>
          </div>
          <div className="header-text">
            <h1>Nezuko Chat</h1>
            <p>Your friendly cat assistant</p>
          </div>
          <div className="header-actions">
            <button className="icon-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        <div className="welcome-message">
          <div className="welcome-bubble">
            Hi! I'm Nezuko, your cute cat assistant. Ask me anything! 😺
          </div>
        </div>
        
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender}`}
          >
            <div className="avatar-container">
              <div className={`avatar ${msg.sender}`}>
                {msg.sender === 'bot' ? '🐱' : '👤'}
              </div>
            </div>
            <div className="bubble-container">
              <div className={`bubble ${msg.sender}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message bot">
            <div className="avatar-container">
              <div className="avatar bot">🐱</div>
            </div>
            <div className="bubble-container">
              <div className="bubble bot loading">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <div className="example-prompts">
          <button onClick={() => handleExampleClick("What can you do?")}>What can you do?</button>
          <button onClick={() => handleExampleClick("Tell me about Nezuko")}>Tell me about Nezuko</button>
          <button onClick={() => handleExampleClick("Show me cat facts")}>Show me cat facts</button>
          <button onClick={() => handleExampleClick("How are you today?")}>How are you today?</button>
        </div>
        
        <form onSubmit={handleSubmit} className="chat-input">
          <div className="input-wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Message Nezuko..."
              disabled={isLoading}
            />
            <button type="submit" className="send-button" disabled={isLoading}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </form>
        
        <div className="disclaimer">
          <p>Nezuko can make mistakes. Consider checking important information.</p>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;