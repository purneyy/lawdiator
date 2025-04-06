import React from 'react';
import { Download, AlertTriangle } from 'lucide-react';

const POLICY_SECTIONS = [
  {
    original: "1. Data Collection and Usage\nWe collect various types of data including but not limited to your location, contacts, browsing history, and device information. This data may be shared with third-party partners for advertising purposes.",
    translation: "We track your location, contacts, and what you do online. We share this information with other companies who can use it to show you ads.",
    warning: true
  },
  {
    original: "2. Content Rights\nBy posting content on our platform, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content.",
    translation: "When you post something, you let us use, change, and share it however we want, without paying you.",
    warning: false
  },
  {
    original: "3. Account Termination\nWe reserve the right to terminate or suspend your account at any time, for any reason, without notice.",
    translation: "We can delete or freeze your account whenever we want without telling you why.",
    warning: true
  }
];

function TranslatorScreen() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Legal Jargon Translator</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Download className="w-5 h-5" />
            Download Translation
          </button>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for terms (e.g., 'arbitration', 'data')"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Content */}
        <div className="space-y-8">
          {POLICY_SECTIONS.map((section, index) => (
            <div key={index} className="border rounded-xl overflow-hidden">
              <div className="grid md:grid-cols-2 divide-x divide-gray-200">
                {/* Original Text */}
                <div className="p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Original Text</h3>
                  <p className="text-gray-800 whitespace-pre-line">{section.original}</p>
                </div>

                {/* Translation */}
                <div className="p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Plain English</h3>
                  <p className="text-gray-800">{section.translation}</p>
                  
                  {section.warning && (
                    <div className="mt-4 flex items-center gap-2 text-orange-600">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="text-sm">This clause may affect your rights</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TranslatorScreen;