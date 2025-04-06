import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Bot, Glasses as MagnifyingGlass, ArrowRight, FileQuestion } from 'lucide-react';

function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FileText className="w-10 h-10 text-indigo-600" />
              <h1 className="text-4xl font-bold text-gray-800">Welcome to PolicyPal</h1>
            </div>
            <p className="text-xl text-gray-600">Upload a policy. We'll summarize it in 2 lines.</p>
          </div>

          {/* Illustration */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <div className="absolute -left-12 top-1/2 transform -translate-y-1/2">
                <Bot className="w-16 h-16 text-indigo-600" />
              </div>
              <div className="bg-gray-100 rounded-xl p-8">
                <FileText className="w-24 h-24 text-gray-400" />
              </div>
              <div className="absolute -right-12 top-1/2 transform -translate-y-1/2">
                <MagnifyingGlass className="w-16 h-16 text-indigo-600" />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={() => navigate('/upload')}
              className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2 group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => navigate('/upload?demo=true')}
              className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-2"
            >
              <FileQuestion className="w-5 h-5" />
              Try a demo policy
            </button>
          </div>

          {/* Fun Fact */}
          <div className="mt-12 bg-indigo-50 rounded-xl p-6 text-center">
            <p className="text-indigo-900 font-medium">
              Did You Know? 94% of people never read T&Cs
            </p>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-8 grid md:grid-cols-3 gap-4 text-white">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="font-semibold mb-2">Smart Analysis</h3>
            <p className="text-sm opacity-90">AI-powered policy analysis in seconds</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="font-semibold mb-2">Plain Language</h3>
            <p className="text-sm opacity-90">Complex terms explained simply</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="font-semibold mb-2">Risk Detection</h3>
            <p className="text-sm opacity-90">Identify potential red flags instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;