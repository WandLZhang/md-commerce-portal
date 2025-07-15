import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({ onSendMessage, disabled, value }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  // Update message when value prop changes
  useEffect(() => {
    if (value) {
      setMessage(value);
      // Focus the input when a prompt is selected
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about grants, incentives, site locations, or workforce programs..."
          className="chat-input"
          disabled={disabled}
          rows="1"
        />
        <button 
          type="submit" 
          className="send-button"
          disabled={disabled || !message.trim()}
        >
          <span className="icon">send</span>
        </button>
      </div>
      <div className="input-hints">
        <span className="hint">Try: "I'm a manufacturing company looking for site locations and grants"</span>
      </div>
    </form>
  );
};

export default ChatInput;
