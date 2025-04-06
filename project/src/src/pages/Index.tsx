
import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, BookOpen, Trophy, ArrowRight, Sparkles, Star, Award } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-legal-primary to-legal-dark">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 animate-fade-in">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Scale className="h-12 w-12 mr-3 text-yellow-300" />
                <h1 className="text-4xl md:text-5xl font-bold text-white">Legal Escape Room</h1>
                <Sparkles className="h-10 w-10 ml-3 text-yellow-300" />
              </div>
              
              <p className="text-2xl mb-8 text-yellow-200 font-semibold">Can you outsmart the law?</p>
              
              <div className="max-w-2xl mx-auto">
                <p className="mb-8 text-white text-lg">
                  Put your legal knowledge to the test in our interactive escape room. 
                  Solve legal puzzles, find loopholes, and beat the system in this 
                  challenging and educational game.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/game/select" className="bg-yellow-400 text-legal-dark py-3 px-8 rounded-md font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center">
                  <Star className="h-5 w-5 mr-2" />
                  Start Game
                </Link>
                <Link to="/how-to-play" className="border-2 border-white text-white py-3 px-8 rounded-md font-bold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  How to Play
                </Link>
              </div>
              
              <div className="flex justify-center">
                <div className="bg-legal-muted/20 backdrop-blur-sm p-4 rounded-lg border border-white/10 shadow-xl animate-pulse">
                  <div className="flex items-center text-white">
                    <Award className="h-6 w-6 text-yellow-300 mr-2" />
                    <span className="font-bold">NEW PLAYER BONUS: +500 XP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Daily Challenge Banner */}
        <section className="py-6 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center border border-white/20">
              <div>
                <span className="text-sm font-semibold text-yellow-300">DAILY PUZZLE</span>
                <h2 className="text-xl font-bold text-white">Escape The NDA Trap</h2>
                <p className="text-white/80">Find the loophole in this tricky non-disclosure agreement</p>
              </div>
              <Link to="/game/daily" className="bg-legal-light text-white py-2 px-6 rounded-md hover:bg-legal-primary transition-all duration-300 flex items-center mt-4 sm:mt-0 transform hover:scale-105 shadow-lg">
                Play Now <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold text-center mb-12 text-white">Why Play Legal Escape Room?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <div className="bg-legal-dark w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-4 border-2 border-yellow-400">
                  <BookOpen className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white text-center">Learn Real Law</h3>
                <p className="text-white/70 text-center">Understand legal concepts through practical, engaging puzzles</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <div className="bg-legal-dark w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-4 border-2 border-yellow-400">
                  <Trophy className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white text-center">Earn Points & Badges</h3>
                <p className="text-white/70 text-center">Compete with others and showcase your legal expertise</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <div className="bg-legal-dark w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-4 border-2 border-yellow-400">
                  <Scale className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white text-center">Think Like a Lawyer</h3>
                <p className="text-white/70 text-center">Develop critical thinking and analytical reasoning skills</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-legal-dark text-white py-8 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <Scale className="h-6 w-6 mr-2 text-yellow-300" />
                <span className="text-xl font-bold">Legaluna</span>
              </div>
              <p className="text-gray-400 text-sm">© 2025 Legal Escape Room. All rights reserved.</p>
            </div>
            
            <div className="flex space-x-6">
              <Link to="/about" className="text-gray-300 hover:text-yellow-300 transition-colors">About</Link>
              <Link to="/contact" className="text-gray-300 hover:text-yellow-300 transition-colors">Contact</Link>
              <Link to="/privacy" className="text-gray-300 hover:text-yellow-300 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-300 hover:text-yellow-300 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
