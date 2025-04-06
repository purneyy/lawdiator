import React from 'react';
import { FileText, Calendar, AlertTriangle, CheckCircle, Download } from 'lucide-react';

const HISTORY_ITEMS = [
  {
    id: 1,
    filename: "Social Media Terms.pdf",
    date: "2024-03-15",
    verdict: "suspicious",
    summary: "Contains data sharing and tracking clauses"
  },
  {
    id: 2,
    filename: "App Privacy Policy.pdf",
    date: "2024-03-14",
    verdict: "safe",
    summary: "Standard terms with clear data protection"
  }
];

function HistoryScreen() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Analysis History</h1>
          <p className="text-gray-500">Your documents are not stored permanently</p>
        </div>

        <div className="space-y-4">
          {HISTORY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-6 hover:border-indigo-200 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-gray-600" />
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">{item.filename}</h3>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{item.summary}</p>

                  <div className="flex items-center gap-4">
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                        item.verdict === 'safe'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {item.verdict === 'safe' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <AlertTriangle className="w-4 h-4" />
                      )}
                      <span className="capitalize">{item.verdict}</span>
                    </div>
                  </div>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors">
                  <Download className="w-5 h-5" />
                  Download Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HistoryScreen;