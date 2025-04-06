
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Clock, ArrowLeft } from 'lucide-react';
import PuzzleQuestion from '@/components/PuzzleQuestion';
import FeedbackScreen from '@/components/FeedbackScreen';

// Mock case data - in a real app, this would come from a database or API
const casesData = {
  "case1": {
    title: "The Missing NDA",
    description: "Your startup client, TechInnovate, shared confidential product design information with a potential manufacturing partner, GlobalMakers, during a meeting. Your client intended to have an NDA signed before the meeting, but in the rush of preparation, the document was never fully executed. Three months later, GlobalMakers launches a remarkably similar product. Your client is devastated and wants to take legal action.",
    context: "TechInnovate is a small startup with limited resources. They have email correspondence where GlobalMakers acknowledged receiving the NDA draft and promised to sign it after legal review. The meeting agenda also noted 'NDA discussion' as the first item.",
    question: "What is your best legal approach to protect your client's interests?",
    options: [
      {
        id: "a",
        text: "Argue that an implied confidentiality agreement exists based on the context of the meeting and industry standards",
        isCorrect: true
      },
      {
        id: "b",
        text: "File for immediate patent protection on the product design",
        isCorrect: false
      },
      {
        id: "c",
        text: "Claim copyright infringement on the product design documents",
        isCorrect: false
      },
      {
        id: "d",
        text: "Assert that the draft NDA is binding since GlobalMakers acted as if it was in effect",
        isCorrect: false
      }
    ],
    explanation: "Courts often recognize implied confidentiality obligations in business contexts where the nature of the shared information would reasonably be understood as confidential. The email acknowledgment, meeting agenda reference to the NDA, and industry norms for protecting new product designs all support this approach. Unlike option D, you don't need to prove the draft NDA was binding, which would be difficult without signatures. Patent protection (option B) takes too long and may not be possible if details have been disclosed. Copyright (option C) typically protects expression, not functional designs or ideas.",
    pointsEarned: 150,
    nextPuzzleId: "case2"
  },
  "case2": {
    title: "Copyright Conundrum",
    description: "Your client, a digital artist, discovered that their artwork was used in a major advertising campaign without permission. The company that used the artwork claims it falls under 'fair use' because they modified it substantially.",
    context: "The artwork was featured prominently in a national advertising campaign for a luxury product. While some color changes were made, the core design elements are clearly recognizable as your client's work.",
    question: "What factor is most likely to defeat the company's fair use defense?",
    options: [
      {
        id: "a",
        text: "The use was transformative and created something new",
        isCorrect: false
      },
      {
        id: "b",
        text: "The commercial nature of the use in an advertising campaign",
        isCorrect: true
      },
      {
        id: "c",
        text: "The amount of the original work used",
        isCorrect: false
      },
      {
        id: "d",
        text: "The fact that your client is a professional artist",
        isCorrect: false
      }
    ],
    explanation: "While all four factors of fair use analysis are important, the commercial nature of the use (factor 2) is particularly damaging to the company's defense in this case. Using an artist's work in a commercial advertising campaign for a luxury product has a clear profit motive and competes with the market for licensed artwork. Courts are much less likely to find fair use when the secondary use is purely commercial rather than educational, transformative, or for commentary.",
    pointsEarned: 200,
    nextPuzzleId: "case3"
  },
  "case3": {
    title: "Privacy Breach",
    description: "Your client, a tech startup called PrivacyFirst, discovers that a major social media platform has been collecting and selling their users' data beyond what was specified in their privacy policy. Many of your client's customers were affected and are seeking legal advice.",
    context: "The privacy policy clearly states that user data would only be used for 'improving platform services' but evidence shows the data was sold to third-party advertisers. The platform recently updated its terms of service, adding a clause claiming retroactive rights to use previously collected data for any purpose.",
    question: "What is the strongest legal claim your clients have against the social media platform?",
    options: [
      {
        id: "a",
        text: "Breach of implied warranty of merchantability",
        isCorrect: false
      },
      {
        id: "b",
        text: "Violation of the First Amendment",
        isCorrect: false
      },
      {
        id: "c",
        text: "Breach of contract based on violation of the privacy policy",
        isCorrect: true
      },
      {
        id: "d",
        text: "Criminal fraud charges",
        isCorrect: false
      }
    ],
    explanation: "Privacy policies are legally binding contracts between companies and users. When users agree to a privacy policy, they consent to data collection and use only under the specified terms. Selling data to third parties when the policy explicitly limited use to 'improving platform services' constitutes a clear breach of contract. The retroactive clause in the updated terms is likely unenforceable, as it attempts to change the terms of an existing agreement without new consideration. Options A and B are not relevant to privacy violations, and option D involves criminal law, which requires prosecution by the state rather than civil action by users.",
    pointsEarned: 250,
    nextPuzzleId: "case4"
  },
  "case4": {
    title: "The Alibi Evidence",
    description: "You're defending a client accused of shoplifting. Your client insists they were at a coffee shop several blocks away at the time of the alleged crime. A private investigator you hired obtained security footage from the coffee shop by pretending to be a police officer, which clearly shows your client there during the time of the incident.",
    context: "The prosecution's case relies heavily on an eyewitness who claims to have seen your client leaving the store with unpaid merchandise. The store's own security cameras were not functioning that day. Your client has no prior criminal record.",
    question: "How should you handle the illegally obtained coffee shop security footage?",
    options: [
      {
        id: "a",
        text: "Submit the footage as evidence but don't reveal how it was obtained",
        isCorrect: false
      },
      {
        id: "b",
        text: "Use the footage's existence to negotiate with the prosecution without submitting it",
        isCorrect: true
      },
      {
        id: "c",
        text: "Have your client testify about being at the coffee shop but don't mention the footage",
        isCorrect: false
      },
      {
        id: "d",
        text: "Submit the footage and argue that private citizens aren't bound by the same evidence rules as police",
        isCorrect: false
      }
    ],
    explanation: "The footage was obtained through impersonation of a police officer, which is illegal and raises serious ethical issues. Option B allows you to use knowledge of the footage's existence in negotiations without the ethical and legal problems of submitting illegally obtained evidence. This approach also avoids making false statements to the court (option A) or presenting incomplete witness testimony (option C). Option D is incorrect because while the exclusionary rule primarily applies to government actors, evidence obtained through illegal means by private investigators working for the defense can still be excluded, especially when it involves impersonating an officer.",
    pointsEarned: 300,
    nextPuzzleId: "case5"
  },
  "case5": {
    title: "Equity Split Dispute",
    description: "Three friends—Alex, Bailey, and Cameron—founded a tech startup two years ago. They verbally agreed to split ownership equally, but never formalized this in writing. Alex wrote the initial code, Bailey designed the product, and Cameron secured funding through personal connections. Now that the company is about to be acquired for $30 million, Alex (who has been CEO) claims he deserves 50% equity, with Bailey and Cameron splitting the remainder.",
    context: "All three have worked full-time at the company since its founding. Email exchanges from the early days reference an 'equal partnership' but the specifics of equity were never formalized. The company has been operating as an LLC with minimal documentation beyond the articles of organization, which don't specify ownership percentages.",
    question: "What is the most equitable legal solution to this dispute?",
    options: [
      {
        id: "a",
        text: "Apply the doctrine of promissory estoppel to enforce the original verbal agreement of equal ownership",
        isCorrect: true
      },
      {
        id: "b",
        text: "Award Alex 50% as CEO and split the remainder between Bailey and Cameron",
        isCorrect: false
      },
      {
        id: "c",
        text: "Determine ownership based on capital contributions only",
        isCorrect: false
      },
      {
        id: "d",
        text: "Void all ownership claims and distribute profits based on a quantum meruit theory",
        isCorrect: false
      }
    ],
    explanation: "The original verbal agreement for equal partnership, reinforced by email exchanges, created a reasonable expectation that all three founders would receive equal shares. The doctrine of promissory estoppel can enforce promises that parties relied upon to their detriment, even without formal contracts. All three founders contributed substantial value (code, design, funding) and worked full-time based on this understanding. Option B ignores the founders' apparent agreement and overvalues the CEO title. Option C incorrectly focuses only on capital, ignoring intellectual contributions and sweat equity. Option D (quantum meruit) is inappropriate when there's evidence of a specific agreement about ownership percentages.",
    pointsEarned: 350,
    nextPuzzleId: "case6"
  },
  "case6": {
    title: "The Verbal Contract",
    description: "Your client verbally agreed to provide marketing services to a local business for six months at $5,000 per month. After three successful months, the business owner suddenly claims no agreement existed and refuses to pay for the last month's completed work. No written contract exists, but your client has email discussions about project details, invoice payments for the first two months, and testimonials from the business owner praising the work.",
    context: "The business owner now alleges that they were only 'trying out' the marketing services on a month-to-month basis with no commitment. Your client turned down other projects to focus on this work and has messages showing discussions of 'our six-month marketing strategy.'",
    question: "What is your strongest legal argument to enforce payment?",
    options: [
      {
        id: "a",
        text: "The verbal contract is enforceable because marketing services can reasonably be performed within one year",
        isCorrect: true
      },
      {
        id: "b",
        text: "File a trademark infringement claim for using your client's marketing materials",
        isCorrect: false
      },
      {
        id: "c",
        text: "Argue that a written contract was actually formed through the email exchanges",
        isCorrect: false
      },
      {
        id: "d",
        text: "Claim that the business committed fraud by never intending to honor the agreement",
        isCorrect: false
      }
    ],
    explanation: "Verbal contracts are enforceable if they don't violate the Statute of Frauds, which requires written contracts for agreements that cannot be performed within one year. A six-month marketing agreement can be performed within one year, making it enforceable even without a formal written contract. The partial performance (three months of services and two months of payments), email discussions about the six-month strategy, and testimonials all provide strong evidence that an agreement existed. While the emails might constitute evidence of an agreement (option C), they likely don't form a complete contract themselves. Options B and D would be difficult to prove and are not directly relevant to enforcing the basic agreement to pay for services rendered.",
    pointsEarned: 150,
    nextPuzzleId: "case1"
  }
};

