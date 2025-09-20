import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, AlertTriangle } from 'lucide-react';

const NewComplaint = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contact: '',
    contactType: 'email', // 'email' or 'phone'
    severity: 'medium',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Reset form
    setFormData({
      contact: '',
      contactType: 'email',
      severity: 'medium',
      description: ''
    });

    setIsSubmitting(false);
    
    // Navigate back to report problem page
    navigate('/v/report-problem');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-bg-main max-w-4xl mx-auto text-text-secondary">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/v/report-problem')}
          className="p-2 text-cyan-500 hover:bg-cyan-500/20 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-accent-cyan">Write New Complaint</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div className="bg-bg-secondary rounded-xl p-6 shadow-md border border-cyan-500">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Contact Information</h2>
          
          <div className="mb-4">
            <label className="block text-text-primary font-medium mb-2">Contact Type</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="contactType"
                  value="email"
                  checked={formData.contactType === 'email'}
                  onChange={handleInputChange}
                  className="mr-2 text-cyan-500"
                />
                <span className="text-text-secondary">Email</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="contactType"
                  value="phone"
                  checked={formData.contactType === 'phone'}
                  onChange={handleInputChange}
                  className="mr-2 text-cyan-500"
                />
                <span className="text-text-secondary">Phone</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-text-primary font-medium mb-2">
              {formData.contactType === 'email' ? 'Email Address' : 'Phone Number'}
            </label>
            <input
              type={formData.contactType === 'email' ? 'email' : 'tel'}
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder={formData.contactType === 'email' ? 'Enter your email' : 'Enter your phone number'}
              className="w-full px-4 py-3 bg-bg-tertiary border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              required
            />
          </div>
        </div>

        {/* Severity */}
        <div className="bg-bg-secondary rounded-xl p-6 shadow-md border border-cyan-500">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Severity Level</h2>
          
          <div className="space-y-3">
            {[
              { value: 'low', label: 'Low', description: 'Minor issue, not urgent' },
              { value: 'medium', label: 'Medium', description: 'Moderate issue, needs attention' },
              { value: 'high', label: 'High', description: 'Critical issue, urgent attention required' }
            ].map((option) => (
              <label key={option.value} className="flex items-start gap-3 p-3 rounded-lg hover:bg-bg-tertiary cursor-pointer">
                <input
                  type="radio"
                  name="severity"
                  value={option.value}
                  checked={formData.severity === option.value}
                  onChange={handleInputChange}
                  className="mt-1 text-cyan-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${getSeverityColor(option.value)}`}>
                      {option.label}
                    </span>
                    <AlertTriangle size={16} className={getSeverityColor(option.value)} />
                  </div>
                  <p className="text-sm text-text-muted">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="bg-bg-secondary rounded-xl p-6 shadow-md border border-cyan-500">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Describe Your Problem</h2>
          
          <div>
            <label className="block text-text-primary font-medium mb-2">Complaint Details</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Please provide a detailed description of the problem you're experiencing. Include steps to reproduce the issue if applicable."
              rows={6}
              className="w-full px-4 py-3 bg-bg-tertiary border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
              required
            />
            <p className="text-sm text-text-muted mt-2">
              {formData.description.length}/500 characters
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting || !formData.contact || !formData.description}
            className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-text-primary font-semibold py-3 px-8 rounded-lg shadow-lg flex items-center gap-2 mx-auto transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send size={20} />
                Submit Complaint
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewComplaint;
