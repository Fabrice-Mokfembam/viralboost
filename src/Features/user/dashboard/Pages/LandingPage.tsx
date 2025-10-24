import React from 'react';
import LandingPageNav from '../Components/LandingPage/LandingPageNav';
import HeroSection from '../Components/LandingPage/HeroSection';
import FeaturesSection from '../Components/LandingPage/FeaturesSection';
import HowItWorksSection from '../Components/LandingPage/HowItWorksSection';
import StatsSection from '../Components/LandingPage/StatsSection';
import TestimonialsSection from '../Components/LandingPage/TestimonialsSection';
import PricingSection from '../Components/LandingPage/PricingSection';
import CTASection from '../Components/LandingPage/CTASection';
import FooterSection from '../Components/LandingPage/FooterSection';
import Popups from '../Components/Popups';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main relative overflow-hidden">
      {/* Navigation */}
      <LandingPageNav />
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-10 w-24 h-24 bg-blue-500/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-1/4 w-28 h-28 bg-green-500/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/3 to-purple-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <HeroSection />
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        <StatsSection />
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <div id="pricing">
          <PricingSection />
        </div>
        <CTASection />
        <FooterSection />
      </div>
      
      {/* Notification Popups */}
      <Popups />
    </div>
  );
};

export default LandingPage;
