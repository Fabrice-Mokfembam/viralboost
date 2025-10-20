import React, { useState, useRef, useEffect } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useResendVerification, useVerify } from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import { getAuthErrorMessage } from '../Utils/errorUtils';

const EmailVerification: React.FC = () => {
  const [code, setCode] = useState<string[]>(new Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(120); 
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email from navigation state  
  const email = location.state?.email || '';
  
  // Auth hooks
  const { mutate: verify, isPending: isVerifying } = useVerify();
  const { mutate: resendCode, isPending: isResending } = useResendVerification();

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; 

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      toast.error('Please enter the complete 6-digit code');
      return;
    }

    if (!email) {
      toast.error('Email not found. Please try registering again.');
      navigate('/signup');
      return;
    }

    verify(
      { email, code: fullCode },
      {
        onSuccess: (data) => {
          toast.success(data.message || 'Email verified successfully!');
          navigate('/');
        },
        onError: (error: unknown) => {
          const errorMessage = getAuthErrorMessage(error);
          toast.error(errorMessage);
        }
      }
    );
  };

  const handleResendCode = () => {
    if (!canResend || !email) return;
    
    resendCode(
      { email },
      {
        onSuccess: (data) => {
          toast.success(data.message || 'Verification code resent successfully!');
          setTimeLeft(120);
          setCanResend(false);
        },
        onError: (error: unknown) => {
          const errorMessage = getAuthErrorMessage(error);
          toast.error(errorMessage);
        }
      }
    );
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    const newCode = [...code];
    for (let i = 0; i < newCode.length; i++) {
      if (pastedData[i]) {
        newCode[i] = pastedData[i];
      } else {
        break;
      }
    }
    setCode(newCode);
    // Focus the last filled input or the next empty one
    const lastFilledIndex = newCode.findIndex((digit, i) => !digit && i > 0) - 1;
    if (lastFilledIndex >= 0) {
      inputRefs.current[lastFilledIndex + 1]?.focus();
    } else if (newCode[5]) {
      inputRefs.current[5]?.focus();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary">
            PIS
          </h2>
          <h3 className="mt-2 text-center text-2xl font-bold text-text-primary">
            Verify Your Email
          </h3>
        </div>
        
        <div className="bg-bg-main p-8 rounded-lg shadow-lg">
          <p className="text-text-muted text-center mb-6">
            We've sent a 6-digit verification code to <strong>{email}</strong>
          </p>

          <div className="flex justify-center gap-2 mb-8">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                ref={(el: HTMLInputElement | null) => { inputRefs.current[index] = el as HTMLInputElement; }}
                className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-700 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 bg-bg-secondary text-text-primary"
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleVerify}
            disabled={code.join('').length !== 6 || isVerifying}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-text-primary bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Verifying...
              </>
            ) : (
              'Verify Email'
            )}
          </button>

          {/* Countdown timer */}
          <div className="text-center mt-4">
            <p className="text-text-muted text-sm">
              {timeLeft > 0 ? `Resend code in ${formatTime(timeLeft)}` : 'Code expired'}
            </p>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={handleResendCode}
              disabled={!canResend || isResending}
              className={`text-sm ${
                canResend && !isResending
                  ? 'text-cyan-500 hover:text-accent-cyan cursor-pointer' 
                  : 'text-gray-500 cursor-not-allowed'
              }`}
            >
              {isResending ? 'Resending...' : "Didn't receive the code? Resend"}
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-text-muted">
          Need help?{' '}
          <Link to="/support" className="font-medium text-cyan-500 hover:text-accent-cyan">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;