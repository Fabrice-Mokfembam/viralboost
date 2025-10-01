import { useState, useCallback } from 'react';
import { uploadImageToCloudinary, uploadMultipleImages as uploadMultipleImagesUtil, isValidImageFile } from '../utils/cloudinary';
import type { 
  CloudinaryUploadResponse, 
  CloudinaryUploadOptions, 
  UploadProgress, 
  UploadFolder 
} from '../types/cloudinary';

interface UseCloudinaryUploadReturn {
  uploadImage: (
    file: File,
    folder?: UploadFolder,
    options?: CloudinaryUploadOptions
  ) => Promise<CloudinaryUploadResponse>;
  uploadMultipleImages: (
    files: File[],
    folder?: UploadFolder,
    options?: CloudinaryUploadOptions
  ) => Promise<CloudinaryUploadResponse[]>;
  isUploading: boolean;
  uploadProgress: UploadProgress | null;
  error: string | null;
  clearError: () => void;
  validateFile: (file: File) => { isValid: boolean; error?: string };
}

export const useCloudinaryUpload = (): UseCloudinaryUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const validateFile = useCallback((file: File) => {
    if (!isValidImageFile(file)) {
      return {
        isValid: false,
        error: 'Please select a valid image file (JPEG, PNG, GIF, WebP) under 10MB'
      };
    }
    return { isValid: true };
  }, []);

  const uploadImage = useCallback(async (
    file: File,
    folder: UploadFolder = 'default',
    options: CloudinaryUploadOptions = {}
  ): Promise<CloudinaryUploadResponse> => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(null);

    try {
      // Validate file first
      const validation = validateFile(file);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      const result = await uploadImageToCloudinary(
        file,
        folder,
        options,
        (progress) => setUploadProgress(progress)
      );

      setUploadProgress(null);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, [validateFile]);

  const uploadMultipleImages = useCallback(async (
    files: File[],
    folder: UploadFolder = 'default',
    options: CloudinaryUploadOptions = {}
  ): Promise<CloudinaryUploadResponse[]> => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(null);

    try {
      // Validate all files first
      for (const file of files) {
        const validation = validateFile(file);
        if (!validation.isValid) {
          throw new Error(validation.error);
        }
      }

      const results = await uploadMultipleImagesUtil(
        files,
        folder,
        options,
        (fileIndex, progress) => {
          // Update progress for the current file being uploaded
          setUploadProgress({
            ...progress,
            // You could enhance this to show overall progress across all files
            percentage: Math.round((progress.percentage / files.length) + (fileIndex * (100 / files.length)))
          });
        }
      );

      setUploadProgress(null);
      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, [validateFile]);

  return {
    uploadImage,
    uploadMultipleImages,
    isUploading,
    uploadProgress,
    error,
    clearError,
    validateFile
  };
};
