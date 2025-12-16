import { useState } from 'react';
import { 
  User, 
  Mail, 
  Clock, 
  FileText,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import './ApprovalFlow.css';

const ApprovalFlow = ({ approvalInfo }) => {
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [justification, setJustification] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!selectedSupervisor || !justification.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="approval-success">
        <div className="success-icon">
          <CheckCircle size={48} />
        </div>
        <h3>Approval Request Submitted!</h3>
        <p>Your request has been sent to <strong>{selectedSupervisor?.name}</strong>.</p>
        <p className="eta">Expected response time: {approvalInfo?.estimatedTime || '24-48 hours'}</p>
        <button className="view-status-btn">
          View Request Status
          <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="approval-flow">
      <div className="approval-header">
        <div className="approval-icon">
          <FileText size={20} />
        </div>
        <div>
          <h3>Request Approval</h3>
          <p>Submit a request for out-of-policy travel</p>
        </div>
      </div>

      {/* Supervisor Selection */}
      <div className="approval-section">
        <h4>Select Approver</h4>
        <div className="supervisor-list">
          {approvalInfo?.supervisors?.map((supervisor, index) => (
            <button
              key={index}
              className={`supervisor-card ${selectedSupervisor?.email === supervisor.email ? 'selected' : ''}`}
              onClick={() => setSelectedSupervisor(supervisor)}
            >
              <div className="supervisor-avatar">
                <User size={20} />
              </div>
              <div className="supervisor-info">
                <span className="supervisor-name">{supervisor.name}</span>
                <span className="supervisor-role">{supervisor.role}</span>
              </div>
              {selectedSupervisor?.email === supervisor.email && (
                <CheckCircle size={18} className="check-icon" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Justification */}
      <div className="approval-section">
        <h4>
          Justification
          {approvalInfo?.requiredJustification && <span className="required">*Required</span>}
        </h4>
        <textarea
          placeholder="Please explain why this booking is necessary and why policy-compliant alternatives won't work..."
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
          rows={4}
        />
        <div className="char-count">
          {justification.length}/500 characters
        </div>
      </div>

      {/* Info */}
      <div className="approval-info">
        <div className="info-item">
          <Clock size={16} />
          <span>Estimated response time: <strong>{approvalInfo?.estimatedTime || '24-48 hours'}</strong></span>
        </div>
        <div className="info-item">
          <Mail size={16} />
          <span>You'll receive an email notification when approved</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        className={`submit-btn ${selectedSupervisor && justification.trim() ? 'active' : ''}`}
        onClick={handleSubmit}
        disabled={!selectedSupervisor || !justification.trim() || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="spinner"></span>
            Submitting...
          </>
        ) : (
          <>
            <Send size={18} />
            Submit Approval Request
          </>
        )}
      </button>

      {/* Warning */}
      <div className="approval-warning">
        <AlertCircle size={16} />
        <span>Do not book until approval is received. Unapproved expenses may not be reimbursed.</span>
      </div>
    </div>
  );
};

export default ApprovalFlow;
