# Corporate Travel Assistant

An AI-powered chatbot front-end for corporate travel and stay booking. Built with React JS, this application provides employees with an intuitive interface for booking business travel while adhering to company policies.

![Corporate Travel Assistant](https://ui-avatars.com/api/?name=Corporate+Travel&background=2563eb&color=fff&size=200&bold=true)

## Features

### 🔐 Authentication
- **Google OAuth** - Quick sign-in with corporate Google Workspace accounts
- **Employee ID Login** - Sign in with company-issued employee ID
- **Email Login** - Use corporate email address for authentication
- **Dynamic Company Branding** - Company logo displayed based on user credentials

### 💬 AI Chat Interface
- **ChatGPT/Claude-like UI** - Familiar, intuitive prompt-based interface
- **Real-time Responses** - Streaming-like message display with typing indicators
- **Conversation History** - Sidebar with saved conversations
- **Message Actions** - Copy, like/dislike, and regenerate responses

### ✈️ Travel Recommendations
- **Flight Search** - Find flights with airline, timing, and pricing details
- **Hotel Search** - Browse accommodations with amenities and ratings
- **Policy Compliance** - Clear indicators for policy-compliant options
- **Cost Optimization** - Budget-friendly recommendations within limits

### 📋 Company Policy Integration
- **Automatic Checking** - All recommendations checked against company policy
- **Visual Indicators** - Green (compliant), yellow (needs approval), red (non-compliant)
- **Modification Suggestions** - Alternative options to meet policy requirements
- **Budget Display** - Clear view of spending limits and allowances

### 🚗 Smart Features
- **Live Traffic Data** - Real-time commute times from airports
- **Schedule Optimization** - Align travel with work calendar
- **Distance Information** - Hotel proximity to office/meeting locations
- **Carbon Footprint** - Environmental impact of travel choices

### ✅ Approval Workflow
- **Supervisor Selection** - Choose from designated approvers
- **Justification Form** - Required explanation for out-of-policy bookings
- **Status Tracking** - Monitor approval request progress
- **Email Notifications** - Updates on approval decisions

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
cd corporate-travel-chatbot

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Demo Credentials

Try these demo credentials to see different company configurations:

### Email Login
- `user@acme.com` - Acme Corporation (Blue branding, strict policy)
- `user@techglobal.com` - TechGlobal Inc. (Green branding, flexible policy)
- `user@innovate.com` - Innovate Solutions (Purple branding, moderate policy)

### Employee ID Login
- `ACM12345` - Acme Corporation
- `TGL12345` - TechGlobal Inc.
- `INV12345` - Innovate Solutions

Use any password to login (demo mode).

## Sample Chat Prompts

Try these prompts to explore the chatbot's capabilities:

1. **Book a flight**: "I need to book a flight from San Francisco to New York next week"
2. **Find hotels**: "Can you find me a hotel in Manhattan for 3 nights?"
3. **Check policy**: "What is my company's travel policy?"
4. **Request approval**: "How do I request approval for out-of-policy travel?"
5. **Plan itinerary**: "Help me plan a business trip to Chicago"

## Project Structure

```
corporate-travel-chatbot/
├── src/
│   ├── components/
│   │   ├── auth/           # Login components
│   │   ├── chat/           # Chat interface components
│   │   ├── layout/         # Layout components (Header, Sidebar)
│   │   └── travel/         # Travel recommendation cards
│   ├── contexts/           # React Context providers
│   │   ├── AuthContext.jsx # Authentication state
│   │   └── ChatContext.jsx # Chat/conversation state
│   ├── App.jsx             # Main application component
│   ├── App.css             # App-level styles
│   ├── index.css           # Global styles and CSS variables
│   └── main.jsx            # Application entry point
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Navigation (ready for multi-page expansion)
- **Lucide React** - Icon library
- **date-fns** - Date formatting utilities
- **CSS Variables** - Theming and styling

## Customization

### Company Branding

Edit the `companyDatabase` object in `src/contexts/AuthContext.jsx` to add or modify company configurations:

```javascript
const companyDatabase = {
  'yourcompany': {
    name: 'Your Company Name',
    logo: 'https://your-logo-url.com/logo.png',
    primaryColor: '#your-brand-color',
    policy: {
      maxFlightBudget: 2000,
      maxHotelBudget: 300,
      allowedClasses: ['economy', 'premium_economy'],
      requiresApproval: true,
      advanceBookingDays: 14
    }
  }
};
```

### AI Responses

Modify the `generateAIResponse` function in `src/contexts/ChatContext.jsx` to integrate with your actual AI backend or customize mock responses.

## Future Enhancements

- [ ] Integration with real booking APIs (Amadeus, Sabre)
- [ ] Calendar integration for schedule checking
- [ ] Push notifications for approval updates
- [ ] Expense report generation
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Mobile app (React Native)

## License

MIT License - feel free to use this project for your corporate travel needs.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for seamless corporate travel experiences
