
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, LightbulbIcon, Key, ArrowLeft, ArrowRight, Trophy, Check } from 'lucide-react';
import TutorialStep from '@/components/TutorialStep';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const tutorialSteps = [
  {
    title: "Read the Case",
    description: "Carefully review the legal scenario and identify the key facts and issues at play.",
    icon: <BookOpen className="h-8 w-8" />,
    tip: "Pay attention to dates, parties involved, and specific legal terminology used in the case."
  },
  {
    title: "Find the Loophole",
    description: "Analyze the information, laws, and contracts to discover potential weaknesses or opportunities.",
    icon: <Search className="h-8 w-8" />,
    tip: "Look for vague language, missing details, or conditions that weren't explicitly stated."
  },
  {
    title: "Use AI Hints",
    description: "If you're stuck, our LegalBot can provide hints to guide you in the right direction.",
    icon: <LightbulbIcon className="h-8 w-8" />,
    tip: "Don't overuse hints - each hint costs points from your final score!"
  },
  {
    title: "Escape the Trap",
    description: "Apply your legal knowledge to select the best solution and escape the legal predicament.",
    icon: <Key className="h-8 w-8" />,
    tip: "Remember that the most obvious solution isn't always the best one legally."
  }
];

const HowToPlay = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Add confetti effect when all steps are completed
  useEffect(() => {
    if (completed.length === tutorialSteps.length && !showSuccess) {
      setShowSuccess(true);
    }
  }, [completed]);
  
  const goToNextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowTip(false);
    }
  };
  
  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowTip(false);
    }
  };
  
  const markStepComplete = () => {
    if (!completed.includes(currentStep)) {
      setCompleted([...completed, currentStep]);
      
      // Add a little bounce animation to the success indicator
      const stepIndicator = document.getElementById(`step-${currentStep}`);
      if (stepIndicator) {
        stepIndicator.classList.add('animate-bounce');
        setTimeout(() => {
          stepIndicator?.classList.remove('animate-bounce');
        }, 1000);
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-legal-primary to-legal-dark">
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white animate-fade-in">How to Play</h1>
            <p className="text-yellow-200 max-w-2xl mx-auto animate-fade-in">
              Learn how to navigate the Legal Escape Room and overcome legal challenges with these simple steps.
            </p>
            {completed.length > 0 && (
              <div className="mt-4 inline-flex items-center text-white bg-legal-dark/30 rounded-full px-4 py-2 animate-fade-in">
                <Trophy className="w-5 h-5 mr-2 text-yellow-300" />
                <span>Progress: {Math.round((completed.length / tutorialSteps.length) * 100)}%</span>
              </div>
            )}
          </div>
          
          {showSuccess && (
            <Alert className="mb-8 border-green-500/50 bg-green-500/10 text-white animate-fade-in">
              <Check className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-300">Tutorial Completed!</AlertTitle>
              <AlertDescription className="text-white/80">
                You're ready to start solving legal puzzles. Good luck!
              </AlertDescription>
            </Alert>
          )}
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-md p-8 mb-8 border border-white/20 transition-all duration-300 hover:border-yellow-300/30 animate-fade-in">
            <div className="mb-8">
              <TutorialStep 
                title={tutorialSteps[currentStep].title}
                description={tutorialSteps[currentStep].description}
                icon={tutorialSteps[currentStep].icon}
                step={currentStep + 1}
              />
              
              {showTip && (
                <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-md text-white animate-fade-in">
                  <div className="font-medium text-yellow-300 mb-1 flex items-center">
                    <LightbulbIcon className="h-4 w-4 mr-2" />
                    Pro Tip
                  </div>
                  <p className="text-white/80">{tutorialSteps[currentStep].tip}</p>
                </div>
              )}
              
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() => setShowTip(!showTip)}
                  variant="outline"
                  className="mr-4 border-white/20 text-white hover:bg-white/10"
                >
                  {showTip ? "Hide Tip" : "Show Tip"}
                </Button>
                
                <Button
                  onClick={markStepComplete}
                  variant="outline"
                  className={`border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 ${
                    completed.includes(currentStep) ? "bg-yellow-400/10" : ""
                  }`}
                >
                  {completed.includes(currentStep) ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Completed
                    </>
                  ) : (
                    "Mark as Complete"
                  )}
                </Button>
              </div>
            </div>
            
            {/* Pagination dots */}
            <div className="flex justify-center mb-8">
              {tutorialSteps.map((_, index) => (
                <button
                  id={`step-${index}`}
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full mx-1 transition-all ${
                    index === currentStep 
                      ? 'bg-yellow-400 w-5' 
                      : completed.includes(index)
                        ? 'bg-green-400/70'
                        : 'bg-gray-400/30'
                  }`}
                />
              ))}
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-between">
              <button
                onClick={goToPrevStep}
                disabled={currentStep === 0}
                className={`flex items-center ${
                  currentStep === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-yellow-300 hover:text-yellow-200 transition-colors'
                }`}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Previous
              </button>
              
              {currentStep < tutorialSteps.length - 1 ? (
                <button
                  onClick={goToNextStep}
                  className="flex items-center text-yellow-300 hover:text-yellow-200 transition-colors"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              ) : (
                <Link to="/game/select" className="group bg-yellow-400 text-legal-dark py-2 px-6 rounded-md hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center">
                  Let's Start
                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex justify-center animate-fade-in">
            <Link to="/" className="text-white hover:text-yellow-300 transition-colors">
              <ArrowLeft className="h-4 w-4 inline mr-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="bg-legal-dark text-white py-8 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-5xl">
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

export default HowToPlay;
