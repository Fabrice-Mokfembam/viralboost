import React, { useState, useRef, useEffect } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EmailVerification: React.FC = () => {
  const [code, setCode] = useState<string[]>(new Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();

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
    console.log('Verifying code:', fullCode);
    navigate('/');
  };

  const handleResendCode = () => {
    if (!canResend) return;
    
    console.log('Resending code...');
    // Reset the timer
    setTimeLeft(120);
    setCanResend(false);
    // Logic to resend the code
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
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Viral Boost
          </h2>
          <h3 className="mt-2 text-center text-2xl font-bold text-white">
            Verify Your Email
          </h3>
        </div>
        
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
          <p className="text-gray-400 text-center mb-6">
            We've sent a 6-digit verification code to your email address
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
                className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-700 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 bg-gray-800 text-white"
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleVerify}
            disabled={code.join('').length !== 6}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verify Email
          </button>

          {/* Countdown timer */}
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm">
              {timeLeft > 0 ? `Resend code in ${formatTime(timeLeft)}` : 'Code expired'}
            </p>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={handleResendCode}
              disabled={!canResend}
              className={`text-sm ${
                canResend 
                  ? 'text-cyan-500 hover:text-cyan-400 cursor-pointer' 
                  : 'text-gray-500 cursor-not-allowed'
              }`}
            >
              Didn't receive the code? Resend
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400">
          Need help?{' '}
          <Link to="/support" className="font-medium text-cyan-500 hover:text-cyan-400">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;