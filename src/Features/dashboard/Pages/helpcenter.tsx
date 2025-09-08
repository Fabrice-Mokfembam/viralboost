

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
  return (
    <div className="min-h-screen bg-bg-main max-w-4xl mx-auto text-text-secondary">
      <h1 className="text-3xl font-bold text-accent-cyan mb-8 text-center">Help Center</h1>
      <div className="space-y-6">
        {faqs.map(({ question, answer }, i) => (
          <div key={i} className="bg-bg-secondary rounded-xl p-6 shadow-md border border-cyan-500">
            <h2 className="text-xl font-semibold text-text-primary mb-2">{question}</h2>
            <p className="text-text-muted">{answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpCenter;
