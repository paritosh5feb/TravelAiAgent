import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Plane, 
  Building2, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  AlertCircle,
  Loader2,
  Chrome
} from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
  const { loginWithGoogle, loginWithEmployeeId, loginWithEmail, isLoading, error, clearError } = useAuth();
  const [loginMethod, setLoginMethod] = useState('email'); // 'email', 'employee', 'google'
  const [email, setEmail] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    if (!email) {
      setLocalError('Please enter your email address');
      return;
    }
    if (!password) {
      setLocalError('Please enter your password');
      return;
    }
    
    await loginWithEmail(email, password);
  };

  const handleEmployeeLogin = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    if (!employeeId) {
      setLocalError('Please enter your employee ID');
      return;
    }
    if (!password) {
      setLocalError('Please enter your password');
      return;
    }
    
    await loginWithEmployeeId(employeeId, password);
  };

  const handleGoogleLogin = async () => {
    setLocalError('');
    // In production, this would use the actual Google OAuth flow
    await loginWithGoogle({ credential: 'mock_google_token' });
  };

  const switchMethod = (method) => {
    setLoginMethod(method);
    setLocalError('');
    clearError();
  };

  const displayError = localError || error;

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="login-background-gradient"></div>
        <div className="login-background-pattern"></div>
      </div>
      
      <div className="login-container">
        <div className="login-card">
          {/* Logo and Header */}
          <div className="login-header">
            <div className="login-logo">
              <Plane className="login-logo-icon" />
            </div>
            <h1 className="login-title">Corporate Travel Assistant</h1>
            <p className="login-subtitle">
              Your AI-powered companion for seamless business travel
            </p>
          </div>

          {/* Login Method Tabs */}
          <div className="login-tabs">
            <button 
              className={`login-tab ${loginMethod === 'email' ? 'active' : ''}`}
              onClick={() => switchMethod('email')}
            >
              <Mail size={18} />
              <span>Email</span>
            </button>
            <button 
              className={`login-tab ${loginMethod === 'employee' ? 'active' : ''}`}
              onClick={() => switchMethod('employee')}
            >
              <Building2 size={18} />
              <span>Employee ID</span>
            </button>
            <button 
              className={`login-tab ${loginMethod === 'google' ? 'active' : ''}`}
              onClick={() => switchMethod('google')}
            >
              <Chrome size={18} />
              <span>Google</span>
            </button>
          </div>

          {/* Error Display */}
          {displayError && (
            <div className="login-error">
              <AlertCircle size={18} />
              <span>{displayError}</span>
            </div>
          )}

          {/* Login Forms */}
          <div className="login-form-container">
            {loginMethod === 'email' && (
              <form className="login-form" onSubmit={handleEmailLogin}>
                <div className="form-group">
                  <label htmlFor="email">Corporate Email</label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" size={18} />
                    <input
                      type="email"
                      id="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <span className="form-hint">
                    Try: user@acme.com, user@techglobal.com, or user@innovate.com
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrapper">
                    <Lock className="input-icon" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="login-button primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span>Sign in with Email</span>
                  )}
                </button>
              </form>
            )}

            {loginMethod === 'employee' && (
              <form className="login-form" onSubmit={handleEmployeeLogin}>
                <div className="form-group">
                  <label htmlFor="employeeId">Employee ID</label>
                  <div className="input-wrapper">
                    <User className="input-icon" size={18} />
                    <input
                      type="text"
                      id="employeeId"
                      placeholder="e.g., ACM12345"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
                      disabled={isLoading}
                    />
                  </div>
                  <span className="form-hint">
                    Try: ACM12345 (Acme), TGL12345 (TechGlobal), or INV12345 (Innovate)
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="empPassword">Password</label>
                  <div className="input-wrapper">
                    <Lock className="input-icon" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="empPassword"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="login-button primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span>Sign in with Employee ID</span>
                  )}
                </button>
              </form>
            )}

            {loginMethod === 'google' && (
              <div className="login-form">
                <div className="google-login-info">
                  <p>Sign in with your corporate Google Workspace account for quick and secure access.</p>
                </div>
                
                <button 
                  type="button" 
                  className="login-button google"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <svg className="google-icon" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="login-footer">
            <p>By signing in, you agree to your company's travel policy and terms of service.</p>
          </div>
        </div>

        {/* Features Showcase */}
        <div className="login-features">
          <div className="feature-item">
            <div className="feature-icon">
              <Plane size={24} />
            </div>
            <div className="feature-content">
              <h3>Smart Bookings</h3>
              <p>AI-powered recommendations aligned with company policy</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon policy">
              <Building2 size={24} />
            </div>
            <div className="feature-content">
              <h3>Policy Compliance</h3>
              <p>Automatic checking against your company's travel guidelines</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon approval">
              <Mail size={24} />
            </div>
            <div className="feature-content">
              <h3>Quick Approvals</h3>
              <p>Streamlined workflow for supervisor authorization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
