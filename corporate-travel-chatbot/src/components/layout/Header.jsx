import { useAuth } from '../../contexts/AuthContext';
import { Menu, Bell, Search } from 'lucide-react';
import './Header.css';

const Header = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <div className="header-title">
          <h1>Travel Assistant</h1>
        </div>
      </div>

      <div className="header-center">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search conversations, bookings..." 
          />
        </div>
      </div>

      <div className="header-right">
        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-badge">2</span>
        </button>
        
        <div className="header-user">
          <img 
            src={user?.avatar} 
            alt={user?.name || 'User'} 
            className="header-avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
