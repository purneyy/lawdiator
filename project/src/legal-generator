import  { useState } from 'react';
import { Scale, Loader2, BookOpen } from 'lucide-react';
import axios from 'axios';

function App() {
  const [scene, setScene] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  interface ResultType {
    title: string;
    scene: string;
    laws: string;
    outcome: string;
  }

  const [result, setResult] = useState<ResultType | null>(null);

  const samplePrompts = [
    { emoji: '👑', text: 'அரசன் ஆட்சி செய்ய தவறினால் கண்ணகி வழக்கு தொடர்ந்திருந்தால்?' },
    { emoji: '🧠', text: 'அந்நியன் IPC பிரிவுகளின் கீழ் கைது செய்யப்பட்டால் என்னவாகும்?' },
    { emoji: '⚖️', text: 'ஜெய் பீம் வழக்கில் போலீசாருக்கு எதிராக சம்பா உரிமை மனு அளித்திருந்தால்?' },
    { emoji: '🚓', text: 'What if Vikram Vedha’s Vedha was tried for self-defense under IPC Section 96?' },
    { emoji: '🔥', text: 'If Velu from Pudhupettai used RTI and legal tools instead of gang violence?' }
  ];

  const handleGenerate = async () => {
    if (!scene.trim()) return;
    setIsLoading(true);
    setResult(null);
  
    try {
      const response = await axios.post("http://localhost:5000/generate", { scene });
  
      const output = response.data;
  
      setResult({
        title: output.title || 'Untitled',
        scene: output.rewrittenScene || '', // <-- Mapped from backend
        laws: output.applicableLaws || 'Not specified', // <-- Mapped from backend
        outcome: output.realLifeOutcome || 'Not specified' // <-- Mapped from backend
      });
    } catch (error) {
      console.error('Error:', error);
      setResult({
        title: 'Error',
        scene: '',
        laws: '',
        outcome: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-700 to-indigo-900">
      <header className="pt-8 pb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Scale className="w-8 h-8 text-white" />
          <h1 className="text-3xl font-bold text-white">Legaluna What-If Generator</h1>
        </div>
        <p className="text-indigo-200">Reimagining Fictional Scenes with Real Indian Laws</p>
      </header>

      <main className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">
            Type or Paste a Movie, Mythology, or Historical Scene (Tamil or English)
          </label>
          <textarea
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Eg: அந்நியன் கைது செய்யப்பட்டிருந்தால் எப்படி சட்டப்படி நடந்திருக்கும்?"
            value={scene}
            onChange={(e) => setScene(e.target.value)}
          />

          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setScene(prompt.text)}
                  className="text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full transition-colors"
                >
                  {prompt.emoji} {prompt.text}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !scene}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <BookOpen className="w-5 h-5" />
                Rewrite with Indian Law
              </>
            )}
          </button>
        </div>

        {result && (
  <div className="bg-white rounded-lg shadow-xl p-6 mb-8 space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        🎬 Title
      </h3>
      <input
        readOnly
        value={result.title}
        className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
      />
    </div>

    <div>
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        🧠 Rewritten Scene
      </h3>
      <textarea
        readOnly
        value={result.scene}
        className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 whitespace-pre-line h-40"
      />
    </div>

    <div>
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        📜 Applicable Laws
      </h3>
      <textarea
        readOnly
        value={result.laws}
        className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 whitespace-pre-line h-32"
      />
    </div>

    <div>
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        ⚖️ Real-Life Outcome
      </h3>
      <textarea
        readOnly
        value={result.outcome}
        className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 whitespace-pre-line h-32"
      />
    </div>
  </div>
)}
      </main>
    </div>
  );
}

export default App;
