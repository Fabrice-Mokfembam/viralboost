import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { useGetUserTaskDetails } from '../Hooks/useTasks';
// import { useGetTaskById } from '../../../Admin/Hooks/useTasks';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const { data: taskData, isLoading, error } = useGetUserTaskDetails(id || '');

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

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages((prev) => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    alert(`Submitting ${selectedImages.length} images for task ID: ${id}`);
    // TODO: submit logic here
  };

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
        <p className="text-cyan-400 font-semibold mb-2">Reward: ${task.benefit}</p>
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
        <h3 className="text-xl font-semibold text-cyan-400 mb-3">Upload Proof Images</h3>
        <input
          type="file"
          id="uploadImages"
          className="hidden"
          accept="image/*"
          multiple
          onChange={onImageChange}
        />
        <label
          htmlFor="uploadImages"
          className="inline-block cursor-pointer bg-cyan-600 hover:bg-cyan-700 text-text-primary font-semibold px-6 py-3  shadow transition"
        >
          Select Images
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

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={selectedImages.length === 0}
        className={`w-full py-4  font-bold text-lg transition ${
          selectedImages.length === 0
            ? 'bg-bg-tertiary cursor-not-allowed text-text-muted'
            : 'bg-cyan-500 hover:bg-cyan-600 text-text-primary shadow-xl'
        }`}
      >
        Submit Proof
      </button>
    </div>
  );
};

export default TaskDetail;
