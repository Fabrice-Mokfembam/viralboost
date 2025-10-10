import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, AlertTriangle } from 'lucide-react';
import { useCreateComplaint } from '../hooks/useComplaints';


const NewComplaint = () => {
  const navigate = useNavigate();
  const createComplaintMutation = useCreateComplaint();
  const [formData, setFormData] = useState({
    contact: '',
    contactType: 'email', // 'email' or 'phone'
    severity: 'medium',
    description: ''
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation errors for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous validation errors
    setValidationErrors({});
    
    // Prepare the complaint data according to API requirements
    const complaintData = {
      contact_type: formData.contactType as 'email' | 'phone',
      contact: formData.contact,
      severity_level: formData.severity as 'low' | 'medium' | 'high',
      description: formData.description.trim()
    };

    console.log(complaintData);

    try {
      await createComplaintMutation.mutateAsync(complaintData);
      
      // Reset form on success
      setFormData({
        contact: '',
        contactType: 'email',
        severity: 'medium',
        description: ''
      });
      
      // Navigate back to report problem page
      navigate('/v/report-problem');
    } catch (error: unknown) {
      console.error('Failed to submit complaint:', error);
      
      // Handle validation errors from API response
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { errors?: Record<string, string[]> } } };
        if (axiosError.response?.data?.errors) {
          setValidationErrors(axiosError.response.data.errors);
        }
      }
    }
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

  const getFieldError = (fieldName: string) => {
    // Map form field names to API field names for error display
    const fieldMapping: Record<string, string> = {
      'contact': 'contact',
      'contactType': 'contact_type',
      'severity': 'severity_level',
      'description': 'description'
    };
    
    const apiFieldName = fieldMapping[fieldName] || fieldName;
    return validationErrors[apiFieldName]?.[0] || null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/v/report-problem')}
            className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Write New Complaint</h1>
          <div className="w-10 h-10"></div> {/* Spacer for center alignment */}
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
              className={`w-full px-4 py-3 bg-bg-tertiary border rounded-lg text-text-primary focus:outline-none focus:ring-1 ${
                getFieldError('contact') 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-600 focus:border-cyan-500 focus:ring-cyan-500'
              }`}
              required
            />
            {getFieldError('contact') && (
              <p className="text-red-400 text-sm mt-1">{getFieldError('contact')}</p>
            )}
          </div>
        </div>

        {/* Severity */}
        <div className={`bg-bg-secondary rounded-xl p-6 shadow-md border ${
          getFieldError('severity') ? 'border-red-500' : 'border-cyan-500'
        }`}>
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
                  className={`mt-1 ${getFieldError('severity') ? 'text-red-500' : 'text-cyan-500'}`}
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
          {getFieldError('severity') && (
            <p className="text-red-400 text-sm mt-2">{getFieldError('severity')}</p>
          )}
        </div>

        {/* Description */}
        <div className={`bg-bg-secondary rounded-xl p-6 shadow-md border ${
          getFieldError('description') ? 'border-red-500' : 'border-cyan-500'
        }`}>
          <h2 className="text-xl font-semibold text-text-primary mb-4">Describe Your Problem</h2>
          
          <div>
            <label className="block text-text-primary font-medium mb-2">Complaint Details</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Please provide a detailed description of the problem you're experiencing. Include steps to reproduce the issue if applicable."
              rows={6}
              className={`w-full px-4 py-3 bg-bg-tertiary border rounded-lg text-text-primary focus:outline-none focus:ring-1 resize-none ${
                getFieldError('description') 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-600 focus:border-cyan-500 focus:ring-cyan-500'
              }`}
              required
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-text-muted">
                {formData.description.length}/500 characters
              </p>
              {getFieldError('description') && (
                <p className="text-red-400 text-sm">{getFieldError('description')}</p>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {createComplaintMutation.isError && Object.keys(validationErrors).length === 0 && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-center">
            <p className="text-red-400 font-medium">
              Failed to submit complaint. Please try again.
            </p>
            {createComplaintMutation.error && (
              <p className="text-red-300 text-sm mt-1">
                {createComplaintMutation.error.message || 'An error occurred'}
              </p>
            )}
          </div>
        )}

        {/* Success Message */}
        {createComplaintMutation.isSuccess && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-center">
            <p className="text-green-400 font-medium">
              Complaint submitted successfully!
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={createComplaintMutation.isPending || !formData.contact || !formData.description}
            className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-text-primary font-semibold py-3 px-8 rounded-lg shadow-lg flex items-center gap-2 mx-auto transition-colors"
          >
            {createComplaintMutation.isPending ? (
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
    </div>
  );
};

export default NewComplaint;
