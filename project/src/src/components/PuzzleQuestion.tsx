
import React, { useState } from 'react';
import { LightbulbIcon } from 'lucide-react';

interface AnswerOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface PuzzleQuestionProps {
  question: string;
  options: AnswerOption[];
  onSubmit: (answerId: string, isCorrect: boolean) => void;
}

const PuzzleQuestion: React.FC<PuzzleQuestionProps> = ({ 
  question, 
  options, 
  onSubmit
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer) {
      const selectedOption = options.find(o => o.id === selectedAnswer);
      if (selectedOption) {
        onSubmit(selectedAnswer, selectedOption.isCorrect);
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">What's your legal move?</h3>
      
      <p className="text-gray-700 mb-6">{question}</p>
      
      <div className="space-y-3 mb-6">
        {options.map((option) => (
          <div 
            key={option.id}
            className={`border rounded-md p-4 cursor-pointer transition-colors ${
              selectedAnswer === option.id 
                ? 'border-legal-primary bg-legal-primary bg-opacity-10' 
                : 'border-gray-200 hover:border-legal-primary'
            }`}
            onClick={() => setSelectedAnswer(option.id)}
          >
            <p className="text-gray-800">{option.text}</p>
          </div>
        ))}
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center">
        <button 
          onClick={() => setShowHint(!showHint)}
          className="flex items-center text-legal-primary mb-4 md:mb-0"
        >
          <LightbulbIcon className="h-5 w-5 mr-1" />
          Need Help? Ask LegalBot
        </button>
        
        <button 
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className={`legal-button ${!selectedAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Submit Answer
        </button>
      </div>
      
      {showHint && (
        <div className="mt-6 p-4 bg-legal-muted rounded-md animate-fade-in">
          <p className="text-sm font-medium text-legal-primary">LegalBot 🤖</p>
          <p className="text-gray-700 text-sm">
            Think about what specific clause might be relevant here. 
            Remember to consider what would be most beneficial for your client's position.
          </p>
        </div>
      )}
    </div>
  );
};

export default PuzzleQuestion;
