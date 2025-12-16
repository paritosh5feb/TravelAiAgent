import { useAuth } from '../../contexts/AuthContext';
import { 
  Plane, 
  Hotel, 
  FileText, 
  Clock, 
  MapPin, 
  Shield,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onSendMessage }) => {
  const { user, company } = useAuth();

  const suggestedPrompts = [
    {
      icon: <Plane size={20} />,
      title: "Book a flight",
      description: "Find flights within company policy",
      prompt: "I need to book a flight from San Francisco to New York next week for a business meeting"
    },
    {
      icon: <Hotel size={20} />,
      title: "Find accommodation",
      description: "Search hotels near your destination",
      prompt: "Can you help me find a hotel in Manhattan for 3 nights, close to Times Square?"
    },
    {
      icon: <FileText size={20} />,
      title: "Check travel policy",
      description: "View your company's guidelines",
      prompt: "What is my company's travel policy for flights and hotels?"
    },
    {
      icon: <Clock size={20} />,
      title: "Plan my itinerary",
      description: "Optimize your travel schedule",
      prompt: "Help me plan a business trip to Chicago including flights, hotel, and ground transportation"
    }
  ];

  const features = [
    {
      icon: <Shield size={24} />,
      title: "Policy Compliant",
      description: "All recommendations follow your company's travel guidelines"
    },
    {
      icon: <MapPin size={24} />,
      title: "Traffic Aware",
      description: "Real-time traffic data for optimal travel planning"
    },
    {
      icon: <Sparkles size={24} />,
      title: "AI Powered",
      description: "Smart recommendations based on your preferences"
    }
  ];

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        {/* Hero Section */}
        <div className="welcome-hero">
          <div className="welcome-logo">
            <img 
              src={company?.logo} 
              alt={company?.name || 'Company'} 
            />
          </div>
          <h1 className="welcome-title">
            Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
          </h1>
          <p className="welcome-subtitle">
            I'm your AI travel assistant for <strong>{company?.name || 'your company'}</strong>. 
            I can help you book flights, find hotels, and plan your business trips 
            while keeping you within company policy.
          </p>
        </div>

        {/* Suggested Prompts */}
        <div className="suggested-prompts">
          <h2 className="prompts-title">How can I help you today?</h2>
          <div className="prompts-grid">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                className="prompt-card"
                onClick={() => onSendMessage(prompt.prompt)}
              >
                <div className="prompt-icon">{prompt.icon}</div>
                <div className="prompt-content">
                  <h3>{prompt.title}</h3>
                  <p>{prompt.description}</p>
                </div>
                <ArrowRight size={16} className="prompt-arrow" />
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="welcome-features">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon" style={{ color: 'var(--company-color)' }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Policy Summary */}
        {company?.policy && (
          <div className="policy-summary">
            <h3>Your Travel Policy at a Glance</h3>
            <div className="policy-items">
              <div className="policy-item">
                <span className="policy-label">Flight Budget</span>
                <span className="policy-value">${company.policy.maxFlightBudget}</span>
              </div>
              <div className="policy-item">
                <span className="policy-label">Hotel/Night</span>
                <span className="policy-value">${company.policy.maxHotelBudget}</span>
              </div>
              <div className="policy-item">
                <span className="policy-label">Allowed Classes</span>
                <span className="policy-value">
                  {company.policy.allowedClasses.map(c => 
                    c.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
                  ).join(', ')}
                </span>
              </div>
              <div className="policy-item">
                <span className="policy-label">Advance Booking</span>
                <span className="policy-value">{company.policy.advanceBookingDays} days</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
