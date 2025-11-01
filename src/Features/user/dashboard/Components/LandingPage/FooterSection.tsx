import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Linkedin,
  Shield,
  Lock,
  Users,
  HelpCircle,
  FileText,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FooterSection: React.FC = () => {
  const navigate = useNavigate();

  const footerLinks = {
    platform: [
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Testimonials', href: '#testimonials' }
    ],
    support: [
      { name: 'Help Center', href: '/v/helpcenter' },
      { name: 'Contact Us', href: '/v/helpcenter' },
      { name: 'FAQ', href: '/v/helpcenter' },
      { name: 'Report Problem', href: '/v/report-problem' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/v/privacypolicy' },
      { name: 'Terms of Service', href: '/v/privacypolicy' },
      { name: 'Cookie Policy', href: '/v/privacypolicy' },
      { name: 'Refund Policy', href: '/v/privacypolicy' }
    ],
    company: [
      { name: 'About Us', href: '/v/aboutcompany' },
      { name: 'Careers', href: '/v/aboutcompany' },
      { name: 'Blog', href: '/v/aboutcompany' },
      { name: 'Press', href: '/v/aboutcompany' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: <Facebook size={20} />, href: '#' },
    { name: 'Twitter', icon: <Twitter size={20} />, href: '#' },
    { name: 'Instagram', icon: <Instagram size={20} />, href: '#' },
    { name: 'YouTube', icon: <Youtube size={20} />, href: '#' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, href: '#' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <footer className="bg-gradient-to-br from-bg-secondary to-bg-tertiary border-t border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-text-primary mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  ViralBoast
                </h3>
                <p className="text-text-muted leading-relaxed mb-6">
                  The leading platform for earning through social media engagement. 
                  Join thousands of users who are already building their income streams with ViralBoast.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-cyan-400" />
                    <span className="text-text-muted text-sm">support@viralboast.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-cyan-400" />
                    <span className="text-text-muted text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-cyan-400" />
                    <span className="text-text-muted text-sm">Global Platform</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-cyan-500 hover:to-blue-500 rounded-xl flex items-center justify-center text-text-muted hover:text-white transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Platform Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold text-text-primary mb-4">Platform</h4>
              <ul className="space-y-3">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-text-muted hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
                    >
                      {link.name}
                      <ExternalLink size={12} />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold text-text-primary mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-text-muted hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
                    >
                      {link.name}
                      <ExternalLink size={12} />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold text-text-primary mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-text-muted hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
                    >
                      {link.name}
                      <ExternalLink size={12} />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Security Badges */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-bg-tertiary to-bg-secondary rounded-2xl p-6 border border-gray-700/50 mb-8"
          >
            <div className="text-center mb-6">
              <h4 className="text-lg font-semibold text-text-primary mb-2">Secure & Trusted Platform</h4>
              <p className="text-text-muted text-sm">Your data and earnings are protected with industry-leading security</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Shield size={20} className="text-green-400" />
                </div>
                <div className="text-left">
                  <div className="text-text-primary font-semibold text-sm">SSL Encrypted</div>
                  <div className="text-text-muted text-xs">Secure connections</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Lock size={20} className="text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="text-text-primary font-semibold text-sm">Data Protected</div>
                  <div className="text-text-muted text-xs">Privacy first</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Users size={20} className="text-purple-400" />
                </div>
                <div className="text-left">
                  <div className="text-text-primary font-semibold text-sm">Verified Users</div>
                  <div className="text-text-muted text-xs">50K+ members</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            variants={itemVariants}
            className="border-t border-gray-700/50 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-text-muted text-sm">
                © 2024 ViralBoast. All rights reserved. Made with ❤️ for ViralBoast earners worldwide.
              </div>
              
              <div className="flex items-center gap-6">
                <button
                  onClick={() => navigate('/v/helpcenter')}
                  className="text-text-muted hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 text-sm"
                >
                  <HelpCircle size={16} />
                  Help Center
                </button>
                <button
                  onClick={() => navigate('/v/privacypolicy')}
                  className="text-text-muted hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 text-sm"
                >
                  <FileText size={16} />
                  Privacy Policy
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