const GamePlay = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [stage, setStage] = useState<'story' | 'puzzle' | 'feedback'>('story');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  
  // Get the case data based on the ID from URL
  const caseData = id ? casesData[id as keyof typeof casesData] : null;
  
  // Handle if case doesn't exist
  useEffect(() => {
    if (!caseData && id) {
      navigate('/game/select');
    }
  }, [caseData, id, navigate]);
  
  if (!caseData) {
    return <div>Loading...</div>;
  }
  
  const handleAnswerSubmit = (answerId: string, correct: boolean) => {
    setSelectedAnswer(answerId);
    setIsCorrect(correct);
    setStage('feedback');
  };
  
  const getSelectedAnswerText = () => {
    const option = caseData.options.find(opt => opt.id === selectedAnswer);
    return option ? option.text : '';
  };
  
  const getCorrectAnswerText = () => {
    const option = caseData.options.find(opt => opt.isCorrect);
    return option ? option.text : '';
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-legal-primary to-legal-dark">
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-6">
            <button 
              onClick={() => navigate('/game/select')}
              className="flex items-center text-yellow-300 hover:text-yellow-200 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Cases
            </button>
            
            <h1 className="text-2xl md:text-3xl font-bold text-white">{caseData.title}</h1>
            
            <div className="flex items-center text-sm text-yellow-200/70 mt-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>Estimated time: 15-20 minutes</span>
            </div>
          </div>
          
          {stage === 'story' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-md p-6 mb-8 animate-fade-in border border-white/20">
              <div className="flex items-start mb-6">
                <FileText className="h-6 w-6 text-yellow-300 mr-2 mt-1" />
                <h2 className="text-xl font-semibold text-white">Case Scenario</h2>
              </div>
              
              <div className="mb-6">
                <p className="text-white/90 mb-4 leading-relaxed">
                  {caseData.description}
                </p>
                
                <div className="bg-legal-dark/40 p-4 rounded-md mb-4 border border-white/10">
                  <h3 className="font-semibold text-yellow-300 mb-2">Quick Facts</h3>
                  <p className="text-white/80">
                    {caseData.context}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setStage('puzzle')}
                className="bg-yellow-400 text-legal-dark py-3 px-8 rounded-md font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Proceed to Puzzle
              </button>
            </div>
          )}
          
          {stage === 'puzzle' && (
            <div className="animate-fade-in">
              <PuzzleQuestion 
                question={caseData.question}
                options={caseData.options}
                onSubmit={handleAnswerSubmit}
              />
            </div>
          )}
          
          {stage === 'feedback' && (
            <FeedbackScreen 
              isCorrect={isCorrect}
              selectedAnswer={getSelectedAnswerText()}
              correctAnswer={getCorrectAnswerText()}
              explanation={caseData.explanation}
              pointsEarned={caseData.pointsEarned}
              nextPuzzleId={caseData.nextPuzzleId}
            />
          )}
        </div>
      </main>
      
      <footer className="bg-legal-dark text-white py-8 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-5xl">
          <p className="text-gray-400 text-sm text-center">© 2025 Legal Escape Room. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default GamePlay;
