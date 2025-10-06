import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Upload, AlertCircle, Smartphone, CreditCard, Coins } from 'lucide-react';
import { ImageUpload } from '../../../../Components/ImageUpload';
import { useCloudinaryUpload } from '../../../../Hooks/useCloudinaryUpload';
import { useCreatePayment } from '../hooks/usePayments';
import type { CreatePaymentPayload } from '../Types';

interface PaymentMethodConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  address: string;
  instructions: string[];
}

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { error: uploadError } = useCloudinaryUpload();
  const createPaymentMutation = useCreatePayment();
  
  // Get payment method and amount from location state
  const { method, amount } = location.state || { method: 'USDT', amount: '0' };
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Payment method configurations
  const paymentMethods: Record<string, PaymentMethodConfig> = {
    USDT: {
      id: 'USDT',
      name: 'USDT (Tether)',
      icon: <Coins size={24} className="text-green-500" />,
      address: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE', // Example address
      instructions: [
        'Open your USDT wallet app (Trust Wallet, MetaMask, etc.)',
        'Select USDT (TRC20 network recommended)',
        'Copy the payment address below',
        'Paste the address in your wallet',
        'Enter the exact amount: $' + amount,
        'Complete the transaction',
        'Take a screenshot of the transaction confirmation',
        'Upload the screenshot as proof of payment'
      ]
    },
    Ethereum: {
      id: 'Ethereum',
      name: 'Ethereum (ETH)',
      icon: <CreditCard size={24} className="text-blue-500" />,
      address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', // Example address
      instructions: [
        'Open your Ethereum wallet app (MetaMask, Trust Wallet, etc.)',
        'Select Ethereum (ETH)',
        'Copy the payment address below',
        'Paste the address in your wallet',
        'Enter the exact amount: $' + amount + ' worth of ETH',
        'Complete the transaction',
        'Take a screenshot of the transaction confirmation',
        'Upload the screenshot as proof of payment'
      ]
    },
    Bigcoin: {
      id: 'Bigcoin',
      name: 'Bigcoin',
      icon: <Smartphone size={24} className="text-orange-500" />,
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', // Example address
      instructions: [
        'Open your Bigcoin wallet app',
        'Select Bigcoin (BTC)',
        'Copy the payment address below',
        'Paste the address in your wallet',
        'Enter the exact amount: $' + amount + ' worth of BTC',
        'Complete the transaction',
        'Take a screenshot of the transaction confirmation',
        'Upload the screenshot as proof of payment'
      ]
    }
  };

  const currentMethod = paymentMethods[method] || paymentMethods.USDT;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(currentMethod.address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const handleImageUpload = async (response: { secure_url: string }) => {
    setUploadedImage(response.secure_url);
    setSubmitError(null);
  };

  const handleUploadError = (error: string) => {
    setSubmitError(error);
  };

  const handleSubmitPayment = async () => {
    if (!uploadedImage) {
      setSubmitError('Please upload a screenshot of your payment proof');
      return;
    }

    setSubmitError(null);

    // Prepare payment data
    const paymentData: CreatePaymentPayload = {
      picture_path: uploadedImage,
      amount: amount,
      description: `Payment of $${amount} via ${method}`,
      conversion_amount: amount, // Assuming 1:1 conversion for now
      conversion_currency: 'USD'
    };

    // Console log the values to be submitted
    console.log('Payment data to be submitted:', {
     
       ...paymentData
    });

    try {
      await createPaymentMutation.mutateAsync(paymentData);
      setSubmitSuccess(true);
      
      // Navigate back to recharge page after 3 seconds
      setTimeout(() => {
        navigate('/v/recharge');
      }, 3000);
    } catch (err) {
      setSubmitError('Failed to submit payment. Please try again.');
      console.error('Payment submission error:', err);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-bg-main flex items-center justify-center p-6">
        <div className="bg-bg-secondary rounded-2xl p-8 max-w-md w-full text-center border border-green-500/50">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Payment Submitted!</h2>
          <p className="text-text-muted mb-4">
            Your payment proof has been submitted successfully. It will be reviewed and approved within 24 hours.
          </p>
          <p className="text-sm text-text-muted">
            Redirecting to recharge page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-main max-w-4xl mx-auto text-text-secondary">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/v/recharge')}
          className="p-2 text-cyan-500 hover:bg-cyan-500/20 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-accent-cyan">Complete Payment</h1>
          <p className="text-text-muted">Pay ${amount} via {currentMethod.name}</p>
        </div>
      </div>

      {/* Payment Instructions */}
      <div className="bg-bg-secondary rounded-xl p-6 shadow-md border border-cyan-500 mb-6">
        <div className="flex items-center gap-3 mb-4">
          {currentMethod.icon}
          <h2 className="text-xl font-semibold text-text-primary">Payment Instructions</h2>
        </div>
        
        <div className="space-y-3">
          {currentMethod.instructions.map((instruction, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-cyan-400 text-sm font-bold">{index + 1}</span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">{instruction}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Address */}
      <div className="bg-bg-secondary rounded-xl p-6 shadow-md border border-cyan-500 mb-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Payment Address</h2>
        
        <div className="bg-bg-tertiary rounded-lg p-4 border border-gray-600">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-text-muted mb-1">Copy this address to your wallet:</p>
              <p className="text-text-primary font-mono text-sm break-all">
                {currentMethod.address}
              </p>
            </div>
            <button
              onClick={handleCopyAddress}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-text-primary rounded-lg transition-colors flex-shrink-0"
            >
              {copiedAddress ? (
                <>
                  <Check size={16} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-yellow-400 font-medium mb-1">Important:</p>
              <p className="text-yellow-300">
                Make sure to send the exact amount: <span className="font-bold">${amount}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Proof Upload */}
      <div className="bg-bg-secondary rounded-xl p-6 shadow-md border border-cyan-500 mb-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Upload Payment Proof</h2>
        
        <div className="space-y-4">
          <p className="text-text-muted text-sm">
            After completing your payment, take a screenshot of the transaction confirmation and upload it here.
          </p>
          
          {/* Image Preview */}
          {uploadedImage && (
            <div className="mb-4">
              <p className="text-text-primary font-medium mb-2 text-sm">Payment Proof Preview:</p>
              <div className="relative bg-bg-tertiary rounded-lg p-4 border border-gray-600">
                <img
                  src={uploadedImage}
                  alt="Payment proof"
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                  style={{ maxHeight: '300px', objectFit: 'contain' }}
                />
                <div className="mt-2 text-center">
                  <p className="text-green-400 text-sm font-medium flex items-center justify-center gap-2">
                    <Check size={16} />
                    Payment proof uploaded successfully!
                  </p>
                </div>
              </div>
            </div>
          )}

          <ImageUpload
            onUploadSuccess={handleImageUpload}
            onUploadError={handleUploadError}
            accept="image/*"
            maxSize={10}
            className="w-full"
          >
            <div className="border-2 border-dashed border-cyan-500/50 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors">
              <Upload size={48} className="text-cyan-500 mx-auto mb-4" />
              <p className="text-text-primary font-medium mb-2">
                {uploadedImage ? 'Upload another image' : 'Click to upload payment proof'}
              </p>
              <p className="text-text-muted text-sm">
                {uploadedImage ? 'Click to replace current image' : 'Upload a screenshot of your transaction confirmation'}
              </p>
            </div>
          </ImageUpload>
          
          {uploadError && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              {uploadError}
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {(submitError || createPaymentMutation.isError) && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-center mb-6">
          <p className="text-red-400 font-medium">
            {submitError || 'Failed to submit payment. Please try again.'}
          </p>
          {createPaymentMutation.error && (
            <p className="text-red-300 text-sm mt-1">
              {createPaymentMutation.error.message || 'An error occurred'}
            </p>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={handleSubmitPayment}
          disabled={!uploadedImage || createPaymentMutation.isPending}
          className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-text-primary font-semibold py-3 px-8 rounded-lg shadow-lg flex items-center gap-2 mx-auto transition-colors"
        >
          {createPaymentMutation.isPending ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Submitting...
            </>
          ) : (
            <>
              <Upload size={20} />
              Submit Payment Proof
            </>
          )}
        </button>
        
        <p className="text-text-muted text-sm mt-3">
          Your payment will be reviewed and approved within 24 hours
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;

