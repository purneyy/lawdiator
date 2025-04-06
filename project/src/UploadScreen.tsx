import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FileText, ArrowRight, AlertTriangle } from 'lucide-react';
import { analyzePolicyText } from '../utils/policyAnalyzer';

function UploadScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<ReturnType<typeof analyzePolicyText> | null>(null);

  React.useEffect(() => {
    if (searchParams.get('demo')) {
      setText(`Terms of Service for Social Media Platform

1. Data Collection and Usage
We collect various types of data including but not limited to your location, contacts, browsing history, and device information. This data may be shared with third-party partners for advertising purposes.

2. Content Rights
By posting content on our platform, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content.

3. Account Termination
We reserve the right to terminate or suspend your account at any time, for any reason, without notice.

4. Dispute Resolution
Any disputes will be resolved through binding arbitration. You waive your right to participate in class action lawsuits.

5. Changes to Terms
We may modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.

6. Privacy Settings
Default privacy settings are public. Users are responsible for managing their privacy settings.

7. Age Restrictions
Users must be at least 13 years old to use this service. Users between 13-18 require parental consent.

8. Advertising
We display personalized ads based on your activity and information. Ad blockers are not permitted.

9. Data Retention
We retain your data indefinitely, even after account deletion, for analytical and legal purposes.

10. Automatic Renewal
Premium subscriptions auto-renew. Cancellation must be done 24 hours before renewal to avoid charges.`);
    }
  }, [searchParams]);

  React.useEffect(() => {
    if (text.length > 50) {
      const result = analyzePolicyText(text);
      setAnalysis(result);
    } else {
      setAnalysis(null);
    }
  }, [text]);

  const handleAnalyze = () => {
    if (analysis) {
      // Store analysis in sessionStorage for the summary screen
      sessionStorage.setItem('policyAnalysis', JSON.stringify(analysis));
    }
    navigate('/summary');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-800">Paste Your Policy</h1>
        </div>

        {/* Text Input */}
        <div className="mb-8">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-96 p-6 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-gray-700"
            placeholder="Paste your policy text here..."
          />
        </div>

        {/* Analysis Preview */}
        {analysis && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                  analysis.status === 'Safe'
                    ? 'bg-green-100 text-green-700'
                    : analysis.status === 'Suspicious'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                {analysis.status}
              </div>
              <span className="text-sm text-gray-500">
                Risk Score: {analysis.score}%
              </span>
              <span className="text-sm text-gray-500">
                Confidence: {analysis.confidence}%
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.matches.map(({ category }, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                >
                  #{category}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Character Count */}
        <div className="mb-8 text-sm text-gray-500">
          Characters: {text.length}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setText('')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={() => navigate('/upload?demo=true')}
            className="px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Use Demo
          </button>
          <div className="flex-grow" />
          <button
            onClick={handleAnalyze}
            disabled={!text}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-colors
              ${text
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            Analyze Policy
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadScreen;