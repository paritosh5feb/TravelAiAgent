import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock company data - In production, this would come from an API
const companyDatabase = {
  'acme': {
    name: 'Acme Corporation',
    logo: 'https://ui-avatars.com/api/?name=Acme+Corp&background=2563eb&color=fff&size=128&bold=true',
    primaryColor: '#2563eb',
    policy: {
      maxFlightBudget: 1500,
      maxHotelBudget: 250,
      allowedClasses: ['economy', 'premium_economy'],
      requiresApproval: true,
      advanceBookingDays: 14
    }
  },
  'techglobal': {
    name: 'TechGlobal Inc.',
    logo: 'https://ui-avatars.com/api/?name=TechGlobal&background=059669&color=fff&size=128&bold=true',
    primaryColor: '#059669',
    policy: {
      maxFlightBudget: 2500,
      maxHotelBudget: 350,
      allowedClasses: ['economy', 'premium_economy', 'business'],
      requiresApproval: false,
      advanceBookingDays: 7
    }
  },
  'innovate': {
    name: 'Innovate Solutions',
    logo: 'https://ui-avatars.com/api/?name=Innovate&background=7c3aed&color=fff&size=128&bold=true',
    primaryColor: '#7c3aed',
    policy: {
      maxFlightBudget: 2000,
      maxHotelBudget: 300,
      allowedClasses: ['economy', 'premium_economy', 'business'],
      requiresApproval: true,
      advanceBookingDays: 10
    }
  },
  'default': {
    name: 'Corporate Travel',
    logo: 'https://ui-avatars.com/api/?name=Corporate+Travel&background=1f2937&color=fff&size=128&bold=true',
    primaryColor: '#1f2937',
    policy: {
      maxFlightBudget: 1000,
      maxHotelBudget: 200,
      allowedClasses: ['economy'],
      requiresApproval: true,
      advanceBookingDays: 21
    }
  }
};

const getCompanyFromEmail = (email) => {
  if (!email) return 'default';
  const domain = email.split('@')[1]?.split('.')[0]?.toLowerCase();
  return companyDatabase[domain] ? domain : 'default';
};

const getCompanyFromEmployeeId = (employeeId) => {
  if (!employeeId) return 'default';
  const prefix = employeeId.substring(0, 3).toLowerCase();
  const mapping = {
    'acm': 'acme',
    'tgl': 'techglobal',
    'inv': 'innovate'
  };
  return mapping[prefix] || 'default';
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('travelChatUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        const companyKey = parsedUser.companyKey || 'default';
        setCompany(companyDatabase[companyKey]);
      } catch {
        localStorage.removeItem('travelChatUser');
      }
    }
    setIsLoading(false);
  }, []);

  const loginWithGoogle = async (_googleResponse) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call to validate Google token and get user info
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, decode the JWT from _googleResponse.credential
      const mockUser = {
        id: 'google_' + Date.now(),
        name: 'Google User',
        email: 'user@techglobal.com',
        avatar: 'https://ui-avatars.com/api/?name=Google+User&background=ea4335&color=fff',
        loginMethod: 'google',
        companyKey: 'techglobal'
      };
      
      setUser(mockUser);
      setCompany(companyDatabase[mockUser.companyKey]);
      localStorage.setItem('travelChatUser', JSON.stringify(mockUser));
      return { success: true };
    } catch (err) {
      setError('Failed to login with Google. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithEmployeeId = async (employeeId, _password) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!employeeId || employeeId.length < 4) {
        throw new Error('Invalid employee ID');
      }
      
      const companyKey = getCompanyFromEmployeeId(employeeId);
      const mockUser = {
        id: employeeId,
        name: `Employee ${employeeId}`,
        email: `${employeeId.toLowerCase()}@${companyKey === 'default' ? 'company' : companyKey}.com`,
        avatar: `https://ui-avatars.com/api/?name=${employeeId}&background=3b82f6&color=fff`,
        employeeId: employeeId,
        loginMethod: 'employee_id',
        companyKey: companyKey
      };
      
      setUser(mockUser);
      setCompany(companyDatabase[companyKey]);
      localStorage.setItem('travelChatUser', JSON.stringify(mockUser));
      return { success: true };
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithEmail = async (email, _password) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email || !email.includes('@')) {
        throw new Error('Invalid email address');
      }
      
      const companyKey = getCompanyFromEmail(email);
      const name = email.split('@')[0].replace(/[._]/g, ' ');
      const mockUser = {
        id: 'email_' + Date.now(),
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8b5cf6&color=fff`,
        loginMethod: 'email',
        companyKey: companyKey
      };
      
      setUser(mockUser);
      setCompany(companyDatabase[companyKey]);
      localStorage.setItem('travelChatUser', JSON.stringify(mockUser));
      return { success: true };
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setCompany(null);
    localStorage.removeItem('travelChatUser');
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    company,
    isLoading,
    error,
    isAuthenticated: !!user,
    loginWithGoogle,
    loginWithEmployeeId,
    loginWithEmail,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
