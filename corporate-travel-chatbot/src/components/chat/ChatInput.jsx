import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, Smile, Loader2 } from 'lucide-react';
import './ChatInput.css';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-input-container">
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <div className="input-actions-left">
            <button type="button" className="input-action-btn" title="Attach file">
              <Paperclip size={20} />
            </button>
          </div>

          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me about flights, hotels, or travel policies..."
            disabled={disabled}
            rows={1}
            className="chat-textarea"
          />

          <div className="input-actions-right">
            <button type="button" className="input-action-btn" title="Voice input">
              <Mic size={20} />
            </button>
            <button type="button" className="input-action-btn" title="Add emoji">
              <Smile size={20} />
            </button>
            <button
              type="submit"
              className={`send-btn ${message.trim() && !disabled ? 'active' : ''}`}
              disabled={!message.trim() || disabled}
              title="Send message"
            >
              {disabled ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
        </div>

        <p className="input-hint">
          Press Enter to send, Shift+Enter for new line
        </p>
      </form>
    </div>
  );
};

export default ChatInput;
