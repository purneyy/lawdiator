import React, { useState } from 'react';
import { Scale, Scroll, BookOpen, Upload, Download, Copy, ThumbsUp, Loader2, BookText } from 'lucide-react';
import { sampleCases, LegalCase } from './cases';

const legalCategories = [
  "Constitutional Law",
  "Criminal Law",
  "Civil Law",
  "Corporate Law",
  "Human Rights",
  "Environmental Law",
  "Family Law",
  "Property Law"
];

function generateScript(caseData: LegalCase, style: string): string {
  if (!caseData) return '';

  const toneModifiers = {
    dramatic: {
      intro: "FADE IN:",
      setting: "In the hallowed chambers of justice, where history is written...",
      intensity: "intense",
      ending: "FADE TO BLACK."
    },
    serious: {
      intro: "INT. SUPREME COURT - DAY",
      setting: "The prestigious Supreme Court, where justice prevails...",
      intensity: "measured",
      ending: "THE END."
    },
    comedic: {
      intro: "SCENE 1 - WHERE JUSTICE MEETS JEST",
      setting: "Picture this: a courtroom that's seen it all...",
      intensity: "light-hearted",
      ending: "And that's how justice was served... with a side of irony!"
    }
  };

  const tone = toneModifiers[style as keyof typeof toneModifiers];

  return `${tone.intro}

${tone.setting}

NARRATOR (V.O.)
(${tone.intensity})
In the case of ${caseData.title}, justice faced one of its most defining moments.

SCENE 1 - THE CHALLENGE

PETITIONER
Your Honor, we stand before you today to challenge ${caseData.arguments.petitioners}

RESPONDENT
(firmly)
${caseData.arguments.respondents || "The state maintains its position..."}

SCENE 2 - THE DELIBERATION

JUDGE
(contemplative)
The questions before us are profound:
${caseData.legalQuestions.map(q => `- ${q}`).join('\n')}

SCENE 3 - THE VERDICT

CHIEF JUSTICE
(with gravitas)
After careful consideration, the court holds:
${caseData.decision.map(d => `- ${d}`).join('\n')}

NARRATOR (V.O.)
The legacy of this decision:
${caseData.legacy}

${tone.ending}`;
}

function generateStoryboard(caseData: LegalCase): string {
  if (!caseData) return '';

  return `STORYBOARD: ${caseData.title}

Panel 1: The Context
- Wide shot of the Supreme Court building
- Caption: "${caseData.background}"

Panel 2: The Challenge
- Split panel showing the opposing parties
- Left: The petitioners presenting their case
  "${caseData.arguments.petitioners}"
- Right: The respondents' stance
  "${caseData.arguments.respondents || 'The state presents its defense'}"

Panel 3: The Legal Questions
${caseData.legalQuestions.map((q, i) => `- Frame ${i + 1}: Visual representation of "${q}"`).join('\n')}

Panel 4: The Decision
- Montage of the judges delivering the verdict
${caseData.decision.map((d, i) => `- Panel ${i + 1}: "${d}"`).join('\n')}

Panel 5: The Impact
- Series of vignettes showing the legacy
- Caption: "${caseData.legacy}"

End Note: This case stands as a testament to the evolution of Indian jurisprudence.`;
}

