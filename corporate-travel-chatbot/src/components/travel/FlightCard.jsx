import { useState } from 'react';
import { 
  Plane, 
  Clock, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Car,
  Leaf,
  Info
} from 'lucide-react';
import './FlightCard.css';

const FlightCard = ({ flight }) => {
  const [expanded, setExpanded] = useState(false);

  const getPolicyStatus = () => {
    if (flight.policyCompliant) {
      return {
        icon: <CheckCircle size={16} />,
        text: 'Policy Compliant',
        class: 'compliant'
      };
    }
    if (flight.policyNote?.includes('approval')) {
      return {
        icon: <AlertTriangle size={16} />,
        text: 'Requires Approval',
        class: 'warning'
      };
    }
    return {
      icon: <XCircle size={16} />,
      text: 'Not Compliant',
      class: 'non-compliant'
    };
  };

  const policyStatus = getPolicyStatus();

  return (
    <div className={`flight-card ${policyStatus.class}`}>
      <div className="flight-header">
        <div className="airline-info">
          <div className="airline-logo">
            <Plane size={20} />
          </div>
          <div className="airline-details">
            <span className="airline-name">{flight.airline}</span>
            <span className="flight-number">{flight.flightNumber}</span>
          </div>
        </div>
        
        <div className={`policy-badge ${policyStatus.class}`}>
          {policyStatus.icon}
          <span>{policyStatus.text}</span>
        </div>
      </div>

      <div className="flight-route">
        <div className="route-point departure">
          <span className="time">{flight.departure.time}</span>
          <span className="airport">{flight.departure.airport}</span>
          <span className="city">{flight.departure.city}</span>
        </div>

        <div className="route-line">
          <div className="route-duration">
            <Clock size={14} />
            <span>{flight.duration}</span>
          </div>
          <div className="line">
            <ArrowRight size={16} />
          </div>
        </div>

        <div className="route-point arrival">
          <span className="time">{flight.arrival.time}</span>
          <span className="airport">{flight.arrival.airport}</span>
          <span className="city">{flight.arrival.city}</span>
        </div>
      </div>

      <div className="flight-info-row">
        <div className="flight-class">
          <span className="label">Class:</span>
          <span className="value">{flight.class}</span>
        </div>
        <div className="flight-date">
          <span className="label">Date:</span>
          <span className="value">{flight.departure.date}</span>
        </div>
      </div>

      {/* Commute Info */}
      <div className="commute-info">
        <Car size={16} />
        <span>{flight.commuteFromAirport}</span>
      </div>

      {/* Policy Note */}
      {flight.policyNote && (
        <div className="policy-note">
          <Info size={16} />
          <span>{flight.policyNote}</span>
        </div>
      )}

      {/* Suggested Modification */}
      {flight.suggestedModification && (
        <div className="suggested-mod">
          <span>💡 Suggestion: {flight.suggestedModification}</span>
        </div>
      )}

      {/* Expandable Details */}
      <button 
        className="expand-btn"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        <span>{expanded ? 'Less details' : 'More details'}</span>
      </button>

      {expanded && (
        <div className="flight-details">
          <div className="detail-item">
            <Leaf size={16} />
            <span>Carbon offset: {flight.carbonOffset}</span>
          </div>
          <div className="detail-item">
            <Info size={16} />
            <span>Baggage: 1 carry-on, 1 checked bag included</span>
          </div>
        </div>
      )}

      <div className="flight-footer">
        <div className="price">
          <span className="amount">${flight.price}</span>
          <span className="label">per person</span>
        </div>
        
        <div className="flight-actions">
          {!flight.policyCompliant && (
            <button className="action-btn secondary">
              Request Approval
            </button>
          )}
          <button className="action-btn primary">
            {flight.policyCompliant ? 'Book Now' : 'Book with Approval'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
