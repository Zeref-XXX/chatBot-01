import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const apiUrl = "https://backend-two-flame-20.vercel.app/api/chat";

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Nezuko, your cute cat assistant! Meow 🐾 How can I help you today?", sender: 'bot' }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [avatarExpression, setAvatarExpression] = useState('normal');
  const [showMeow, setShowMeow] = useState(false);
  const messagesEndRef = useRef(null);
  const blinkInterval = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    
    // Set up blinking animation
    blinkInterval.current = setInterval(() => {
      setAvatarExpression('blink');
      setTimeout(() => setAvatarExpression('normal'), 200);
    }, 3000);
    
    return () => clearInterval(blinkInterval.current);
  }, []);

  useEffect(() => {
    if (isLoading) {
      setAvatarExpression('thinking');
    } else if (messages.length > 1 && messages[messages.length - 1].sender === 'bot') {
      setAvatarExpression('happy');
      setTimeout(() => setAvatarExpression('normal'), 2000);
    }
  }, [isLoading, messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    setAvatarExpression('listening');
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
      setAvatarExpression('confused');
      setMessages(prev => [...prev, {
        text: "Sorry, I'm having trouble connecting. Nya~ 😿",
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  const handleAvatarClick = () => {
    setShowMeow(true);
    setAvatarExpression('happy');
    setTimeout(() => {
      setShowMeow(false);
      setAvatarExpression('normal');
    }, 1500);
  };

  // Sample quick questions
  const quickQuestions = [
    "What can you do?",
    "Tell me about yourself",
    "How do I use this?",
    "Show me cat facts!"
  ];

  return (
    <div className="chatbot-fullscreen">
      <div className="chatbot-container">
        <div className="chat-header">
          <div className="header-content">
            <div className="cat-avatar" onClick={handleAvatarClick}>
              <div className="cat-ears">
                <div className={`ear left-ear ${avatarExpression}`}></div>
                <div className={`ear right-ear ${avatarExpression}`}></div>
              </div>
              <div className="face">
                <div className="eyes">
                  <div className={`eye left-eye ${avatarExpression}`}></div>
                  <div className={`eye right-eye ${avatarExpression}`}></div>
                </div>
                <div className={`nose ${avatarExpression}`}></div>
                <div className={`mouth ${avatarExpression}`}></div>
              </div>
              {showMeow && <div className="meow-bubble">Meow!</div>}
            </div>
            <div className="header-text">
              <h1>Nezuko Chat</h1>
              <p>Your friendly cat assistant</p>
              <div className="status">
                <span className="status-indicator online"></span>
                <span>Online</span>
              </div>
            </div>
          </div>
          <div className="decorations">
            <div className="decoration paw">🐾</div>
            <div className="decoration fish">🐟</div>
            <div className="decoration ball">🎾</div>
          </div>
        </div>

        <div className="chat-content">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender} ${index === 0 ? 'first-message' : ''}`}
              >
                {msg.sender === 'bot' && <div className="avatar">🐱</div>}
                <div className="bubble">{msg.text}</div>
                {msg.sender === 'user' && <div className="avatar">👤</div>}
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

          <div className="chat-sidebar">
            <div className="sidebar-section">
              <h2><i className="fas fa-lightbulb"></i> Quick Questions</h2>
              <div className="quick-questions">
                {quickQuestions.map((question, index) => (
                  <button 
                    key={index} 
                    className="action-btn"
                    onClick={() => setInputValue(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="sidebar-section">
              <h2><i className="fas fa-paw"></i> About Nezuko</h2>
              <p>I'm a cute cat AI assistant who loves to help! Ask me anything, and I'll do my best to assist you. Nya~ 🐾</p>
            </div>
            
            <div className="cat-fact">
              <h3><i className="fas fa-star"></i> Did you know?</h3>
              <p>Cats can rotate their ears 180 degrees to pinpoint the source of a sound!</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="chat-input">
          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message to Nezuko..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading} className="send-btn">
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                <i className="fas fa-paper-plane"></i>
              )}
            </button>
          </div>
          <div className="hint">Press Enter to send, Shift+Enter for new line</div>
        </form>
      </div>
      
      <div className="background-elements">
        <div className="bg-element cat-silhouette"></div>
        <div className="bg-element fish"></div>
        <div className="bg-element paw-print"></div>
        <div className="bg-element paw-print"></div>
        <div className="bg-element paw-print"></div>
      </div>
    </div>
  );
}

export default Chatbot;