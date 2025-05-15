import React from 'react';

import { Edit2, Save, RotateCcw, Plus, Upload } from 'lucide-react';

export default function HowItWorksSection({ sections, setSections, editingSection, setEditingSection, handleUpdate }) {
  // Default data structure with null checks
  const defaultData = {
    header: {
      title: 'How It Works',
      description: 'Renting a car has never been easier with our simple steps'
    },
    image: '',
    steps: []
  };

  // Ensure sectionData has all required properties with nullish coalescing
  const sectionData = {
    header: {
      title: sections?.howItWorks?.header?.title ?? defaultData.header.title,
      description: sections?.howItWorks?.header?.description ?? defaultData.header.description
    },
    image: sections?.howItWorks?.image ?? defaultData.image,
    steps: sections?.howItWorks?.steps ?? defaultData.steps
  };

  const isEditingHeader = editingSection === 'howItWorks-header';
  const fileInputRef = React.useRef(null);

  const handleHeaderEdit = () => {
    setEditingSection('howItWorks-header');
  };

  const handleHeaderSave = () => {
    const formData = new FormData();
    formData.append('content', JSON.stringify(sectionData));
    handleUpdate('howItWorks', formData);
    setEditingSection(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('content', JSON.stringify({
        ...sectionData,
        image: URL.createObjectURL(file)
      }));
      handleUpdate('howItWorks', formData);
    }
  };

  const handleAddStep = () => {
    const newStep = {
      title: 'New Step',
      description: 'Description for the new step',
      icon: 'car'
    };
    setSections({
      ...sections,
      howItWorks: {
        ...sectionData,
        steps: [...(sectionData.steps || []), newStep]
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Section Header</h3>
          {!isEditingHeader && (
            <button
              onClick={handleHeaderEdit}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <Edit2 size={18} />
              <span>Edit Header</span>
            </button>
          )}
        </div>

        {isEditingHeader ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={sectionData.header.title || ''}
                onChange={(e) => setSections({
                  ...sections,
                  howItWorks: {
                    ...sectionData,
                    header: { ...sectionData.header, title: e.target.value }
                  }
                })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={sectionData.header.description || ''}
                onChange={(e) => setSections({
                  ...sections,
                  howItWorks: {
                    ...sectionData,
                    header: { ...sectionData.header, description: e.target.value }
                  }
                })}
                rows="3"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleHeaderSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                <Save size={18} />
                <span>Save</span>
              </button>
              <button
                onClick={() => setEditingSection(null)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                <RotateCcw size={18} />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h4 className="font-medium text-gray-700">Current Header:</h4>
            <p className="font-bold mt-2">{sectionData.header.title || 'No title set'}</p>
            <p className="text-gray-600 mt-1">{sectionData.header.description || 'No description set'}</p>
          </div>
        )}
      </div>

      {/* Image Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Section Image</h3>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Upload size={18} />
            <span>Upload Image</span>
          </button>
        </div>
        {sectionData.image && (
          <div className="mt-4">
            <img
              src={sectionData.image}
              alt="Section"
              className="max-w-xs rounded shadow"
            />
          </div>
        )}
      </div>

      {/* Steps Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Steps</h3>
          <button
            onClick={handleAddStep}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus size={18} />
            <span>Add Step</span>
          </button>
        </div>

        {(sectionData.steps || []).map((step, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            {editingSection === `howItWorks-${index}` ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={step.title || ''}
                  onChange={(e) => {
                    const newSteps = [...sectionData.steps];
                    newSteps[index] = { ...step, title: e.target.value };
                    setSections({ ...sections, howItWorks: { ...sectionData, steps: newSteps } });
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="Enter step title"
                />
                <textarea
                  value={step.description || ''}
                  onChange={(e) => {
                    const newSteps = [...sectionData.steps];
                    newSteps[index] = { ...step, description: e.target.value };
                    setSections({ ...sections, howItWorks: { ...sectionData, steps: newSteps } });
                  }}
                  className="w-full p-2 border rounded"
                  rows="3"
                  placeholder="Enter step description"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const formData = new FormData();
                      formData.append('content', JSON.stringify(sectionData));
                      handleUpdate('howItWorks', formData);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    <Save size={18} />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => setEditingSection(null)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    <RotateCcw size={18} />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="font-medium mb-2">{step.title || 'Untitled Step'}</h4>
                <p className="text-gray-600 mb-4">{step.description || 'No description'}</p>
                <button
                  onClick={() => setEditingSection(`howItWorks-${index}`)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-900"
                >
                  <Edit2 size={18} />
                  <span>Edit</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}