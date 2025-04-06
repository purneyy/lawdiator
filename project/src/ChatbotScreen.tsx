import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const QUICK_QUESTIONS = [
  "Will my data be sold?",
  "Is there auto-payment?",
  "Can I delete my data?",
  "Will this app access my location?"
];

function ChatbotScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI legal assistant. Ask me anything about the policy you've uploaded.",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (text: string) => {
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      sender: 'user'
    }]);

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Based on the policy, this service collects and shares user data with third parties for advertising purposes. Your data may be retained even after account deletion.",
        sender: 'bot'
      }]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl h-[600px] flex flex-col">
        {/* Chat Header */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6 text-indigo-600" />
            <div>
              <h2 className="font-semibold text-gray-800">AI Legal Assistant</h2>
              <p className="text-sm text-gray-500">Ask questions about your policy</p>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSend(question)}
                className="bg-white px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors border"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user'
                    ? 'bg-indigo-100'
                    : 'bg-gray-100'
                }`}
              >
                {message.sender === 'user' ? (
                  <User className="w-5 h-5 text-indigo-600" />
                ) : (
                  <Bot className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && input && handleSend(input)}
              placeholder="Type your question..."
              className="flex-grow px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              onClick={() => input && handleSend(input)}
              disabled={!input}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                input
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatbotScreen;