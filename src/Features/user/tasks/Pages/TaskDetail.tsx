import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { useGetUserTaskDetails } from '../Hooks/useTasks';
import type { CloudinaryUploadResponse } from '../../../../types/cloudinary';
import { useCloudinaryUpload } from '../../../../Hooks/useCloudinaryUpload';
import { useSubmitTaskProof } from '../Hooks/useTaskSubmissions';
import { useGetProfile } from '../../auth/Hooks/useAuth';
import { getUserData } from '../../auth/Utils/authUtils';

// import { useGetTaskById } from '../../../Admin/Hooks/useTasks';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<CloudinaryUploadResponse[]>([]);

  const { data: taskData, isLoading, error } = useGetUserTaskDetails(id || '');
  const { uploadImage, isUploading, uploadProgress, error: uploadError } = useCloudinaryUpload();
  const { mutate: submitTaskProof, isPending: isSubmitting, error: submitError, isSuccess: submitSuccess } = useSubmitTaskProof();
  const { data: userProfile } = useGetProfile();
  const storedUser = getUserData();
  const navigate = useNavigate();
  
  // Use profile data if available, otherwise fall back to stored user data
  const user = userProfile?.data?.user || storedUser;
  const memberShipData = user?.membership;
  

  useEffect(() => {
    if (taskData) {
      console.log(taskData.data);
    }
  }, [taskData]);
  

  // Format instructions to display each step on a new line
  const formatInstructions = (instructions: string) => {
    return instructions.split(/(?=\d+\.)/).filter(step => step.trim()).map(step => step.trim());
  };

  // Use real task data
  const task = taskData?.data || null;

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      try {
        // Upload the image to Cloudinary
        const uploadResponse = await uploadImage(file, 'default', {
          tags: ['task-proof', `task-${id}`]
        });
        
        // Add to uploaded images
        setUploadedImages(prev => [...prev, uploadResponse]);
        
        // Also add to selected images for preview
        setSelectedImages(prev => [...prev, file]);
        
        console.log('Image uploaded successfully:', uploadResponse.secure_url);
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload image. Please try again.');
      }
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (uploadedImages.length === 0) {
      alert('Please upload an image first');
      return;
    }

    // Submit the first uploaded image (since we're only allowing one image)
    const imageUrl = uploadedImages[0].secure_url;
    
    const submissionData = {
      task_id: Number(id),
      image_url: imageUrl,
      description: 'Task completed'
    };

    console.log('=== SUBMITTING TASK PROOF ===');
    console.log('Task ID:', id);
    console.log('Image URL:', imageUrl);
    console.log('Description:', 'Task completed');
    console.log('============================');

    submitTaskProof(submissionData);
  };

  // Navigate to tasks page when submission is successful
  useEffect(() => {
    if (submitSuccess) {
      navigate('/dashboard/tasks');
    }
  }, [submitSuccess, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-main text-text-primary max-w-3xl mx-auto md:px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-cyan mx-auto mb-4"></div>
          <p className="text-text-muted">Loading task details...</p>
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="min-h-screen bg-bg-main text-text-primary max-w-3xl mx-auto md:px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load task details</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-accent-cyan text-white px-4 py-2 rounded-lg hover:bg-accent-cyan-hover"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-main text-text-primary max-w-3xl mx-auto md:px-6">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-accent-cyan mb-1">Task Detail</h1>
        <p className="text-text-muted text-sm">Task ID: {id}</p>
      </header>

      {/* Task Info Box */}
      <section className="bg-bg-secondary rounded-2xl p-6 shadow-xl border border-cyan-600 mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">{task.title}</h2>
        <p className="text-cyan-400 font-semibold mb-2">Reward: ${memberShipData?.benefit_amount_per_task}</p>
        <p className="text-text-secondary mb-4">{task.description}</p>

        {/* Task Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-text-muted text-sm">Platform</p>
            <p className="text-text-primary font-semibold">{task.platform}</p>
          </div>
          <div>
            <p className="text-text-muted text-sm">Category</p>
            <p className="text-text-primary font-semibold">{task.category}</p>
          </div>
          <div>
            <p className="text-text-muted text-sm">Priority</p>
            <p className="text-text-primary font-semibold capitalize">{task.priority}</p>
          </div>
          <div>
            <p className="text-text-muted text-sm">Status</p>
            <p className="text-text-primary font-semibold capitalize">{task.task_status}</p>
          </div>
        </div>

        {/* Target URL */}
        {task.target_url && (
          <div className="mb-4">
            <p className="text-text-muted text-sm mb-2">Target URL:</p>
            <a 
              href={task.target_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent-cyan hover:text-accent-cyan-hover underline break-all"
            >
              {task.target_url}
            </a>
          </div>
        )}

        {/* Additional info */}
        <div className="bg-bg-tertiary p-4 rounded-lg mb-4 border-l-4 border-cyan-500">
          <h3 className="font-semibold text-cyan-300 mb-2">Important Notes:</h3>
          <ul className="list-disc list-inside text-text-muted text-sm space-y-1">
            <li>Please ensure screenshots are clear and unedited.</li>
            <li>Submitting incomplete proof may lead to rejection.</li>
            <li>Tasks must be completed within 24 hours to be valid.</li>
          </ul>
        </div>
      </section>

      {/* Instructions */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-cyan-400 mb-4">How to Complete the Task</h3>
        <ol className="list-decimal list-inside space-y-3 text-text-muted text-lg">
          {formatInstructions(task.instructions).map((step, index) => (
            <li key={index} className="pl-2 border-l-4 border-cyan-500">
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* Image Upload Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-cyan-400 mb-3">Upload Proof Image</h3>
        
        {/* Upload Progress */}
        {isUploading && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              <span className="text-blue-700 font-medium">Uploading image...</span>
            </div>
            {uploadProgress && (
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress.percentage}%` }}
                ></div>
              </div>
            )}
          </div>
        )}

        {/* Upload Error */}
        {uploadError && (
          <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-700 font-medium">Upload Error: {uploadError}</p>
          </div>
        )}

        <input
          type="file"
          id="uploadImages"
          className="hidden"
          accept="image/*"
          onChange={onImageChange}
          disabled={isUploading}
        />
        <label
          htmlFor="uploadImages"
          className={`inline-block cursor-pointer font-semibold px-6 py-3 shadow transition ${
            isUploading 
              ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
              : 'bg-cyan-600 hover:bg-cyan-700 text-text-primary'
          }`}
        >
          {isUploading ? 'Uploading...' : 'Select Image'}
        </label>

        {/* Selected Images Section */}
        {selectedImages.length > 0 && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {selectedImages.map((image, index) => {
              const url = URL.createObjectURL(image);
              return (
                <div key={index} className="relative rounded-lg overflow-hidden shadow-lg group">
                  <img
                    src={url}
                    alt={`upload-${index}`}
                    className="w-full h-32 object-cover brightness-90 group-hover:brightness-75 transition"
                    onLoad={() => URL.revokeObjectURL(url)}
                  />
                  <button
                    type="button"
                    aria-label="Remove Image"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-600 text-text-primary rounded-full p-1 shadow-lg opacity-90 hover:opacity-100 transition"
                  >
                    <X size={20} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Submit Error */}
      {submitError && (
        <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-700 font-medium">Submission Error: {submitError.message}</p>
        </div>
      )}

      {/* Submit Success */}
      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-green-700 font-medium">Task proof submitted successfully!</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={uploadedImages.length === 0 || isUploading || isSubmitting}
        className={`w-full py-4 font-bold text-lg transition ${
          uploadedImages.length === 0 || isUploading || isSubmitting
            ? 'bg-bg-tertiary cursor-not-allowed text-text-muted'
            : 'bg-cyan-500 hover:bg-cyan-600 text-text-primary shadow-xl'
        }`}
      >
        {isUploading ? 'Uploading...' : 
         isSubmitting ? 'Submitting...' : 
         `Submit Proof (${uploadedImages.length} image${uploadedImages.length !== 1 ? 's' : ''})`}
      </button>
    </div>
  );
};

export default TaskDetail;
