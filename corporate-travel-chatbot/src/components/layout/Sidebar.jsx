import { useAuth } from '../../contexts/AuthContext';
import { useChat } from '../../contexts/ChatContext';
import { 
  MessageSquarePlus, 
  MessageSquare, 
  Trash2, 
  Plane,
  Settings,
  HelpCircle,
  LogOut,
  X,
  ChevronRight
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, company, logout } = useAuth();
  const { 
    conversations, 
    currentConversationId, 
    createNewConversation, 
    selectConversation,
    deleteConversation 
  } = useChat();

  const handleNewChat = () => {
    createNewConversation();
    onClose();
  };

  const handleSelectConversation = (id) => {
    selectConversation(id);
    onClose();
  };

  const handleDeleteConversation = (e, id) => {
    e.stopPropagation();
    if (confirm('Delete this conversation?')) {
      deleteConversation(id);
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Company Branding */}
      <div className="sidebar-header">
        <div className="company-branding">
          <img 
            src={company?.logo} 
            alt={company?.name || 'Company'} 
            className="company-logo"
          />
          <div className="company-info">
            <span className="company-name">{company?.name || 'Corporate Travel'}</span>
            <span className="app-name">Travel Assistant</span>
          </div>
        </div>
        <button className="sidebar-close" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* New Chat Button */}
      <div className="sidebar-actions">
        <button className="new-chat-btn" onClick={handleNewChat}>
          <MessageSquarePlus size={20} />
          <span>New Conversation</span>
        </button>
      </div>

      {/* Conversation List */}
      <div className="conversations-section">
        <h3 className="section-title">Conversations</h3>
        <div className="conversations-list">
          {conversations.length === 0 ? (
            <div className="no-conversations">
              <MessageSquare size={24} />
              <p>No conversations yet</p>
              <span>Start a new chat to begin</span>
            </div>
          ) : (
            conversations.map(conv => (
              <div
                key={conv.id}
                className={`conversation-item ${conv.id === currentConversationId ? 'active' : ''}`}
                onClick={() => handleSelectConversation(conv.id)}
              >
                <MessageSquare size={18} className="conv-icon" />
                <div className="conv-content">
                  <span className="conv-title">{conv.title}</span>
                  <span className="conv-time">
                    {formatDistanceToNow(new Date(conv.updatedAt), { addSuffix: true })}
                  </span>
                </div>
                <button 
                  className="conv-delete"
                  onClick={(e) => handleDeleteConversation(e, conv.id)}
                  title="Delete conversation"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="sidebar-links">
        <a href="#" className="sidebar-link">
          <Plane size={18} />
          <span>My Bookings</span>
          <ChevronRight size={16} />
        </a>
        <a href="#" className="sidebar-link">
          <Settings size={18} />
          <span>Preferences</span>
          <ChevronRight size={16} />
        </a>
        <a href="#" className="sidebar-link">
          <HelpCircle size={18} />
          <span>Help & Support</span>
          <ChevronRight size={16} />
        </a>
      </div>

      {/* User Profile */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <img 
            src={user?.avatar} 
            alt={user?.name || 'User'} 
            className="user-avatar"
          />
          <div className="user-info">
            <span className="user-name">{user?.name || 'User'}</span>
            <span className="user-email">{user?.email || ''}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={logout} title="Sign out">
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
