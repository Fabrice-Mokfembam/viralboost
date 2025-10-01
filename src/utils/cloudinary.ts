import { cloudinaryConfig } from '../config/cloudinary';
import type { 
  CloudinaryUploadResponse, 
  CloudinaryUploadOptions, 
  UploadProgress, 
  UploadFolder 
} from '../types/cloudinary';

/**
 * Upload an image file to Cloudinary
 * @param file - The image file to upload
 * @param folder - The folder to upload to ('default' or 'profile_images')
 * @param options - Additional upload options
 * @param onProgress - Optional progress callback
 * @returns Promise with upload response
 */
export const uploadImageToCloudinary = async (
  file: File,
  folder: UploadFolder = 'default',
  options: CloudinaryUploadOptions = {},
  onProgress?: (progress: UploadProgress) => void
): Promise<CloudinaryUploadResponse> => {
  try {
    // Determine the target folder
    const targetFolder = folder === 'profile_images' 
      ? cloudinaryConfig.profileImagesFolder 
      : cloudinaryConfig.defaultFolder;

    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); // Using the preset you created
    // Temporarily remove folder to test
    // formData.append('folder', targetFolder);
    
    // Debug: Log what we're sending
    console.log('Uploading to folder:', targetFolder);
    console.log('File name:', file.name);
    console.log('File size:', file.size);
    console.log('File type:', file.type);
    
    // Add additional options
    if (options.public_id) {
      formData.append('public_id', options.public_id);
    }
    if (options.transformation) {
      formData.append('transformation', options.transformation);
    }
    if (options.tags) {
      formData.append('tags', options.tags.join(','));
    }
    if (options.context) {
      Object.entries(options.context).forEach(([key, value]) => {
        formData.append(`context[${key}]`, value);
      });
    }

    // Create XMLHttpRequest for progress tracking
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      if (onProgress) {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress: UploadProgress = {
              loaded: event.loaded,
              total: event.total,
              percentage: Math.round((event.loaded / event.total) * 100)
            };
            onProgress(progress);
          }
        });
      }

      // Handle response
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          try {
            const response: CloudinaryUploadResponse = JSON.parse(xhr.responseText);
            resolve(response);
          } catch {
            reject(new Error('Failed to parse upload response'));
          }
        } else {
          // Log the actual error response for debugging
          console.error('Cloudinary upload error:', xhr.responseText);
          reject(new Error(`Upload failed with status: ${xhr.status} - ${xhr.responseText}`));
        }
      });

      // Handle errors
      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed due to network error'));
      });

      // Start upload
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`);
      xhr.send(formData);
    });

  } catch (error) {
    throw new Error(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Upload multiple images to Cloudinary
 * @param files - Array of image files to upload
 * @param folder - The folder to upload to
 * @param options - Additional upload options
 * @param onProgress - Optional progress callback for each file
 * @returns Promise with array of upload responses
 */
export const uploadMultipleImages = async (
  files: File[],
  folder: UploadFolder = 'default',
  options: CloudinaryUploadOptions = {},
  onProgress?: (fileIndex: number, progress: UploadProgress) => void
): Promise<CloudinaryUploadResponse[]> => {
  const uploadPromises = files.map((file, index) => 
    uploadImageToCloudinary(
      file, 
      folder, 
      options, 
      onProgress ? (progress) => onProgress(index, progress) : undefined
    )
  );

  return Promise.all(uploadPromises);
};

/**
 * Delete an image from Cloudinary
 * @param publicId - The public ID of the image to delete
 * @returns Promise with deletion response
 */
export const deleteImageFromCloudinary = async (publicId: string): Promise<{ result: string }> => {
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/destroy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_id: publicId,
        api_key: cloudinaryConfig.apiKey,
        api_secret: cloudinaryConfig.apiSecret,
        timestamp: Math.round(Date.now() / 1000)
      })
    });

    if (!response.ok) {
      throw new Error(`Delete failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Delete failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Generate a Cloudinary URL with transformations
 * @param publicId - The public ID of the image
 * @param transformations - Cloudinary transformation string
 * @returns The transformed image URL
 */
export const getCloudinaryUrl = (
  publicId: string, 
  transformations?: string
): string => {
  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`;
  const transformString = transformations ? `/${transformations}` : '';
  return `${baseUrl}${transformString}/${publicId}`;
};

/**
 * Validate if a file is a valid image
 * @param file - The file to validate
 * @returns True if valid image, false otherwise
 */
export const isValidImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  return validTypes.includes(file.type) && file.size <= maxSize;
};

/**
 * Get file size in human readable format
 * @param bytes - File size in bytes
 * @returns Human readable file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
