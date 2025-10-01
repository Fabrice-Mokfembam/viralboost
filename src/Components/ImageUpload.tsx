import React, { useRef, useState } from 'react';

import type { CloudinaryUploadResponse, UploadFolder } from '../types/cloudinary';
import { useCloudinaryUpload } from '../Hooks/useCloudinaryUpload';

interface ImageUploadProps {
  onUploadSuccess: (response: CloudinaryUploadResponse) => void;
  onUploadError?: (error: string) => void;
  folder?: UploadFolder;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onUploadSuccess,
  onUploadError,
  folder = 'default',
  multiple = false,
  accept = 'image/*',
  maxSize = 10,
  className = '',
  disabled = false,
  children
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const { uploadImage, uploadMultipleImages, isUploading, uploadProgress, error, clearError } = useCloudinaryUpload();

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    clearError();

    try {
      if (multiple) {
        const fileArray = Array.from(files);
        const responses = await uploadMultipleImages(fileArray, folder);
        responses.forEach(response => onUploadSuccess(response));
      } else {
        const response = await uploadImage(files[0], folder);
        onUploadSuccess(response);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      onUploadError?.(errorMessage);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event.target.files);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    handleFileSelect(event.dataTransfer.files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
  };

  const openFileDialog = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled || isUploading}
      />
      
      <div
        onClick={openFileDialog}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${disabled || isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          ${error ? 'border-red-500 bg-red-50' : ''}
        `}
      >
        {children || (
          <div className="space-y-2">
            <div className="text-gray-500">
              {isUploading ? (
                <div className="space-y-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p>Uploading...</p>
                  {uploadProgress && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress.percentage}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-sm">
                    {multiple ? 'Drop images here or click to select' : 'Drop an image here or click to select'}
                  </p>
                  <p className="text-xs text-gray-400">
                    Supports: JPEG, PNG, GIF, WebP (max {maxSize}MB)
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
