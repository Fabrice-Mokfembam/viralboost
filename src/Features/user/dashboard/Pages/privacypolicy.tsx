

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-bg-main  max-w-3xl mx-auto text-text-secondary">
      <h1 className="text-3xl font-bold text-accent-cyan mb-6">Privacy Policy</h1>

      <section className="mb-6">
        <h2 className="text-xl font-bold text-text-primary mb-2">Introduction</h2>
        <p>
          We value your privacy and are committed to protecting your personal information. This privacy policy
          explains how we collect, use, and safeguard your data while using our app.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold text-text-primary mb-2">Information Collection</h2>
        <p>
          Our app collects information you provide directly such as registration details, task completions, and
          payment information. We also collect usage data to improve the app experience.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold text-text-primary mb-2">Use of Information</h2>
        <p>
          We use your information to provide, maintain, and improve our services, process payments, and communicate
          with you about your account, offers, and updates.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold text-text-primary mb-2">Data Security</h2>
        <p>
          We implement strong security measures to protect your personal data against unauthorized access or
          disclosure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold text-text-primary mb-2">Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal data. Contact support for any privacy
          requests.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-text-primary mb-2">Contact Us</h2>
        <p>If you have any questions about this policy, please contact our support team.</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
