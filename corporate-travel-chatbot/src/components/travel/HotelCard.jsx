import { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Star, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  Wifi,
  Dumbbell,
  Coffee,
  Car,
  ChevronDown,
  ChevronUp,
  Navigation,
  Info
} from 'lucide-react';
import './HotelCard.css';

const amenityIcons = {
  'WiFi': <Wifi size={14} />,
  'Gym': <Dumbbell size={14} />,
  'Restaurant': <Coffee size={14} />,
  'Business Center': <Building size={14} />,
  'Pool': <span>🏊</span>,
  'Spa': <span>💆</span>,
  'Fine Dining': <span>🍽️</span>,
  'Concierge': <span>🛎️</span>
};

const HotelCard = ({ hotel }) => {
  const [expanded, setExpanded] = useState(false);

  const getPolicyStatus = () => {
    if (hotel.policyCompliant) {
      return {
        icon: <CheckCircle size={16} />,
        text: 'Policy Compliant',
        class: 'compliant'
      };
    }
    return {
      icon: <XCircle size={16} />,
      text: 'Exceeds Budget',
      class: 'non-compliant'
    };
  };

  const policyStatus = getPolicyStatus();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" size={14} fill="#fbbf24" color="#fbbf24" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
    }

    return stars;
  };

  return (
    <div className={`hotel-card ${policyStatus.class}`}>
      <div className="hotel-header">
        <div className="hotel-info">
          <div className="hotel-icon">
            <Building size={20} />
          </div>
          <div className="hotel-details">
            <h3 className="hotel-name">{hotel.name}</h3>
            <div className="hotel-location">
              <MapPin size={14} />
              <span>{hotel.location}</span>
            </div>
          </div>
        </div>
        
        <div className={`policy-badge ${policyStatus.class}`}>
          {policyStatus.icon}
          <span>{policyStatus.text}</span>
        </div>
      </div>

      <div className="hotel-rating">
        <div className="stars">
          {renderStars(hotel.rating)}
        </div>
        <span className="rating-value">{hotel.rating}</span>
        <span className="rating-text">Excellent</span>
      </div>

      <div className="hotel-address">
        <Navigation size={14} />
        <span>{hotel.address}</span>
      </div>

      {/* Amenities */}
      <div className="hotel-amenities">
        {hotel.amenities.slice(0, 4).map((amenity, index) => (
          <div key={index} className="amenity-badge">
            {amenityIcons[amenity] || <CheckCircle size={14} />}
            <span>{amenity}</span>
          </div>
        ))}
        {hotel.amenities.length > 4 && (
          <div className="amenity-badge more">
            +{hotel.amenities.length - 4} more
          </div>
        )}
      </div>

      {/* Distance Info */}
      <div className="distance-info">
        <div className="distance-item">
          <Car size={16} />
          <div>
            <span className="label">Distance to office:</span>
            <span className="value">{hotel.distanceToOffice}</span>
          </div>
        </div>
        <div className="distance-item">
          <Navigation size={16} />
          <div>
            <span className="label">Commute time:</span>
            <span className="value">{hotel.commuteTime}</span>
          </div>
        </div>
      </div>

      {/* Policy Note */}
      {hotel.policyNote && (
        <div className="policy-note">
          <Info size={16} />
          <span>{hotel.policyNote}</span>
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
        <div className="hotel-details-expanded">
          <div className="detail-grid">
            <div className="detail-item">
              <span className="label">Check-in</span>
              <span className="value">3:00 PM</span>
            </div>
            <div className="detail-item">
              <span className="label">Check-out</span>
              <span className="value">11:00 AM</span>
            </div>
            <div className="detail-item">
              <span className="label">Cancellation</span>
              <span className="value">Free until 24h before</span>
            </div>
            <div className="detail-item">
              <span className="label">Breakfast</span>
              <span className="value">Included</span>
            </div>
          </div>
        </div>
      )}

      <div className="hotel-footer">
        <div className="price-info">
          <div className="price-per-night">
            <span className="amount">${hotel.pricePerNight}</span>
            <span className="period">/night</span>
          </div>
          <div className="total-price">
            {hotel.totalNights} nights · <strong>${hotel.totalPrice}</strong> total
          </div>
        </div>
        
        <div className="hotel-actions">
          {!hotel.policyCompliant && (
            <button className="action-btn secondary">
              Request Approval
            </button>
          )}
          <button className="action-btn primary">
            {hotel.policyCompliant ? 'Book Now' : 'Book with Approval'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
