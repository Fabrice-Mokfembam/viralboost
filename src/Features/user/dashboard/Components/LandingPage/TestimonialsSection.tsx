import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const TestimonialsSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Student",
      location: "New York, USA",
      avatar: "SJ", // Placeholder for avatar initials
      rating: 5,
      text: "I've been using this platform for 3 months and I've earned over $500! The tasks are so easy and I can do them between classes. The payment system is super reliable.",
      earnings: "$500+ earned",
      tasksCompleted: "150+ tasks"
    },
    {
      name: "Ahmed Hassan",
      role: "Freelancer",
      location: "Dubai, UAE",
      avatar: "AH",
      rating: 5,
      text: "This platform has been a game-changer for me. I earn extra income by completing simple social media tasks. The referral program is amazing too!",
      earnings: "$800+ earned",
      tasksCompleted: "200+ tasks"
    },
    {
      name: "Maria Rodriguez",
      role: "Stay-at-home Mom",
      location: "Madrid, Spain",
      avatar: "MR",
      rating: 5,
      text: "ViralBoost allows me to earn money while taking care of my kids. The tasks are quick and I can do them whenever I have free time. Highly recommended!",
      earnings: "$300+ earned",
      tasksCompleted: "100+ tasks"
    },
    {
      name: "David Kim",
      role: "Part-time Worker",
      location: "Seoul, South Korea",
      avatar: "DK",
      rating: 5,
      text: "The platform is incredibly user-friendly and the support team is always helpful. I've been able to supplement my income significantly with minimal effort.",
      earnings: "$600+ earned",
      tasksCompleted: "180+ tasks"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-bg-secondary/50 to-bg-tertiary/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30 mb-6">
            <Star size={20} className="text-cyan-400" />
            <span className="text-cyan-300 font-semibold text-sm">User Testimonials</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 bg-gradient-to-r from-text-primary to-cyan-400 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Don't just take our word for it. Here's what real users are saying about their 
            experience generating passive income with our platform.
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-3xl p-8 md:p-12 border border-gray-700/50 backdrop-blur-sm"
          >
            <div className="text-center mb-8">
              {/* Quote Icon */}
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Quote size={32} className="text-cyan-400" />
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-text-primary leading-relaxed mb-8 max-w-4xl mx-auto">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
            </div>

            {/* User Info */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                  {testimonials[currentTestimonial].avatar}
                </div>
                
                <div className="text-left">
                  <h4 className="text-xl font-bold text-text-primary">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-text-muted">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-text-muted text-sm">
                    {testimonials[currentTestimonial].location}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {testimonials[currentTestimonial].earnings}
                  </div>
                  <div className="text-text-muted text-sm">Total Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {testimonials[currentTestimonial].tasksCompleted}
                  </div>
                  <div className="text-text-muted text-sm">Tasks Done</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl border border-gray-700/50 hover:border-cyan-500/50 flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft size={20} className="text-text-primary" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-cyan-500 scale-125'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-xl border border-gray-700/50 hover:border-cyan-500/50 flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <ArrowRight size={20} className="text-text-primary" />
            </button>
          </div>
        </motion.div>

        {/* Additional Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-3">
                "{testimonial.text}"
              </p>

              {/* User */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <h5 className="font-semibold text-text-primary text-sm">
                    {testimonial.name}
                  </h5>
                  <p className="text-text-muted text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
