import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import FlightCard from '../travel/FlightCard';
import HotelCard from '../travel/HotelCard';
import PolicyInfo from '../travel/PolicyInfo';
import ApprovalFlow from '../travel/ApprovalFlow';
import { 
  Bot, 
  User, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  RefreshCw,
  AlertTriangle,
  Info,
  Car
} from 'lucide-react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const { user, company } = useAuth();
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  const renderContent = () => {
    switch (message.type) {
      case 'travel_recommendation':
        return (
          <div className="message-travel-content">
            <p className="message-text">{message.content}</p>
            
            {message.trafficInfo && (
              <div className={`traffic-info ${message.trafficInfo.status}`}>
                <Car size={18} />
                <span>{message.trafficInfo.note}</span>
              </div>
            )}
            
            <div className="recommendations-list">
              {message.recommendations?.map((rec) => (
                rec.type === 'flight' ? (
                  <FlightCard key={rec.id} flight={rec} />
                ) : (
                  <HotelCard key={rec.id} hotel={rec} />
                )
              ))}
            </div>
          </div>
        );

      case 'hotel_recommendation':
        return (
          <div className="message-travel-content">
            <p className="message-text">{message.content}</p>
            <div className="recommendations-list">
              {message.recommendations?.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </div>
        );

      case 'policy_info':
        return (
          <div className="message-policy-content">
            <p className="message-text">{message.content}</p>
            <PolicyInfo policyDetails={message.policyDetails} />
          </div>
        );

      case 'approval_flow':
        return (
          <div className="message-approval-content">
            <p className="message-text">{message.content}</p>
            <ApprovalFlow approvalInfo={message.approvalInfo} />
          </div>
        );

      case 'schedule_info':
        return (
          <div className="message-schedule-content">
            <p className="message-text">{message.content}</p>
            {message.scheduleAnalysis?.conflicts?.length > 0 && (
              <div className="schedule-conflicts">
                <AlertTriangle size={18} />
                <span>Conflicts found with your schedule</span>
              </div>
            )}
            <div className="schedule-recommendations">
              <h4>Recommendations:</h4>
              <ul>
                {message.scheduleAnalysis?.recommendations?.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="message-error-content">
            <AlertTriangle size={18} />
            <p>{message.content}</p>
          </div>
        );

      case 'text':
      default:
        return (
          <div className="message-text-content">
            <div 
              className="message-text" 
              dangerouslySetInnerHTML={{ 
                __html: message.content
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/•/g, '<br/>•')
                  .replace(/\n/g, '<br/>')
              }} 
            />
          </div>
        );
    }
  };

  return (
    <div className={`chat-message ${isUser ? 'user' : 'assistant'}`}>
      <div className="message-avatar">
        {isUser ? (
          <img src={user?.avatar} alt={user?.name || 'User'} />
        ) : (
          <img src={company?.logo} alt="Assistant" />
        )}
      </div>

      <div className="message-content">
        <div className="message-header">
          <span className="message-sender">
            {isUser ? user?.name || 'You' : `${company?.name || 'Travel'} Assistant`}
          </span>
          <span className="message-time">
            {format(new Date(message.timestamp), 'h:mm a')}
          </span>
        </div>

        <div className="message-body">
          {renderContent()}
        </div>

        {!isUser && message.type !== 'error' && (
          <div className="message-actions">
            <button className="message-action" onClick={handleCopy} title="Copy">
              <Copy size={14} />
            </button>
            <button className="message-action" title="Good response">
              <ThumbsUp size={14} />
            </button>
            <button className="message-action" title="Bad response">
              <ThumbsDown size={14} />
            </button>
            <button className="message-action" title="Regenerate">
              <RefreshCw size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
