import { useState, useRef, useEffect } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import AnimatedChat from './components/AnimatedChat';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentTool, setCurrentTool] = useState(null);
  const [response, setResponse] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [flowStep, setFlowStep] = useState(null);
  const [businessProfile, setBusinessProfile] = useState(null);

  const handleStartChat = async (initialMessage) => {
    setHasStarted(true);
    setCurrentQuery(initialMessage);
    setIsProcessing(true);
    
    // Determine which tool to use based on the query
    const tool = determineToolFromQuery(initialMessage);
    setCurrentTool(tool);
    
    // Simulate processing delay
    setTimeout(async () => {
      const responseData = await handleInteractionFlow(initialMessage);
      setResponse(responseData);
      setIsProcessing(false);
      
      // Set flow step for manufacturing query
      if (initialMessage.toLowerCase().includes('manufacturing') && initialMessage.toLowerCase().includes('looking for')) {
        setFlowStep('profile');
      }
    }, 2000);
  };

  const handleBusinessProfileSubmit = (profile) => {
    setBusinessProfile(profile);
    setIsProcessing(true);
    setCurrentTool('Incentive Search Tool');
    setFlowStep('grants');
    
    // Simulate processing
    setTimeout(() => {
      setResponse(prevResponse => ({
        ...prevResponse,
        type: 'grants',
        showGrantsTable: true,
        grantsContent: 'Based on your business profile, I found several matching grant opportunities.'
      }));
      setIsProcessing(false);
    }, 2000);
  };

  const handleContactRequest = () => {
    setIsProcessing(true);
    setCurrentTool('Contact Lookup Tool');
    setFlowStep('contact');
    
    // Simulate geolocation and processing
    setTimeout(() => {
      setResponse({
        type: 'contact',
        content: generateContactResponse(),
        highlights: [
          'Session geolocated to Montgomery County, MD',
          'Regional representative auto-matched',
          'Specialist expertise aligned with your profile',
          'Previous success: 95% application approval rate'
        ]
      });
      setIsProcessing(false);
    }, 2000);
  };

  const determineToolFromQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('manufacturing') && lowerQuery.includes('looking for')) {
      return 'Business Profiling Tool';
    } else if (lowerQuery.includes('contact') || lowerQuery.includes('who should i')) {
      return 'Contact Lookup Tool';
    } else if (lowerQuery.includes('apply') || lowerQuery.includes('application')) {
      return 'Application Assistant Tool';
    }
    return 'General Query Tool';
  };

  const generateContactResponse = () => {
    return `I've located the best specialist for your needs based on your location and business profile.

**Your Regional Representative:**
**Dr. Jennifer Liu**
Tech Innovation Director
Montgomery County Economic Development

**Areas of Expertise:**
- Technology and Software incentives
- Cybersecurity investment programs
- Innovation and R&D grants
- Manufacturing tax credits
- Tech workforce development

**Contact Information:**
- 📧 **Email:** jliu@maryland.commerce.gov
- 📞 **Phone:** (301) 555-0123
- 🕐 **Office Hours:** Monday-Friday 9:00 AM - 5:00 PM EST
- 📍 **Location:** 401 E Pratt St, Baltimore, MD 21202

**Specialist Qualifications:**
- Ph.D. in Technology Policy from Johns Hopkins
- 15+ years in economic development
- Successfully assisted 200+ tech companies
- **95% grant application approval rate**

**Geographic Coverage:**
- Primary: Montgomery County
- Secondary: Prince George's, Frederick Counties

**Recent Success Stories:**
- Helped a cybersecurity startup secure $500K in grants
- Assisted 12 tech companies with site selection in 2024
- Facilitated $15M in tax credits for tech manufacturing

**Available Meeting Times This Week:**
- Tuesday, 7/16: 2:00 PM - 4:00 PM
- Thursday, 7/18: 10:00 AM - 12:00 PM
- Friday, 7/19: 1:00 PM - 3:00 PM

Would you like to schedule a consultation with Dr. Liu?`;
  };

  const handleInteractionFlow = async (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('manufacturing') && lowerMessage.includes('looking for')) {
      return {
        type: 'profile',
        content: `I'll help you find the best grants and incentives for your manufacturing company. Let me gather some information about your business to provide personalized recommendations.`,
        showProfileForm: true
      };
    } else if (lowerMessage.includes('contact')) {
      return {
        type: 'contact',
        content: generateContactResponse(),
        highlights: [
          'Session geolocated to Montgomery County, MD',
          'Regional representative auto-matched',
          'Specialist expertise aligned with your profile',
          'Previous success: 95% application approval rate'
        ]
      };
    } else if (lowerMessage.includes('apply')) {
      return {
        content: `I'll guide you through the application process for manufacturing-related credits.

**Step 1: Determine Eligibility** ✓
Based on your profile, you qualify for:
- Manufacturing Investment Tax Credit
- R&D Tax Credit (high compatibility with tech profile)
- Montgomery County-specific programs
- Job Creation Tax Credit

**Step 2: Required Documents**
- Business registration certificate
- Financial statements (last 2 years)
- Employee count verification
- Investment plans and projections

**Step 3: Application Timeline**
- Initial review: 5-7 business days
- Full approval: 30-45 days
- Funds disbursement: 60-90 days`,
        highlights: [
          'Multi-step process guidance',
          'R&D credit ranked high due to tech profile',
          'Montgomery-specific programs highlighted'
        ]
      };
    }
    
    return {
      content: 'How can I help you today?',
      highlights: []
    };
  };

  const handleNewSession = () => {
    setHasStarted(false);
    setCurrentQuery('');
    setCurrentTool(null);
    setResponse(null);
    setIsProcessing(false);
    setFlowStep(null);
    setBusinessProfile(null);
  };

  return (
    <div className="app">
      <div className="app-animated-background">
        <div className="gradient-layer-1"></div>
        <div className="gradient-layer-2"></div>
        <div className="gradient-layer-3"></div>
      </div>
      <div className="app-content">
        {!hasStarted ? (
          <HomePage onStartChat={handleStartChat} />
        ) : (
          <AnimatedChat
            query={currentQuery}
            tool={currentTool}
            response={response}
            isProcessing={isProcessing}
            onNewSession={handleNewSession}
            onProfileSubmit={handleBusinessProfileSubmit}
            onContactRequest={handleContactRequest}
            flowStep={flowStep}
          />
        )}
      </div>
    </div>
  );
}

export default App;
