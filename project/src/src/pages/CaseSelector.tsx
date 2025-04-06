
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import CategorySelector from '@/components/CategorySelector';
import GameCard, { GameCardProps } from '@/components/GameCard';

// Sample game cases data
const gameCases: GameCardProps[] = [
  {
    id: "case1",
    title: "The Missing NDA",
    difficulty: "Easy",
    timeEstimate: "15 mins",
    category: "Contracts",
    description: "Your client shared confidential information with a potential partner, but the NDA was never fully executed. Find a legal approach to protect your client's interests."
  },
  {
    id: "case2",
    title: "Copyright Conundrum",
    difficulty: "Medium",
    timeEstimate: "20 mins",
    category: "IP Law",
    description: "Your client's artwork was used without permission in a commercial campaign. Navigate the fair use doctrine to determine the best legal course of action."
  },
  {
    id: "case3",
    title: "Privacy Breach",
    difficulty: "Hard",
    timeEstimate: "30 mins",
    category: "Privacy",
    description: "A tech company has been collecting user data beyond what's specified in their privacy policy. Help users take legal action against the company."
  },
  {
    id: "case4",
    title: "The Alibi Evidence",
    difficulty: "Medium",
    timeEstimate: "25 mins",
    category: "Criminal",
    description: "You're defending a client accused of theft, but crucial alibi evidence was obtained through questionable means. Navigate the admissibility issues."
  },
  {
    id: "case5",
    title: "Equity Split Dispute",
    difficulty: "Hard",
    timeEstimate: "35 mins",
    category: "Startup Law",
    description: "Co-founders are disputing the equity split in their startup with no formal agreement in place. Help resolve the situation with legal precision."
  },
  {
    id: "case6",
    title: "The Verbal Contract",
    difficulty: "Easy",
    timeEstimate: "15 mins",
    category: "Contracts",
    description: "Your client made a business deal based on a verbal agreement that the other party is now denying. Find legal grounds to enforce the agreement."
  }
];

const CaseSelector = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const filteredCases = gameCases.filter(gameCase => {
    const matchesSearch = gameCase.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          gameCase.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || gameCase.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-legal-primary to-legal-dark">
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center mb-8">
            <Link to="/" className="mr-4 text-white hover:text-yellow-300 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold mb-2 text-white">Select a Case</h1>
              <p className="text-yellow-200">
                Choose a legal puzzle to solve from our collection of challenging scenarios.
              </p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-md p-6 mb-8 border border-white/20">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search bar */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-white/50"
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-white/50" />
              </div>
              
              {/* Filters */}
              <select 
                className="md:w-48 p-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            
            {/* Category selector */}
            <CategorySelector 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
            />
            
            {/* Cases grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCases.map((gameCase) => (
                <GameCard
                  key={gameCase.id}
                  {...gameCase}
                />
              ))}
              
              {filteredCases.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-white/70">No cases found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    className="text-yellow-300 mt-2"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-legal-dark text-white py-8 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">© 2025 Legal Escape Room. All rights reserved.</p>
            </div>
            
            <div className="flex space-x-6">
              <Link to="/about" className="text-gray-300 hover:text-yellow-300 transition-colors">About</Link>
              <Link to="/contact" className="text-gray-300 hover:text-yellow-300 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CaseSelector;
