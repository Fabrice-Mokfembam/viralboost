import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, ArrowLeft, CheckCircle, AlertTriangle, Upload, Target, DollarSign, Globe, Tag } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-text-muted text-lg">Loading task details...</p>
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={32} className="text-red-400" />
          </div>
          <p className="text-red-400 text-lg font-medium mb-4">Failed to load task details</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-10 w-24 h-24 bg-blue-500/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-1/4 w-28 h-28 bg-green-500/5 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 pt-8 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/dashboard/tasks')}
              className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
            <h1 className="text-2xl font-bold text-text-primary">Task Detail</h1>
            <div className="w-10 h-10"></div> {/* Spacer for center alignment */}
          </div>

          {/* Task Header Card */}
          <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-3xl p-8 shadow-2xl border border-cyan-500/20 mb-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30 mb-4">
                <Target size={20} className="text-cyan-400" />
                <span className="text-cyan-300 font-semibold text-sm">Task Details</span>
              </div>
              
              <h2 className="text-3xl font-bold text-text-primary mb-4 bg-gradient-to-r from-text-primary to-cyan-400 bg-clip-text text-transparent">
                {task.title}
              </h2>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 mb-6">
                <DollarSign size={16} className="text-green-400" />
                <span className="text-green-400 font-semibold text-sm">Reward: ${memberShipData?.benefit_amount_per_task}</span>
              </div>
            </div>

            <p className="text-text-secondary text-center text-lg leading-relaxed mb-8">
              {task.description}
            </p>

            {/* Task Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Globe size={20} className="text-cyan-400" />
                </div>
                <p className="text-text-muted text-sm font-medium mb-1">Platform</p>
            <p className="text-text-primary font-semibold">{task.platform}</p>
          </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Tag size={20} className="text-purple-400" />
                </div>
                <p className="text-text-muted text-sm font-medium mb-1">Category</p>
            <p className="text-text-primary font-semibold">{task.category}</p>
          </div>
        </div>

        {/* Target URL */}
        {task.target_url && (
              <div className="bg-gradient-to-r from-bg-tertiary to-bg-secondary p-6 rounded-2xl border border-cyan-500/20 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Globe size={20} className="text-cyan-400" />
                  <h3 className="text-text-primary font-semibold">Target URL</h3>
                </div>
            <a 
              href={task.target_url} 
              target="_blank" 
              rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline break-all transition-colors"
            >
              {task.target_url}
            </a>
          </div>
        )}

            {/* Important Notes */}
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 rounded-2xl border border-orange-500/20">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle size={20} className="text-orange-400" />
                <h3 className="text-orange-400 font-semibold text-lg">Important Notes</h3>
              </div>
              <ul className="space-y-3 text-text-muted">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Please ensure screenshots are clear and unedited.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Submitting incomplete proof may lead to rejection.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Tasks must be completed within 24 hours to be valid.</span>
                </li>
          </ul>
        </div>
          </div>

      {/* Instructions */}
          <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-3xl p-8 shadow-2xl border border-cyan-500/20 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Target size={24} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">How to Complete the Task</h3>
            </div>
            
            <div className="space-y-4">
          {formatInstructions(task.instructions).map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-bg-tertiary to-bg-secondary rounded-2xl border border-cyan-500/20">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-cyan-400 font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

      {/* Image Upload Section */}
          <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-3xl p-8 shadow-2xl border border-cyan-500/20 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Upload size={24} className="text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">Upload Proof Image</h3>
            </div>
        
        {/* Upload Progress */}
        {isUploading && (
              <div className="mb-6 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                  <span className="text-blue-400 font-semibold">Uploading image...</span>
            </div>
            {uploadProgress && (
                  <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress.percentage}%` }}
                ></div>
              </div>
            )}
          </div>
        )}

        {/* Upload Error */}
        {uploadError && (
              <div className="mb-6 p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl border border-red-500/20">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={20} className="text-red-400" />
                  <p className="text-red-400 font-semibold">Upload Error: {uploadError}</p>
                </div>
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
              className={`inline-flex items-center gap-3 cursor-pointer font-semibold px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 ${
            isUploading 
                  ? 'bg-gray-600 cursor-not-allowed text-gray-400' 
                  : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white'
          }`}
        >
              <Upload size={20} />
          {isUploading ? 'Uploading...' : 'Select Image'}
        </label>

        {/* Selected Images Section */}
        {selectedImages.length > 0 && (
              <div className="mt-8">
                <h4 className="text-text-primary font-semibold mb-4">Selected Images</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {selectedImages.map((image, index) => {
              const url = URL.createObjectURL(image);
              return (
                      <div key={index} className="relative rounded-2xl overflow-hidden shadow-xl group">
                  <img
                    src={url}
                    alt={`upload-${index}`}
                          className="w-full h-48 object-cover brightness-90 group-hover:brightness-75 transition-all duration-300"
                    onLoad={() => URL.revokeObjectURL(url)}
                  />
                  <button
                    type="button"
                    aria-label="Remove Image"
                    onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg opacity-90 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                  >
                          <X size={16} />
                  </button>
                </div>
              );
            })}
                </div>
          </div>
        )}
          </div>

      {/* Submit Error */}
      {submitError && (
            <div className="mb-6 p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl border border-red-500/20">
              <div className="flex items-center gap-3">
                <AlertTriangle size={20} className="text-red-400" />
                <p className="text-red-400 font-semibold">Submission Error: {submitError.message}</p>
              </div>
        </div>
      )}

      {/* Submit Success */}
      {submitSuccess && (
            <div className="mb-6 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-400" />
                <p className="text-green-400 font-semibold">Task proof submitted successfully!</p>
              </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={uploadedImages.length === 0 || isUploading || isSubmitting}
            className={`w-full py-6 font-bold text-xl rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 ${
          uploadedImages.length === 0 || isUploading || isSubmitting
                ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
            }`}
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Uploading...
              </>
            ) : isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle size={24} />
                Submit Proof ({uploadedImages.length} image{uploadedImages.length !== 1 ? 's' : ''})
              </>
            )}
      </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
