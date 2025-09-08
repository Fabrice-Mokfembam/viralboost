import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { X } from 'lucide-react';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  

  // Dummy data - Replace fetch logic for real data
  const task = {
    title: 'Like a Video',
    benefit: '$0.50',
    description:
      'Earn money by liking a video on our partner platform. Follow the instructions carefully to qualify and avoid rejection.',
    instructions: [
      'Open the provided video link.',
      'Like the video using your account.',
      'Take a screenshot as proof of like.',
      'Upload the screenshot below to submit.',
    ],
  };

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

  return (
    <div className="min-h-screen bg-gray-900 text-white max-w-3xl mx-auto md:px-6">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-1">Task Detail</h1>
        <p className="text-gray-400 text-sm">Task ID: {id}</p>
      </header>

      {/* Task Info Box */}
      <section className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-cyan-600 mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{task.title}</h2>
        <p className="text-cyan-400 font-semibold mb-2">Reward: {task.benefit}</p>
        <p className="text-gray-300 mb-4">{task.description}</p>

        {/* Additional info */}
        <div className="bg-gray-700 p-4 rounded-lg mb-4 border-l-4 border-cyan-500">
          <h3 className="font-semibold text-cyan-300 mb-2">Important Notes:</h3>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>Please ensure screenshots are clear and unedited.</li>
            <li>Submitting incomplete proof may lead to rejection.</li>
            <li>Tasks must be completed within 24 hours to be valid.</li>
          </ul>
        </div>
      </section>

      {/* Instructions */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-cyan-400 mb-4">How to Complete the Task</h3>
        <ol className="list-decimal list-inside space-y-3 text-gray-400 text-lg">
          {task.instructions.map((step, index) => (
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
          className="inline-block cursor-pointer bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3  shadow transition"
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
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-lg opacity-90 hover:opacity-100 transition"
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
            ? 'bg-gray-700 cursor-not-allowed text-gray-400'
            : 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-xl'
        }`}
      >
        Submit Proof
      </button>
    </div>
  );
};

export default TaskDetail;
