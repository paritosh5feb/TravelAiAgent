import { 
  Plane, 
  Hotel, 
  Clock, 
  Shield,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import './PolicyInfo.css';

const PolicyInfo = ({ policyDetails }) => {
  if (!policyDetails) return null;

  const formatClasses = (classes) => {
    return classes.map(c => 
      c.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
    ).join(', ');
  };

  return (
    <div className="policy-info-card">
      <div className="policy-header">
        <Shield size={20} />
        <h3>Travel Policy Summary</h3>
      </div>

      <div className="policy-grid">
        <div className="policy-item">
          <div className="policy-icon flight">
            <Plane size={18} />
          </div>
          <div className="policy-content">
            <span className="policy-label">Maximum Flight Budget</span>
            <span className="policy-value">${policyDetails.flightBudget}</span>
            <span className="policy-note">Per trip, round-trip included</span>
          </div>
        </div>

        <div className="policy-item">
          <div className="policy-icon hotel">
            <Hotel size={18} />
          </div>
          <div className="policy-content">
            <span className="policy-label">Maximum Hotel Rate</span>
            <span className="policy-value">${policyDetails.hotelBudget}/night</span>
            <span className="policy-note">Standard room rate</span>
          </div>
        </div>

        <div className="policy-item">
          <div className="policy-icon class">
            <CheckCircle size={18} />
          </div>
          <div className="policy-content">
            <span className="policy-label">Allowed Flight Classes</span>
            <span className="policy-value">{formatClasses(policyDetails.allowedClasses)}</span>
            <span className="policy-note">Business class requires approval for flights &lt;6 hours</span>
          </div>
        </div>

        <div className="policy-item">
          <div className="policy-icon time">
            <Clock size={18} />
          </div>
          <div className="policy-content">
            <span className="policy-label">Advance Booking</span>
            <span className="policy-value">{policyDetails.advanceBooking} days minimum</span>
            <span className="policy-note">Exceptions require supervisor approval</span>
          </div>
        </div>
      </div>

      <div className="policy-footer">
        <div className={`approval-status ${policyDetails.requiresApproval ? 'required' : 'not-required'}`}>
          {policyDetails.requiresApproval ? (
            <>
              <AlertCircle size={16} />
              <span>Pre-approval required for all bookings</span>
            </>
          ) : (
            <>
              <CheckCircle size={16} />
              <span>Self-booking allowed within policy limits</span>
            </>
          )}
        </div>
      </div>

      <div className="policy-tips">
        <h4>💡 Tips for Policy-Compliant Booking</h4>
        <ul>
          <li>Book flights at least {policyDetails.advanceBooking} days in advance for better rates</li>
          <li>Choose hotels with breakfast included to maximize value</li>
          <li>Consider nearby airports for potentially lower fares</li>
          <li>Use preferred vendors for additional discounts</li>
        </ul>
      </div>
    </div>
  );
};

export default PolicyInfo;
