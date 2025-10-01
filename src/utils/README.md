# Cloudinary Integration

This directory contains utilities and components for integrating Cloudinary image upload functionality into the ViralBoost application.

## Files Overview

- `cloudinary.ts` - Core utility functions for Cloudinary operations
- `../config/cloudinary.ts` - Cloudinary configuration and credentials
- `../types/cloudinary.ts` - TypeScript type definitions
- `../hooks/useCloudinaryUpload.ts` - React hook for easy integration
- `../components/ImageUpload.tsx` - Reusable image upload component
- `../examples/CloudinaryUsageExample.tsx` - Usage examples

## Quick Start

### 1. Basic Usage with Hook

```tsx
import { useCloudinaryUpload } from '../hooks/useCloudinaryUpload';

const MyComponent = () => {
  const { uploadImage, isUploading, error } = useCloudinaryUpload();

  const handleFileUpload = async (file: File) => {
    try {
      const result = await uploadImage(file, 'profile_images');
      console.log('Upload successful:', result.secure_url);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div>
      {isUploading && <p>Uploading...</p>}
      {error && <p>Error: {error}</p>}
      {/* Your file input here */}
    </div>
  );
};
```

### 2. Using the ImageUpload Component

```tsx
import ImageUpload from '../components/ImageUpload';

const MyComponent = () => {
  const handleUploadSuccess = (response) => {
    console.log('Image uploaded:', response.secure_url);
  };

  const handleUploadError = (error) => {
    console.error('Upload failed:', error);
  };

  return (
    <ImageUpload
      onUploadSuccess={handleUploadSuccess}
      onUploadError={handleUploadError}
      folder="profile_images"
      multiple={false}
    />
  );
};
```

### 3. Direct Utility Usage

```tsx
import { uploadImageToCloudinary, getCloudinaryUrl } from '../utils/cloudinary';

const uploadFile = async (file: File) => {
  try {
    const result = await uploadImageToCloudinary(file, 'default', {
      tags: ['example'],
      context: { alt: 'Example image' }
    });
    
    // Get transformed URL
    const thumbnailUrl = getCloudinaryUrl(result.public_id, 'w_150,h_150,c_fill');
    console.log('Thumbnail URL:', thumbnailUrl);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

## Available Folders

- `'default'` - Maps to `viral_boast` folder
- `'profile_images'` - Maps to `viral_boast_profile_images` folder

## Configuration

The Cloudinary configuration is stored in `src/config/cloudinary.ts`. Update the credentials there if needed.

## Important Notes

1. **Upload Preset**: You need to create an "unsigned" upload preset in your Cloudinary dashboard with the name `ml_default` for the uploads to work.

2. **File Validation**: The utilities automatically validate file types (JPEG, PNG, GIF, WebP) and size (max 10MB).

3. **Progress Tracking**: Both the hook and component support upload progress tracking.

4. **Error Handling**: Comprehensive error handling is built-in with user-friendly error messages.

## Cloudinary Dashboard Setup

1. Go to your Cloudinary dashboard
2. Navigate to Settings > Upload
3. Create a new upload preset:
   - Name: `ml_default`
   - Signing Mode: Unsigned
   - Folder: Leave empty (will be set by the code)
   - Save the preset

## API Reference

### useCloudinaryUpload Hook

```tsx
const {
  uploadImage,           // Function to upload single image
  uploadMultipleImages,  // Function to upload multiple images
  isUploading,          // Boolean indicating upload status
  uploadProgress,       // Progress object with percentage
  error,                // Error message if upload fails
  clearError,           // Function to clear error state
  validateFile          // Function to validate file before upload
} = useCloudinaryUpload();
```

### ImageUpload Component Props

```tsx
interface ImageUploadProps {
  onUploadSuccess: (response: CloudinaryUploadResponse) => void;
  onUploadError?: (error: string) => void;
  folder?: UploadFolder;           // 'default' | 'profile_images'
  multiple?: boolean;              // Allow multiple file selection
  accept?: string;                 // File types to accept
  maxSize?: number;               // Max file size in MB
  className?: string;             // Additional CSS classes
  disabled?: boolean;             // Disable the component
  children?: React.ReactNode;     // Custom content
}
```

### Utility Functions

- `uploadImageToCloudinary(file, folder, options, onProgress)` - Upload single image
- `uploadMultipleImages(files, folder, options, onProgress)` - Upload multiple images
- `deleteImageFromCloudinary(publicId)` - Delete image from Cloudinary
- `getCloudinaryUrl(publicId, transformations)` - Generate transformed URL
- `isValidImageFile(file)` - Validate image file
- `formatFileSize(bytes)` - Format file size for display
