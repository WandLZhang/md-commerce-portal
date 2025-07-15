import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="loading-indicator">
      <div className="typing-dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      <span className="loading-text">AI is thinking...</span>
    </div>
  );
};

export default LoadingIndicator;
