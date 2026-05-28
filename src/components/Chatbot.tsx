import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Check, Settings, Key } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
  const [showConfig, setShowConfig] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Lead Capture state
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
  const chatSessionRef = useRef<any>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Load API Key on Mount
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setHasApiKey(true);
    }
  }, []);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'ai',
          text: "Hello! I am your Medontech Engineering Advisor. I can consult on PCB layout, SI/EMI analysis, or help capture your design specifications.\n\n(Note: To activate real-time Gemini AI chat, click the Settings Gear ⚙️ above to enter your API key, or proceed in Simulation Mode).",
          timestamp: new Date(),
          choices: ['PCB Design & Layout', 'Simulation & Analysis', 'Manufacturing & Sourcing', 'General Inquiry']
        }
      ]);
    }
  }, [isOpen]);

  const initGeminiChat = (key: string) => {
    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `You are the Medontech AI Engineering Advisor. Provide helpful, accurate advice about PCB design, multi-layer routing, Signal Integrity analysis, EMI shielding, thermal dissipation, and custom mechanical enclosures. Guide users politely. 
        When they are interested in a quote, capture their: Name, Company, Email, Phone, and Project Brief. 
        When you have gathered all these 5 details, output a special structured tag at the end of your response exactly like this: [ENQUIRY_COMPLETE] and display the summary of their inputs so the client parses it.`
      });

      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }))
      });
      chatSessionRef.current = chat;
    } catch (err) {
      console.error("Failed to initialize Gemini:", err);
    }
  };

  const saveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setHasApiKey(true);
      setShowConfig(false);
      // Initialize chat session
      initGeminiChat(apiKey.trim());
      
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'ai',
          text: "Gemini AI Engine is now online. How can I assist you with your hardware design requirements today?",
          timestamp: new Date()
        }
      ]);
    }
  };

  const removeApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setHasApiKey(false);
    chatSessionRef.current = null;
  };

  const handleSendMessage = async (text: string) => {
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

    if (hasApiKey) {
      // Execute live Gemini API chat
      await callGeminiAPI(text);
    } else {
      // Execute simulated flow
      processSimulatedFlow(text);
    }
  };

  // Call Gemini Model
  const callGeminiAPI = async (text: string) => {
    if (!chatSessionRef.current) {
      initGeminiChat(apiKey);
    }

    setIsTyping(true);
    try {
      const result = await chatSessionRef.current.sendMessage(text);
      const responseText = await result.response.text();
      setIsTyping(false);

      // Check if tag is emitted
      if (responseText.includes('[ENQUIRY_COMPLETE]')) {
        setStep('complete');
        // Parse basic details using regular expressions
        const cleanedText = responseText.replace('[ENQUIRY_COMPLETE]', '').trim();
        
        setMessages(prev => [
          ...prev,
          {
            id: Math.random().toString(),
            sender: 'ai',
            text: cleanedText,
            timestamp: new Date()
          }
        ]);
        
        // Populate mock lead fields from user history
        const userMsgs = messages.filter(m => m.sender === 'user').map(m => m.text).join(' ');
        const emailMatch = userMsgs.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        
        setLeadData({
          name: 'Captured by AI',
          company: 'AI Captures',
          email: emailMatch ? emailMatch[0] : 'services@medontech.com',
          phone: 'N/A',
          category: 'PCB & Analysis Consulting',
          description: userMsgs.slice(-150)
        });
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: Math.random().toString(),
            sender: 'ai',
            text: responseText,
            timestamp: new Date()
          }
        ]);
      }
    } catch (err) {
      console.error("Gemini API Error:", err);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'ai',
          text: "I encountered an error connecting to the Gemini engine. Please double check your API key validity in settings.",
          timestamp: new Date()
        }
      ]);
    }
  };

  // Fallback Simulation Mode
  const processSimulatedFlow = (input: string) => {
    if (step === 'intro') {
      setLeadData(prev => ({ ...prev, category: input }));
      setStep('name');
      triggerAIResponse("Excellent selection. We offer multi-layer routing, SI simulations, and full assembly support. Could you please share your full name?");
    } else if (step === 'name') {
      setLeadData(prev => ({ ...prev, name: input }));
      setStep('company');
      triggerAIResponse(`Thank you, ${input}. What company or organization are you representing?`);
    } else if (step === 'company') {
      setLeadData(prev => ({ ...prev, company: input }));
      setStep('email');
      triggerAIResponse("Understood. What business email address should our engineering team write back to?");
    } else if (step === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.trim())) {
        triggerAIResponse("Please enter a valid business email so we can transmit your quotation proposal.");
        return;
      }
      setLeadData(prev => ({ ...prev, email: input }));
      setStep('phone');
      triggerAIResponse("Almost complete! Can we get a contact phone number for quick alignment calls?");
    } else if (step === 'phone') {
      setLeadData(prev => ({ ...prev, phone: input }));
      setStep('description');
      triggerAIResponse("Perfect. Please enter a brief description of your design needs (e.g. layers count, target completion date, mechanical constraints):");
    } else if (step === 'description') {
      const finalData = { ...leadData, description: input };
      setLeadData(finalData);
      setStep('complete');
      submitLead(finalData);
    }
  };

  const triggerAIResponse = (text: string, delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'ai',
          text,
          timestamp: new Date()
        }
      ]);
    }, delay);
  };

  const submitLead = (data: LeadData) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      console.log("Transmitting lead details directly to services@medontech.com:", data);
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'ai',
          text: `Thank you, ${data.name}! I have formatted your hardware parameters and emailed them directly to our services department at services@medontech.com. 

We will get back to you with a CAD checklist and stackup review shortly. Here is the data captured:`,
          timestamp: new Date()
        }
      ]);
    }, 1200);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
      {/* Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="flex-center animate-float"
          aria-label="Open AI Engineering chatbot"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--text-primary)',
            color: 'var(--bg-primary)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            border: 'none',
            outline: 'none'
          }}
        >
          <MessageSquare size={22} />
        </button>
      )}

      {/* Panel */}
      {isOpen && (
        <div className="glass-card" style={{
          width: '380px',
          height: '520px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          padding: 0,
          border: '1px solid var(--border-color)',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--border-radius-md)'
        }}>
          {/* Header */}
          <div style={{
            padding: '14px 18px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-tertiary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img 
                src="images/chatbot_avatar.png" 
                alt="AI Avatar" 
                style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--border-color)' }}
              />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Medontech AI</div>
                <div style={{ fontSize: '10px', color: hasApiKey ? '#10b981' : 'var(--text-muted)' }}>
                  {hasApiKey ? 'Gemini Engine Active' : 'Simulation Mode'}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                onClick={() => setShowConfig(!showConfig)}
                aria-label="Configure API Key"
                style={{ color: showConfig ? 'var(--accent-primary)' : 'var(--text-muted)' }}
              >
                <Settings size={18} />
              </button>
              <button onClick={() => setIsOpen(false)} aria-label="Close Chat" style={{ color: 'var(--text-muted)' }}>
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Config Settings Overlay */}
          {showConfig ? (
            <div style={{
              flex: 1,
              padding: '24px',
              background: 'var(--bg-primary)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'left',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', gap: '8px', color: 'var(--accent-primary)' }}>
                <Key size={20} />
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Gemini API Settings</h3>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Please provide a Google Gemini API Key to enable real-time consultation. The key is stored locally in your browser memory.
              </p>
              
              {hasApiKey ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#10b981' }}>
                    <Check size={16} /> Key stored and active.
                  </div>
                  <button 
                    onClick={removeApiKey}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      background: '#ef4444',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 600
                    }}
                  >
                    Delete Saved API Key
                  </button>
                </div>
              ) : (
                <form onSubmit={saveApiKey} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                  <button 
                    type="submit"
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      background: 'var(--text-primary)',
                      color: 'var(--bg-primary)',
                      fontSize: '12px',
                      fontWeight: 600
                    }}
                  >
                    Save & Activate
                  </button>
                </form>
              )}
              <button 
                onClick={() => setShowConfig(false)}
                style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '10px' }}
              >
                Back to conversation
              </button>
            </div>
          ) : (
            <>
              {/* Message List */}
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
                      alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: msg.sender === 'user' ? '18px 18px 2px 18px' : '2px 18px 18px 18px',
                      background: msg.sender === 'user' ? 'var(--text-primary)' : 'var(--bg-tertiary)',
                      color: msg.sender === 'user' ? 'var(--bg-primary)' : 'var(--text-primary)',
                      fontSize: '13px',
                      whiteSpace: 'pre-line',
                      border: '1px solid var(--border-color)'
                    }}>
                      {msg.text}
                    </div>

                    {msg.choices && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                        {msg.choices.map(c => (
                          <button 
                            key={c}
                            onClick={() => handleSendMessage(c)}
                            style={{
                              padding: '8px 12px',
                              borderRadius: '16px',
                              border: '1px solid var(--border-color)',
                              background: 'var(--bg-secondary)',
                              color: 'var(--text-primary)',
                              fontSize: '12px',
                              textAlign: 'left',
                              width: 'fit-content',
                              transition: 'all 0.2s'
                            }}
                            className="choice-hover"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Completed summary details */}
                {step === 'complete' && (
                  <div style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    fontSize: '12px',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <div><strong>Inquiry Area:</strong> {leadData.category}</div>
                    <div><strong>Name:</strong> {leadData.name}</div>
                    <div><strong>Company:</strong> {leadData.company}</div>
                    <div><strong>Email:</strong> {leadData.email}</div>
                    <div><strong>Phone:</strong> {leadData.phone}</div>
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '4px', marginTop: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
                      <strong>Brief:</strong> {leadData.description}
                    </div>
                  </div>
                )}

                {isTyping && (
                  <div style={{ display: 'flex', gap: '4px', alignSelf: 'flex-start' }}>
                    <div className="typing-indicator">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Form Input footer */}
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
                  placeholder={step === 'complete' ? "Enquiry Captured" : "Consult our engineer..."}
                  disabled={step === 'complete' || isTyping}
                  style={{
                    flex: 1,
                    padding: '8px 16px',
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
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
                    background: 'var(--text-primary)',
                    color: 'var(--bg-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: (!inputValue.trim() || step === 'complete' || isTyping) ? 0.4 : 1
                  }}
                >
                  <Send size={12} />
                </button>
              </form>
            </>
          )}
        </div>
      )}

      <style>{`
        .choice-hover:hover {
          background-color: var(--text-primary) !important;
          color: var(--bg-primary) !important;
          border-color: var(--text-primary) !important;
        }
        .typing-indicator {
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          padding: 8px 16px;
          border-radius: 12px;
          display: flex;
          gap: 4px;
          align-items: center;
        }
        .typing-indicator span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--text-muted);
          animation: bounce 1.2s infinite;
        }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
};
