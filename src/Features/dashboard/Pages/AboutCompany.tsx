

const CompanyAbout = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-6 max-w-4xl mx-auto text-gray-300">
      <h1 className="text-4xl font-extrabold text-cyan-400 mb-8 text-center">About Us</h1>

      {/* Our Mission */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-4 border-b border-cyan-500 pb-2">
          Our Mission
        </h2>
        <p className="leading-relaxed text-gray-300 text-lg">
          Our mission is to empower individuals worldwide to earn from simple, everyday online tasks with ease,
          trust, and transparency. We provide a platform that democratizes earning opportunities, connecting
          people with micro-tasks that fit their busy lives while rewarding them fairly and promptly.
        </p>
      </section>

      {/* Our Vision */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-4 border-b border-cyan-500 pb-2">Our Vision</h2>
        <p className="leading-relaxed text-gray-300 text-lg">
          We envision a world where anyone, regardless of background or location, can access flexible earning options
          online. Through innovation and user-centric design, we aim to be the trusted hub for micro-tasking that
          fosters financial inclusion, skill growth, and rewarding work experiences globally.
        </p>
      </section>

      {/* Our Values */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-4 border-b border-cyan-500 pb-2">Our Core Values</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-2 text-lg leading-relaxed">
          <li><strong>Integrity:</strong> We maintain transparency and fairness in all our processes.</li>
          <li><strong>Empowerment:</strong> Providing easy access to earning opportunities for all individuals.</li>
          <li><strong>Customer Centricity:</strong> Putting our users’ experience and success at the forefront.</li>
          <li><strong>Innovation:</strong> Continuously improving our platform to offer engaging and valuable tasks.</li>
          <li><strong>Community:</strong> Building a supportive network of users, partners, and collaborators worldwide.</li>
        </ul>
      </section>

      {/* Our Location */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-4 border-b border-cyan-500 pb-2">Our Location</h2>
        <p className="leading-relaxed text-gray-300 text-lg mb-6">
          Headquartered in Lagos, Nigeria, our company operates with a global perspective, leveraging technology and
          partnerships to serve users worldwide. We combine local insight with international ambition so users
          everywhere can thrive in the digital gig economy.
        </p>
        <div className="h-64 rounded-lg border border-cyan-500 overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.359802387471!2d3.379204115318445!3d6.524379495258559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf44d8fecc3a1%3A0xd72db7665301b224!2sLagos!5e0!3m2!1sen!2sng!4v1694219881234!5m2!1sen!2sng"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Company Location"
          />
        </div>
      </section>
    </div>
  );
};

export default CompanyAbout;