function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [outputFormat, setOutputFormat] = useState('script');
  const [scriptStyle, setScriptStyle] = useState('dramatic');
  const [selectedCase, setSelectedCase] = useState<LegalCase | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string>('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase) return;

    setIsGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      const content = outputFormat === 'script' 
        ? generateScript(selectedCase, scriptStyle)
        : generateStoryboard(selectedCase);
      setGeneratedContent(content);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#4834d4] text-white">
      {/* Header */}
      <header className="bg-[#3525b0] py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-8 w-8" />
            <span className="text-2xl font-bold">Legal Tales</span>
          </div>
          <h1 className="text-2xl font-bold">AI Short Generator</h1>
          <nav className="space-x-4">
            <a href="#" className="hover:text-purple-200">Home</a>
            <a href="#" className="hover:text-purple-200">Examples</a>
            <a href="#" className="hover:text-purple-200">About</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleGenerate} className="space-y-8">
              {/* Case Input Section */}
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4">Case Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Case Name"
                    value={selectedCase?.title || ''}
                    onChange={(e) => setSelectedCase(null)}
                    className="w-full px-4 py-2 rounded bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                  <select
                    className="w-full px-4 py-2 rounded bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  >
                    <option value="">Select Legal Category</option>
                    {legalCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <textarea
                    placeholder="Brief Summary"
                    value={selectedCase?.background || ''}
                    onChange={(e) => setSelectedCase(null)}
                    className="w-full px-4 py-2 rounded bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-300 md:col-span-2"
                    rows={3}
                  />
                  <input
                    type="text"
                    placeholder="Key Players (Optional)"
                    className="w-full px-4 py-2 rounded bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                  <div className="flex items-center gap-4 bg-white/20 rounded px-4 py-2 cursor-pointer hover:bg-white/30 transition-colors">
                    <Upload className="h-5 w-5" />
                    <span>Upload Documents (Optional)</span>
                  </div>
                  <textarea
                    placeholder="Legal Issues"
                    value={selectedCase?.legalQuestions.join('\n') || ''}
                    onChange={(e) => setSelectedCase(null)}
                    className="w-full px-4 py-2 rounded bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-300 md:col-span-2"
                    rows={4}
                  />
                </div>
              </div>

              {/* Generation Options */}
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4">Story Options</h2>
                <div className="space-y-4">
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        value="script"
                        checked={outputFormat === 'script'}
                        onChange={(e) => setOutputFormat(e.target.value)}
                        className="text-purple-600"
                      />
                      <Scroll className="h-5 w-5" />
                      Script
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        value="storyboard"
                        checked={outputFormat === 'storyboard'}
                        onChange={(e) => setOutputFormat(e.target.value)}
                        className="text-purple-600"
                      />
                      <BookOpen className="h-5 w-5" />
                      Storyboard
                    </label>
                  </div>
                  <select
                    value={scriptStyle}
                    onChange={(e) => setScriptStyle(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 rounded bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  >
                    <option value="dramatic">Dramatic</option>
                    <option value="serious">Serious</option>
                    <option value="comedic">Comedic</option>
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                disabled={isGenerating || !selectedCase}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Generating Story...
                  </>
                ) : (
                  'Generate Story'
                )}
              </button>
            </form>

            {/* Output Section */}
            <div className="mt-8 bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Generated Content</h2>
                <div className="flex gap-4">
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!generatedContent}
                  >
                    <Download className="h-5 w-5" />
                    Download
                  </button>
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!generatedContent}
                    onClick={() => generatedContent && navigator.clipboard.writeText(generatedContent)}
                  >
                    <Copy className="h-5 w-5" />
                    Copy
                  </button>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 h-[32rem] overflow-y-auto font-mono whitespace-pre-wrap">
                {generatedContent || (
                  <p className="text-white/70">Select a case and generate content to see it here...</p>
                )}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <ThumbsUp className="h-5 w-5" />
                <span>Rate this generation</span>
              </div>
            </div>
          </div>

          {/* Sample Cases Section */}
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm h-fit">
            <div className="flex items-center gap-2 mb-4">
              <BookText className="h-6 w-6" />
              <h2 className="text-xl font-semibold">Sample Cases</h2>
            </div>
            <div className="space-y-4">
              {sampleCases.map((caseData, index) => (
                <div
                  key={index}
                  className="bg-white/5 p-4 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => setSelectedCase(caseData)}
                >
                  <h3 className="font-semibold mb-2">{caseData.title}</h3>
                  <p className="text-sm text-white/70 line-clamp-2">{caseData.background}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;