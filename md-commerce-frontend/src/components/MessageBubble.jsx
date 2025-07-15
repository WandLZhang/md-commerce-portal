import React from 'react';

const MessageBubble = ({ message }) => {
  const formatContent = (content) => {
    // Convert markdown-style formatting to HTML
    let formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
    
    // Handle lists
    formatted = formatted.replace(/- (.*?)(<br \/>|$)/g, '<li>$1</li>');
    if (formatted.includes('<li>')) {
      formatted = formatted.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
      // Clean up multiple ul tags
      formatted = formatted.replace(/<\/ul><ul>/g, '');
    }
    
    return { __html: formatted };
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={`message-wrapper ${message.type}`}>
      <div className={`message-bubble ${message.type} ${message.error ? 'error' : ''}`}>
        <div className="message-content" dangerouslySetInnerHTML={formatContent(message.content)} />
        {message.metadata?.suggestedPrograms && (
          <div className="suggested-programs">
            <p className="suggestions-label">Related Programs:</p>
            <div className="program-chips">
              {message.metadata.suggestedPrograms.map((program, index) => (
                <span key={index} className="program-chip">{program}</span>
              ))}
            </div>
          </div>
        )}
        {message.metadata?.grants && (
          <div className="grants-info">
            <p className="grants-label">Quick Actions:</p>
            <div className="action-buttons">
              <button className="action-button">View All Grants</button>
              <button className="action-button">Start Application</button>
            </div>
          </div>
        )}
        <div className="message-time">{formatTime(message.timestamp)}</div>
      </div>
    </div>
  );
};

export default MessageBubble;
