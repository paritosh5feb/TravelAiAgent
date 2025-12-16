import { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';

const ChatContext = createContext(null);

// Mock AI responses - In production, this would call your AI backend
const generateAIResponse = async (message, company, _conversationHistory) => {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  const lowerMessage = message.toLowerCase();
  
  // Check for travel-related queries
  if (lowerMessage.includes('flight') || lowerMessage.includes('fly') || lowerMessage.includes('travel')) {
    return {
      type: 'travel_recommendation',
      content: "I'd be happy to help you find flights! Based on your company's travel policy, here are some options:",
      recommendations: [
        {
          id: 'flight_1',
          type: 'flight',
          airline: 'United Airlines',
          flightNumber: 'UA 1234',
          departure: { city: 'San Francisco', airport: 'SFO', time: '08:00 AM', date: 'Dec 20, 2024' },
          arrival: { city: 'New York', airport: 'JFK', time: '04:30 PM', date: 'Dec 20, 2024' },
          duration: '5h 30m',
          class: 'Economy',
          price: 450,
          policyCompliant: true,
          commuteFromAirport: '45 mins to Manhattan (current traffic)',
          carbonOffset: '0.5 tons CO2'
        },
        {
          id: 'flight_2',
          type: 'flight',
          airline: 'Delta Airlines',
          flightNumber: 'DL 5678',
          departure: { city: 'San Francisco', airport: 'SFO', time: '10:30 AM', date: 'Dec 20, 2024' },
          arrival: { city: 'New York', airport: 'LGA', time: '07:00 PM', date: 'Dec 20, 2024' },
          duration: '5h 30m',
          class: 'Premium Economy',
          price: 720,
          policyCompliant: company?.policy?.allowedClasses?.includes('premium_economy'),
          policyNote: !company?.policy?.allowedClasses?.includes('premium_economy') 
            ? 'Premium Economy requires supervisor approval' 
            : null,
          commuteFromAirport: '30 mins to Manhattan (current traffic)',
          carbonOffset: '0.5 tons CO2'
        },
        {
          id: 'flight_3',
          type: 'flight',
          airline: 'American Airlines',
          flightNumber: 'AA 9012',
          departure: { city: 'San Francisco', airport: 'SFO', time: '02:00 PM', date: 'Dec 20, 2024' },
          arrival: { city: 'New York', airport: 'EWR', time: '10:30 PM', date: 'Dec 20, 2024' },
          duration: '5h 30m',
          class: 'Business',
          price: 1850,
          policyCompliant: false,
          policyNote: 'Exceeds budget limit. Consider economy class or request approval.',
          suggestedModification: 'Economy class available at $380',
          commuteFromAirport: '55 mins to Manhattan (current traffic)',
          carbonOffset: '0.8 tons CO2'
        }
      ],
      trafficInfo: {
        status: 'moderate',
        note: 'Current traffic from airports to Manhattan is moderate. Consider the 10:30 AM flight to LGA for shortest commute.'
      }
    };
  }
  
  if (lowerMessage.includes('hotel') || lowerMessage.includes('stay') || lowerMessage.includes('accommodation')) {
    return {
      type: 'hotel_recommendation',
      content: "Here are hotel options that match your travel dates and company policy:",
      recommendations: [
        {
          id: 'hotel_1',
          type: 'hotel',
          name: 'Marriott Times Square',
          location: 'Manhattan, New York',
          address: '1535 Broadway, New York, NY',
          rating: 4.5,
          pricePerNight: 220,
          totalNights: 3,
          totalPrice: 660,
          amenities: ['WiFi', 'Gym', 'Business Center', 'Restaurant'],
          policyCompliant: true,
          distanceToOffice: '0.5 miles',
          commuteTime: '10 mins walk'
        },
        {
          id: 'hotel_2',
          type: 'hotel',
          name: 'Hilton Midtown',
          location: 'Manhattan, New York',
          address: '1335 6th Avenue, New York, NY',
          rating: 4.3,
          pricePerNight: 195,
          totalNights: 3,
          totalPrice: 585,
          amenities: ['WiFi', 'Gym', 'Pool', 'Restaurant'],
          policyCompliant: true,
          distanceToOffice: '0.8 miles',
          commuteTime: '15 mins walk'
        },
        {
          id: 'hotel_3',
          type: 'hotel',
          name: 'The Ritz-Carlton',
          location: 'Central Park, New York',
          address: '50 Central Park S, New York, NY',
          rating: 4.9,
          pricePerNight: 450,
          totalNights: 3,
          totalPrice: 1350,
          amenities: ['WiFi', 'Spa', 'Gym', 'Fine Dining', 'Concierge'],
          policyCompliant: false,
          policyNote: `Exceeds nightly budget of $${company?.policy?.maxHotelBudget || 200}. Requires supervisor approval.`,
          distanceToOffice: '1.2 miles',
          commuteTime: '20 mins by cab'
        }
      ]
    };
  }
  
  if (lowerMessage.includes('policy') || lowerMessage.includes('budget') || lowerMessage.includes('limit')) {
    return {
      type: 'policy_info',
      content: `Here's a summary of ${company?.name || 'your company'}'s travel policy:`,
      policyDetails: {
        flightBudget: company?.policy?.maxFlightBudget || 1000,
        hotelBudget: company?.policy?.maxHotelBudget || 200,
        allowedClasses: company?.policy?.allowedClasses || ['economy'],
        requiresApproval: company?.policy?.requiresApproval ?? true,
        advanceBooking: company?.policy?.advanceBookingDays || 14
      }
    };
  }
  
  if (lowerMessage.includes('approval') || lowerMessage.includes('approve') || lowerMessage.includes('supervisor')) {
    return {
      type: 'approval_flow',
      content: "I can help you request approval for travel that's outside the standard policy. Here's what you need to know:",
      approvalInfo: {
        supervisors: [
          { name: 'John Smith', role: 'Direct Manager', email: 'john.smith@company.com' },
          { name: 'Sarah Johnson', role: 'Department Head', email: 'sarah.johnson@company.com' }
        ],
        estimatedTime: '24-48 hours',
        requiredJustification: true
      }
    };
  }
  
  if (lowerMessage.includes('schedule') || lowerMessage.includes('calendar') || lowerMessage.includes('meeting')) {
    return {
      type: 'schedule_info',
      content: "I've checked your work schedule. Here's how the travel options align with your commitments:",
      scheduleAnalysis: {
        conflicts: [],
        recommendations: [
          'The morning flight allows you to arrive before your 6 PM dinner meeting',
          'Consider booking a hotel near the office to minimize commute time',
          'Your return flight should be after 4 PM to accommodate the closing session'
        ]
      }
    };
  }
  
  // Default conversational response
  return {
    type: 'text',
    content: `I'm your corporate travel assistant for ${company?.name || 'your company'}. I can help you with:

• **Flight bookings** - Find the best options within policy
• **Hotel reservations** - Book accommodations near your destination
• **Policy information** - Understand your travel budget and limits
• **Approval requests** - Get authorization for out-of-policy bookings
• **Schedule optimization** - Align travel with your work calendar

Just tell me where you need to travel and when, and I'll find the best options for you!`
  };
};

export const ChatProvider = ({ children }) => {
  const { company } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const getCurrentConversation = useCallback(() => {
    return conversations.find(c => c.id === currentConversationId) || null;
  }, [conversations, currentConversationId]);

  const createNewConversation = useCallback(() => {
    const newConversation = {
      id: 'conv_' + Date.now(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    return newConversation.id;
  }, []);

  const sendMessage = useCallback(async (content) => {
    let convId = currentConversationId;
    
    // Create new conversation if none exists
    if (!convId) {
      convId = createNewConversation();
    }

    const userMessage = {
      id: 'msg_' + Date.now(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };

    // Add user message
    setConversations(prev => prev.map(conv => {
      if (conv.id === convId) {
        const title = conv.messages.length === 0 
          ? content.substring(0, 50) + (content.length > 50 ? '...' : '')
          : conv.title;
        return {
          ...conv,
          title,
          messages: [...conv.messages, userMessage],
          updatedAt: new Date().toISOString()
        };
      }
      return conv;
    }));

    // Generate AI response
    setIsTyping(true);
    try {
      const conversation = conversations.find(c => c.id === convId);
      const response = await generateAIResponse(content, company, conversation?.messages || []);
      
      const assistantMessage = {
        id: 'msg_' + Date.now(),
        role: 'assistant',
        ...response,
        timestamp: new Date().toISOString()
      };

      setConversations(prev => prev.map(conv => {
        if (conv.id === convId) {
          return {
            ...conv,
            messages: [...conv.messages, assistantMessage],
            updatedAt: new Date().toISOString()
          };
        }
        return conv;
      }));
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = {
        id: 'msg_' + Date.now(),
        role: 'assistant',
        type: 'error',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date().toISOString()
      };
      
      setConversations(prev => prev.map(conv => {
        if (conv.id === convId) {
          return {
            ...conv,
            messages: [...conv.messages, errorMessage],
            updatedAt: new Date().toISOString()
          };
        }
        return conv;
      }));
    } finally {
      setIsTyping(false);
    }
  }, [currentConversationId, createNewConversation, company, conversations]);

  const deleteConversation = useCallback((conversationId) => {
    setConversations(prev => prev.filter(c => c.id !== conversationId));
    if (currentConversationId === conversationId) {
      setCurrentConversationId(null);
    }
  }, [currentConversationId]);

  const selectConversation = useCallback((conversationId) => {
    setCurrentConversationId(conversationId);
  }, []);

  const value = {
    conversations,
    currentConversationId,
    currentConversation: getCurrentConversation(),
    isTyping,
    createNewConversation,
    sendMessage,
    deleteConversation,
    selectConversation
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export default ChatContext;
