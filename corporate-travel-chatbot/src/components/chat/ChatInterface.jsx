import { useRef, useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import WelcomeScreen from './WelcomeScreen';
import './ChatInterface.css';

const ChatInterface = () => {
  const { currentConversation, isTyping, sendMessage } = useChat();
  const { company } = useAuth();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages, isTyping]);

  const handleSendMessage = async (message) => {
    await sendMessage(message);
  };

  const hasMessages = currentConversation?.messages?.length > 0;

  return (
    <div className="chat-interface">
      <div className="chat-messages-container" ref={messagesContainerRef}>
        {!hasMessages ? (
          <WelcomeScreen onSendMessage={handleSendMessage} />
        ) : (
          <div className="chat-messages">
            {currentConversation.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isTyping && (
              <div className="typing-indicator">
                <div className="typing-avatar">
                  <img 
                    src={company?.logo || '/logo.png'} 
                    alt="Assistant" 
                  />
                </div>
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};

export default ChatInterface;
