
import React from 'react';
import { CheckCircle, XCircle, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeedbackScreenProps {
  isCorrect: boolean;
  selectedAnswer: string;
  correctAnswer: string;
  explanation: string;
  pointsEarned: number;
  nextPuzzleId?: string;
}

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
  isCorrect,
  selectedAnswer,
  correctAnswer,
  explanation,
  pointsEarned,
  nextPuzzleId
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md animate-fade-in">
      <div className="text-center mb-6">
        {isCorrect ? (
          <div className="inline-flex items-center text-green-600 mb-2">
            <CheckCircle className="h-8 w-8 mr-2" />
            <h2 className="text-2xl font-bold">Correct!</h2>
          </div>
        ) : (
          <div className="inline-flex items-center text-red-600 mb-2">
            <XCircle className="h-8 w-8 mr-2" />
            <h2 className="text-2xl font-bold">Missed It</h2>
          </div>
        )}
        
        {isCorrect && (
          <div className="flex justify-center items-center text-legal-primary bg-legal-muted rounded-full px-4 py-2 mx-auto w-fit mb-4">
            <Award className="h-5 w-5 mr-2" />
            <span className="font-semibold">+{pointsEarned} XP</span>
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">Your Answer:</h3>
        <p className="bg-gray-100 p-3 rounded-md text-gray-800">{selectedAnswer}</p>
      </div>
      
      {!isCorrect && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Correct Answer:</h3>
          <p className="bg-green-50 p-3 rounded-md text-gray-800">{correctAnswer}</p>
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-2">Explanation:</h3>
        <div className="bg-legal-muted p-4 rounded-md">
          <p className="text-gray-800">{explanation}</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/" className="legal-button-outline text-center">
          Return to Home
        </Link>
        
        {nextPuzzleId && (
          <Link to={`/game/${nextPuzzleId}`} className="legal-button text-center">
            Next Puzzle
          </Link>
        )}
      </div>
    </div>
  );
};

export default FeedbackScreen;
