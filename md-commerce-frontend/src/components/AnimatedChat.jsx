import React, { useState, useEffect, useRef } from 'react';
import './AnimatedChat.css';
import BusinessProfileForm from './BusinessProfileForm';
import GrantsTable from './GrantsTable';

const AnimatedChat = ({ query, tool, response, isProcessing, onNewSession, onProfileSubmit, onContactRequest, flowStep }) => {
  // Initial profile response state
  const [showInitialResponse, setShowInitialResponse] = useState(false);
  const [initialToolCompleted, setInitialToolCompleted] = useState(false);
  
  // Grants state
  const [showGrantsSection, setShowGrantsSection] = useState(false);
  const [grantsToolCompleted, setGrantsToolCompleted] = useState(false);
  const [showGrantsResponse, setShowGrantsResponse] = useState(false);
  
  // Contact state
  const [showContactSection, setShowContactSection] = useState(false);
  const [contactToolCompleted, setContactToolCompleted] = useState(false);
  const [showContactResponse, setShowContactResponse] = useState(false);
  
  // Refs
  const chatContentRef = useRef(null);
  const responseEndRef = useRef(null);
  const grantsToolRef = useRef(null);
  const contactToolRef = useRef(null);
  const initialResponseRef = useRef(null);
  const grantsResponseRef = useRef(null);

  // Handle initial profile flow
  useEffect(() => {
    if (flowStep === 'profile' && !isProcessing && response) {
      setTimeout(() => {
        setInitialToolCompleted(true);
        setTimeout(() => {
          setShowInitialResponse(true);
          // Scroll to initial response when it appears
          setTimeout(() => {
            if (initialResponseRef.current) {
              initialResponseRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100);
        }, 500);
      }, 500);
    }
  }, [flowStep, isProcessing, response]);

  // Handle grants flow - show tool immediately
  useEffect(() => {
    if (flowStep === 'grants') {
      setShowGrantsSection(true);
      // Scroll to grants tool immediately
      setTimeout(() => {
        if (grantsToolRef.current) {
          grantsToolRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [flowStep]);

  // Handle grants completion separately
  useEffect(() => {
    if (flowStep === 'grants' && !isProcessing && response?.showGrantsTable) {
      setTimeout(() => {
        setGrantsToolCompleted(true);
        setTimeout(() => {
          setShowGrantsResponse(true);
          // Scroll to grants table when it appears
          setTimeout(() => {
            if (grantsResponseRef.current) {
              grantsResponseRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }, 500);
      }, 500);
    }
  }, [flowStep, isProcessing, response]);

  // Handle contact flow - show tool immediately
  useEffect(() => {
    if (flowStep === 'contact') {
      setShowContactSection(true);
      // Scroll to contact tool when it appears
      setTimeout(() => {
        if (contactToolRef.current) {
          contactToolRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [flowStep]);

  // Handle contact completion separately
  useEffect(() => {
    if (flowStep === 'contact' && !isProcessing && response?.type === 'contact') {
      setTimeout(() => {
        setContactToolCompleted(true);
        setTimeout(() => {
          setShowContactResponse(true);
          // Auto-scroll to bottom when contact info loads
          setTimeout(() => {
            if (responseEndRef.current) {
              responseEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
          }, 100);
        }, 500);
      }, 500);
    }
  }, [flowStep, isProcessing, response]);

  const formatContent = (content) => {
    // Convert markdown-style formatting to HTML
    let formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
    
    // Handle lists
    formatted = formatted.replace(/- (.*?)(<br \/>|$)/g, '<li>$1</li>');
    if (formatted.includes('<li>')) {
      formatted = formatted.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
      formatted = formatted.replace(/<\/ul><ul>/g, '');
    }
    
    return { __html: formatted };
  };

  return (
    <div className="animated-chat">
      <button className="new-session-btn" onClick={onNewSession}>
        <span className="icon">arrow_back</span>
        <span>New Session</span>
      </button>

      <div className="chat-content" ref={chatContentRef}>
        {/* User Query - Always visible */}
        <div className="user-query-container fade-in">
          <div className="user-query glossy-box">
            <span className="query-icon icon">person</span>
            <p className="query-text">{query}</p>
          </div>
        </div>

        {/* Initial Tool Indicator - Show immediately when processing starts */}
        {(isProcessing || flowStep) && (
          <div className={`tool-indicator ${isProcessing && (!flowStep || flowStep === 'profile') && !initialToolCompleted ? 'processing' : ''} ${initialToolCompleted ? 'completed' : ''}`}>
            <div className="tool-content">
              <span className="arrow-icon icon">arrow_downward</span>
              <div className="tool-info">
                <span className="tool-name">Business Profiling Tool</span>
                <div className="checkmark-container">
                  {isProcessing && (!flowStep || flowStep === 'profile') && !initialToolCompleted ? (
                    <div className="spinner"></div>
                  ) : initialToolCompleted ? (
                    <span className="checkmark icon">check_circle</span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Initial AI Response with Profile Form - Always visible once shown */}
        {showInitialResponse && flowStep && (
          <div className="response-container" ref={initialResponseRef}>
            <div className="response-box glossy-box expand-animation">
              <div className="response-header">
                <span className="response-icon">🦀</span>
                <span className="response-label">Commerce Assistant</span>
              </div>
              <div className="response-content">
                I'll help you find the best grants and incentives for your manufacturing company. Let me gather some information about your business to provide personalized recommendations.
              </div>
              
              {/* Business Profile Form */}
              <div className="form-container">
                <BusinessProfileForm onSubmit={onProfileSubmit} />
              </div>
            </div>
          </div>
        )}

        {/* Grants Tool Indicator - Shows after profile submission */}
        {showGrantsSection && (
          <div 
            ref={grantsToolRef}
            className={`tool-indicator grants-tool ${isProcessing && flowStep === 'grants' && !grantsToolCompleted ? 'processing' : ''} ${grantsToolCompleted ? 'completed' : ''}`}
          >
            <div className="tool-content">
              <span className="arrow-icon icon">arrow_downward</span>
              <div className="tool-info">
                <span className="tool-name">Incentive Search Tool</span>
                <div className="checkmark-container">
                  {isProcessing && flowStep === 'grants' && !grantsToolCompleted ? (
                    <div className="spinner"></div>
                  ) : grantsToolCompleted ? (
                    <span className="checkmark icon">check_circle</span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grants Response and Table - Shows after grants search completes */}
        {showGrantsResponse && (
          <>
            <div className="response-container grants-response">
              <div className="response-box glossy-box expand-animation">
                <div className="response-header">
                  <span className="response-icon">🦀</span>
                  <span className="response-label">Commerce Assistant</span>
                </div>
                <div className="response-content">
                  Based on your business profile, I found several matching grant opportunities.
                </div>
              </div>
            </div>
            
            <div className="grants-container" ref={grantsResponseRef}>
              <GrantsTable onContactClick={onContactRequest} />
            </div>
          </>
        )}

        {/* Contact Tool Indicator - Shows after clicking contact */}
        {showContactSection && (
          <div 
            ref={contactToolRef}
            className={`tool-indicator contact-tool ${isProcessing && flowStep === 'contact' && !contactToolCompleted ? 'processing' : ''} ${contactToolCompleted ? 'completed' : ''}`}
          >
            <div className="tool-content">
              <span className="arrow-icon icon">arrow_downward</span>
              <div className="tool-info">
                <span className="tool-name">Contact Lookup Tool</span>
                <div className="checkmark-container">
                  {isProcessing && flowStep === 'contact' && !contactToolCompleted ? (
                    <div className="spinner"></div>
                  ) : contactToolCompleted ? (
                    <span className="checkmark icon">check_circle</span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Response - Shows after contact lookup completes */}
        {showContactResponse && response?.type === 'contact' && (
          <div className="response-container contact-response">
            <div className="response-box glossy-box fade-from-top">
              <div className="response-header">
                <span className="response-icon">🦀</span>
                <span className="response-label">Commerce Assistant</span>
              </div>
              <div className="response-content" dangerouslySetInnerHTML={formatContent(response.content)} />
              
              {response.highlights && response.highlights.length > 0 && (
                <div className="highlights-section">
                  <p className="highlights-label">Key Insights:</p>
                  <div className="highlights-list">
                    {response.highlights.map((highlight, index) => (
                      <div key={index} className="highlight-item">
                        <span className="highlight-icon icon">auto_awesome</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div ref={responseEndRef} />
      </div>
    </div>
  );
};

export default AnimatedChat;
