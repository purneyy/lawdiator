import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, MessageSquare, Languages, ArrowRight } from 'lucide-react';

function SummaryScreen() {
  const navigate = useNavigate();

  // Retrieve analysis from sessionStorage
  const analysis = React.useMemo(() => {
    const stored = sessionStorage.getItem('policyAnalysis');
    return stored ? JSON.parse(stored) : null;
  }, []);

  if (!analysis) {
    return (
      <div className="max-w-4xl mx-auto text-center text-gray-600 mt-10">
        No analysis data found. Please go back and analyze a policy first.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Summary Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Plain Language Summary</h2>
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            This policy has been analyzed and includes the following concerning categories:
          </p>
        </div>

        {/* Dynamic Red Flags */}
        {analysis.matches?.length > 0 && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h3 className="text-lg font-semibold text-red-700">Critical Concerns Found</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.matches.map((match: any, idx: number) => (
                <span
                  key={idx}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                >
                  #{match.category}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Safety Verdict */}
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <h3 className="text-lg font-semibold text-orange-700">
              {analysis.status} - {analysis.status === 'Safe' ? 'No Major Risks' : 'Exercise Caution'}
            </h3>
          </div>
          <div className="w-full bg-orange-200 rounded-full h-2 mb-4">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: `${analysis.score}%` }}
            />
          </div>
          <p className="text-orange-700">
            Risk Score: {analysis.score}% | Confidence: {analysis.confidence}%
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/chat')}
          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-4"
        >
          <div className="bg-indigo-100 p-3 rounded-lg">
            <MessageSquare className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="flex-grow text-left">
            <h3 className="font-semibold text-gray-800">Ask Questions</h3>
            <p className="text-gray-600 text-sm">Chat with AI about specific concerns</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={() => navigate('/translator')}
          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-4"
        >
          <div className="bg-indigo-100 p-3 rounded-lg">
            <Languages className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="flex-grow text-left">
            <h3 className="font-semibold text-gray-800">View Full Translation</h3>
            <p className="text-gray-600 text-sm">See line-by-line plain English version</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}

export default SummaryScreen;
