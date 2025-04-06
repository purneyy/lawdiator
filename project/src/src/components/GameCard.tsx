
import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface GameCardProps {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeEstimate: string;
  category: string;
  description: string;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  difficulty,
  timeEstimate,
  category,
  description
}) => {
  const difficultyColor = 
    difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
    difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
    'bg-red-100 text-red-800';

  return (
    <div className="legal-card">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${difficultyColor}`}>
          {difficulty}
        </span>
        <span className="text-xs flex items-center text-gray-500">
          <Clock className="h-3 w-3 mr-1" /> {timeEstimate}
        </span>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <span className="inline-block bg-legal-muted text-legal-primary text-xs px-2 py-1 rounded mb-3">
        {category}
      </span>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
      
      <Link 
        to={`/game/${id}`}
        className="legal-button inline-block text-center"
      >
        Play Now
      </Link>
    </div>
  );
};

export default GameCard;
