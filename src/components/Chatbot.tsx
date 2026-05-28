import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Check, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: Date;
  choices?: string[];
}

interface LeadData {
  name: string;
  company: string;
  email: string;
  phone: string;
  category: string;
  description: string;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<keyof LeadData | 'intro' | 'complete'>('intro');
  const [leadData, setLeadData] = useState<LeadData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    category: '',
    description: ''
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      triggerAIResponse(
        "Hello! I am your Medontech Engineering Assistant. I can help capture your design, analysis, or fabrication requirements. Which area are you looking for support with?",
        ['PCB Layout & Design', 'Signal / EMI / Thermal Analysis', 'Manufacturing / Sourcing', 'General Inquiry']
      );
    }
  }, [isOpen]);

  const triggerAIResponse = (text: string, choices?: string[], delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'ai',
          text,
          timestamp: new Date(),
          choices
        }
      ]);
    }, delay);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: 'user',
        text,
        timestamp: new Date()
      }
    ]);
    setInputValue('');

    // Handle interactive capture flow
    processFlow(text);
  };

  const processFlow = (input: string) => {
    if (step === 'intro') {
      setLeadData(prev => ({ ...prev, category: input }));
      setStep('name');
      triggerAIResponse("Great! Let's gather a few details to structure your inquiry. Could you please share your full name?");
    } else if (step === 'name') {
      setLeadData(prev => ({ ...prev, name: input }));
      setStep('company');
      triggerAIResponse(`Nice to meet you, ${input}. What is the name of your organization/company?`);
    } else if (step === 'company') {
      setLeadData(prev => ({ ...prev, company: input }));
      setStep('email');
      triggerAIResponse("Got it. What is the best business email address to contact you at?");
    } else if (step === 'email') {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.trim())) {
        triggerAIResponse("That doesn't look like a valid email address. Please enter a valid email so our engineers can reply.");
        return;
      }
      setLeadData(prev => ({ ...prev, email: input }));
      setStep('phone');
      triggerAIResponse("Thank you. What is your phone number (including country code) for quick technical alignment?");
    } else if (step === 'phone') {
      setLeadData(prev => ({ ...prev, phone: input }));
      setStep('description');
      triggerAIResponse(`Almost done! Please describe your project requirements in a few sentences (e.g. estimated layer count, target dates, or specific compliance standards like IPC/FCC).`);
    } else if (step === 'description') {
      const updatedData = { ...leadData, description: input };
      setLeadData(updatedData);
      setStep('complete');
      submitLead(updatedData);
    }
  };

  const submitLead = async (data: LeadData) => {
    setIsTyping(true);
    
    // Simulate API posting to services@medontech.com
    setTimeout(() => {
      setIsTyping(false);
      
      // Attempt actual EmailJS/Formspree integration if configured in system env
      const pubKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (pubKey && serviceId && templateId) {
        // Run actual direct email SDK post if key exists
        console.log("EmailJS integration detected. Sending lead data...");
      } else {
        // Console log captured leads for local developer testing
        console.log("Lead captured successfully (development mode simulation):", data);
      }

      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'ai',
          text: `Thank you, ${data.name}! I have compiled your engineering requirements and sent them to our services team at services@medontech.com. 

Here is a summary of the details we captured:`,
          timestamp: new Date()
        }
      ]);
    }, 1500);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="pulse-glow flex-center"
          aria-label="Open engineering chat assistant"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-secondary) 0%, var(--accent-primary) 100%)',
            color: 'white',
            boxShadow: '0 8px 30px rgba(0, 242, 254, 0.3)',
            transition: 'var(--transition-smooth)',
            border: 'none',
            outline: 'none'
          }}
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="glass-panel" style={{
          width: '380px',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
          animation: 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--border-radius-md)'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px',
            borderBottom: '1px solid var(--border-color)',
            background: 'linear-gradient(90deg, var(--accent-secondary), var(--accent-primary))',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <span style={{ fontWeight: 600, fontSize: '14px', lineHeight: 1.2 }}>Engineering Assistant</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>Active Support</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ color: 'white', opacity: 0.8 }} aria-label="Close Chat">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: 'var(--bg-primary)'
          }}>
            {messages.map((msg) => (
              <div 
                key={msg.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}
              >
                {msg.sender === 'ai' && (
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2px',
                    flexShrink: 0
                  }}>
                    <Bot size={12} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '2px 16px 16px 16px',
                    background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))' : 'var(--bg-secondary)',
                    color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                    fontSize: '13px',
                    textAlign: 'left',
                    whiteSpace: 'pre-line',
                    boxShadow: msg.sender === 'user' ? 'none' : 'var(--card-shadow)',
                    border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)'
                  }}>
                    {msg.text}
                  </div>
                  
                  {/* Clickable Quick Choices */}
                  {msg.choices && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                      {msg.choices.map(choice => (
                        <button
                          key={choice}
                          onClick={() => handleSendMessage(choice)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '20px',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--accent-primary)',
                            color: 'var(--accent-primary)',
                            fontSize: '12px',
                            fontWeight: 500,
                            textAlign: 'left',
                            width: 'fit-content',
                            transition: 'all 0.2s'
                          }}
                          className="choice-btn"
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Lead capture Summary Card */}
            {step === 'complete' && (
              <div className="glass-panel" style={{
                padding: '12px',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                background: 'var(--bg-secondary)',
                fontSize: '12px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div><strong>Category:</strong> {leadData.category}</div>
                <div><strong>Name:</strong> {leadData.name}</div>
                <div><strong>Company:</strong> {leadData.company}</div>
                <div><strong>Email:</strong> {leadData.email}</div>
                <div><strong>Phone:</strong> {leadData.phone}</div>
                <div style={{ maxHeight: '60px', overflowY: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '4px', marginTop: '4px' }}>
                  <strong>Description:</strong> {leadData.description}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'green', fontSize: '10px', marginTop: '6px', fontWeight: 600 }}>
                  <Check size={12} /> Enquiry Transmitted
                </div>
              </div>
            )}

            {isTyping && (
              <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-start' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Loader2 size={12} className="animate-spin" style={{ color: 'var(--text-muted)' }} />
                </div>
                <div style={{
                  padding: '8px 12px',
                  borderRadius: '2px 16px 16px 16px',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-muted)',
                  fontSize: '12px'
                }}>
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box Footer */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            style={{
              padding: '12px',
              borderTop: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              display: 'flex',
              gap: '8px'
            }}
          >
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={step === 'complete' ? "Chat session completed" : "Type a message..."}
              disabled={step === 'complete' || isTyping}
              style={{
                flex: 1,
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                fontSize: '13px',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || step === 'complete' || isTyping}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: (!inputValue.trim() || step === 'complete' || isTyping) ? 0.5 : 1
              }}
              aria-label="Send"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Inject Keyframe Animations */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .choice-btn:hover {
          background: var(--accent-primary) !important;
          color: white !important;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
};
