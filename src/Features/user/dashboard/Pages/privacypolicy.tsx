

import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/dashboard/profile')}
            className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Privacy Policy</h1>
          <div className="w-10 h-10"></div> {/* Spacer for center alignment */}
        </div>

      <section className="mb-8 p-6 bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl border border-cyan-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Introduction</h2>
        <p className="text-white leading-relaxed">
          We value your privacy and are committed to protecting your personal information. This privacy policy
          explains how we collect, use, and safeguard your data while using our app.
        </p>
      </section>

      <section className="mb-8 p-6 bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl border border-cyan-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Information Collection</h2>
        <p className="text-white leading-relaxed">
          Our app collects information you provide directly such as registration details, task completions, and
          payment information. We also collect usage data to improve the app experience.
        </p>
      </section>

      <section className="mb-8 p-6 bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl border border-cyan-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Use of Information</h2>
        <p className="text-white leading-relaxed">
          We use your information to provide, maintain, and improve our services, process payments, and communicate
          with you about your account, offers, and updates.
        </p>
      </section>

      <section className="mb-8 p-6 bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl border border-cyan-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Data Security</h2>
        <p className="text-white leading-relaxed">
          We implement strong security measures to protect your personal data against unauthorized access or
          disclosure.
        </p>
      </section>

      <section className="mb-8 p-6 bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl border border-cyan-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Your Rights</h2>
        <p className="text-white leading-relaxed">
          You have the right to access, update, or delete your personal data. Contact support for any privacy
          requests.
        </p>
      </section>

      <section className="p-6 bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl border border-cyan-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
        <p className="text-white leading-relaxed">If you have any questions about this policy, please contact our support team.</p>
      </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
