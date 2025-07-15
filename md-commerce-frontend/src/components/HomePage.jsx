import React, { useState } from 'react';
import './HomePage.css';

const HomePage = ({ onStartChat }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleGetStarted = () => {
    setShowOptions(true);
  };

  const examplePrompts = [
    {
      title: 'Grants, Credits, and Incentives',
      icon: 'payments',
      prompt: "I'm a manufacturing company looking for site grants, workforce, and incentives assistance",
    },
    {
      title: 'Application Help',
      icon: 'description',
      prompt: "How do I apply for all credits related to manufacturing county and state?",
    },
    {
      title: 'Contact a Specialist',
      icon: 'support_agent',
      prompt: "Who should I contact for business assistance?",
    }
  ];

  return (
    <div className="home-page">
      <div className="home-content">
        {!showOptions ? (
          <div className="welcome-container fade-in">
            <h1 className="welcome-title glossy-text">
              Maryland Commerce Portal
            </h1>
            <p className="welcome-subtitle">
              Your AI-powered gateway to business growth
            </p>
            <button 
              className="get-started-btn glossy-button"
              onClick={handleGetStarted}
            >
              <span>Get Started</span>
              <span className="icon">arrow_forward</span>
            </button>
          </div>
        ) : (
          <div className="options-container fade-in">
            <h2 className="options-title glossy-text">How can I help you today?</h2>
            <div className="prompt-chips">
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  className="prompt-chip glossy-chip"
                  onClick={() => onStartChat(prompt.prompt)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="chip-icon icon">{prompt.icon}</span>
                  <span className="chip-text">{prompt.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
