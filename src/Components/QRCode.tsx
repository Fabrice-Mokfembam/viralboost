import React, { useEffect, useRef, useState } from 'react';
import QRCodeLib from 'qrcode';

interface QRCodeProps {
  value: string;
  size?: number;
  color?: {
    dark?: string;
    light?: string;
  };
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  margin?: number;
  className?: string;
  style?: React.CSSProperties;
}

const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 200,
  color = {
    dark: '#000000',
    light: '#FFFFFF'
  },
  errorCorrectionLevel = 'M',
  margin = 4,
  className = '',
  style = {}
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      if (!value || !canvasRef.current) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        await QRCodeLib.toCanvas(canvasRef.current, value, {
          width: size,
          margin: margin,
          color: color,
          errorCorrectionLevel: errorCorrectionLevel,
        });

        setIsLoading(false);
      } catch (err) {
        console.error('QR Code generation error:', err);
        setError('Failed to generate QR code');
        setIsLoading(false);
      }
    };

    generateQRCode();
  }, [value, size, color, errorCorrectionLevel, margin]);

  if (error) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg ${className}`}
        style={{ width: size, height: size, ...style }}
      >
        <div className="text-center p-4">
          <div className="text-red-500 text-sm font-medium mb-1">Error</div>
          <div className="text-gray-600 text-xs">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={style}>
      {isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg"
          style={{ width: size, height: size }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-2"></div>
            <div className="text-gray-600 text-xs">Generating...</div>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default QRCode;
