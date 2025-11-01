

import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyAbout = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main">
      <div className="max-w-4xl mx-auto lg:px-12 px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/dashboard/profile')}
            className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">About Us</h1>
          <div className="w-10 h-10"></div> {/* Spacer for center alignment */}
        </div>

      {/* About Us */}
      <section className="mb-10">
        <p className="leading-relaxed text-text-secondary text-lg mb-6">
          We believe everyone deserves a chance to grow, earn, and be seen. Our mission is to connect brands with real people through authentic promotion opportunities — empowering individuals to earn money while helping businesses reach wider audiences.
        </p>
        <p className="leading-relaxed text-text-secondary text-lg mb-6">
          We provide a trusted platform where members can collaborate with brands they love, share meaningful content, and get rewarded for their influence. Whether you're a content creator, social media enthusiast, or simply someone passionate about sharing great products, we make it easy for you to turn your engagement into income.
        </p>
        <p className="leading-relaxed text-text-secondary text-lg">
          For brands, we're a bridge to genuine promotion. For people, we're a path to earning potential. Together, we create win-win partnerships that inspire growth, trust, and success.
        </p>
      </section>

      {/* Our Location */}
      <section>
        <h2 className="text-3xl font-bold text-text-primary mb-4 border-b border-cyan-500 pb-2">Our Location</h2>
        <p className="leading-relaxed text-text-secondary text-lg mb-6">
          Headquartered in Sacramento, California, our US-based company operates with a global perspective, leveraging technology and
          partnerships to serve users worldwide. We combine innovation with authentic connections to help brands and individuals
          create meaningful partnerships that drive success.
        </p>
        <div className="h-64 rounded-lg border border-cyan-500 overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3125.8669276970837!2d-121.49438568465662!3d38.58157197965118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac672b28397f9%3A0x921f6aaa74197fdb!2sSacramento%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1694219881234!5m2!1sen!2s"
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
    </div>
  );
};

export default CompanyAbout;
