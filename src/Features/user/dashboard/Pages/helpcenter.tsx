

import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const faqs = [
  {
    question: 'How do I complete tasks correctly?',
    answer: 'Follow the detailed instructions on each task page carefully and upload valid proof images.',
  },
  {
    question: 'How long does withdrawal take?',
    answer: 'Withdrawals typically process within 3-5 business days depending on the method.',
  },
  {
    question: 'How can I maximize my earnings?',
    answer:
      'Complete as many daily tasks as possible, invite friends using your referral code, and upgrade membership for more benefits.',
  },
];

const HelpCenter = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/dashboard/profile')}
            className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Help Center</h1>
          <div className="w-10 h-10"></div> {/* Spacer for center alignment */}
        </div>
      <div className="space-y-6">
        {faqs.map(({ question, answer }, i) => (
          <div key={i} className="bg-bg-secondary rounded-xl p-6 shadow-md border border-cyan-500">
            <h2 className="text-xl font-semibold text-text-primary mb-2">{question}</h2>
            <p className="text-text-muted">{answer}</p>
          </div>
        ))}
      </div>
      
      {/* Report a Problem Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/v/report-problem')}
          className="bg-cyan-500 hover:bg-cyan-600 text-text-primary font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors"
        >
          Report a Problem
        </button>
      </div>
      </div>
    </div>
  );
};

export default HelpCenter;
