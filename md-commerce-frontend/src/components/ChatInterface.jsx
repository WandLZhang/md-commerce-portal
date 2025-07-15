import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import LoadingIndicator from './LoadingIndicator';

const ChatInterface = ({ messages, onSendMessage, isLoading }) => {
  const messagesEndRef = useRef(null);
  const [selectedPrompt, setSelectedPrompt] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get suggested prompts from the latest AI message
  const getSuggestedPrompts = () => {
    const lastAiMessage = [...messages].reverse().find(msg => msg.type === 'ai' && msg.metadata?.suggestedPrompts);
    return lastAiMessage?.metadata?.suggestedPrompts || [];
  };

  const handlePromptClick = (prompt) => {
    setSelectedPrompt(prompt);
  };

  const handleSendMessage = (message) => {
    setSelectedPrompt(''); // Clear selected prompt after sending
    onSendMessage(message);
  };

  const suggestedPrompts = getSuggestedPrompts();

  return (
    <div className="chat-interface">
      <div className="messages-container">
        {messages.map((message, index) => (
          <MessageBubble 
            key={index} 
            message={message}
          />
        ))}
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Suggested Prompts */}
      {suggestedPrompts.length > 0 && !isLoading && (
        <div className="suggested-prompts-container">
          <p className="suggested-prompts-label">Suggested actions:</p>
          <div className="suggested-prompts">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                className="suggested-prompt-chip"
                onClick={() => handlePromptClick(prompt)}
              >
                {prompt}
                <span className="icon">arrow_forward</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      <ChatInput 
        onSendMessage={handleSendMessage} 
        disabled={isLoading}
        value={selectedPrompt}
      />
    </div>
  );
};

export default ChatInterface;
