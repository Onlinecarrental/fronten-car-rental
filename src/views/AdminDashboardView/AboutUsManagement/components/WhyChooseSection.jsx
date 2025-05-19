import React, { useState } from 'react';
import { Edit2, Save, RotateCcw, Plus, Trash, Shield } from 'lucide-react';

const reasonIcons = {
  'shield-check': <Shield className="w-6 h-6 text-blue-600" />,
  // ... add other icons as needed
};

export default function WhyChooseSection({ sections, setSections, editingSection, setEditingSection, handleUpdate }) {
  const [updateStatus, setUpdateStatus] = useState({
    loading: false,
    error: null,
    success: null
  });

  const handleHeaderSave = async () => {
    try {
      setUpdateStatus({ loading: true, error: null });

      if (!sections.whyChoose.header.title.trim() || !sections.whyChoose.header.description.trim()) {
        throw new Error('Header title and description are required');
      }

      const content = {
        header: {
          title: sections.whyChoose.header.title.trim(),
          description: sections.whyChoose.header.description.trim()
        },
        reasons: sections.whyChoose.reasons
      };

      const result = await handleUpdate('whyChoose', content);

      if (result?.success) {
        setSections(prev => ({
          ...prev,
          whyChoose: result.data.content
        }));
        setEditingSection(null);
        setUpdateStatus({
          loading: false,
          error: null,
          success: 'Header updated successfully!'
        });
      }
    } catch (error) {
      setUpdateStatus({
        loading: false,
        error: error.message,
        success: null
      });
    }
  };

  const handleReasonSave = async (index) => {
    try {
      setUpdateStatus({ loading: true, error: null });

      const reason = sections.whyChoose.reasons[index];
      if (!reason.title.trim() || !reason.description.trim()) {
        throw new Error('Title and description are required');
      }

      const content = {
        header: sections.whyChoose.header,
        reasons: sections.whyChoose.reasons.map((r, i) => ({
          ...r,
          title: r.title.trim(),
          description: r.description.trim(),
          icon: r.icon || 'shield-check'
        }))
      };

      const result = await handleUpdate('whyChoose', content);

      if (result?.success) {
        setSections(prev => ({
          ...prev,
          whyChoose: result.data.content
        }));
        setEditingSection(null);
        setUpdateStatus({
          loading: false,
          error: null,
          success: 'Reason updated successfully!'
        });
      }
    } catch (error) {
      setUpdateStatus({
        loading: false,
        error: error.message,
        success: null
      });
    }
  };

  const addNewReason = () => {
    setSections(prev => ({
      ...prev,
      whyChoose: {
        ...prev.whyChoose,
        reasons: [
          ...prev.whyChoose.reasons,
          { title: '', description: '', icon: 'shield-check' }
        ]
      }
    }));
    setEditingSection(`whyChoose-${sections.whyChoose.reasons.length}`);
  };

  const deleteReason = async (index) => {
    try {
      setUpdateStatus({ loading: true, error: null });

      const newReasons = sections.whyChoose.reasons.filter((_, i) => i !== index);
      const content = {
        header: sections.whyChoose.header,
        reasons: newReasons
      };

      const result = await handleUpdate('whyChoose', content);

      if (result?.success) {
        setSections(prev => ({
          ...prev,
          whyChoose: result.data.content
        }));
        setUpdateStatus({
          loading: false,
          error: null,
          success: 'Reason deleted successfully!'
        });
      }
    } catch (error) {
      setUpdateStatus({
        loading: false,
        error: error.message,
        success: null
      });
    }
  };

  return (
    <div className="mb-8">
      {updateStatus.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded mb-4">
          {updateStatus.error}
        </div>
      )}

      {updateStatus.success && (
        <div className="bg-green-50 text-green-600 p-4 rounded mb-4">
          {updateStatus.success}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Why Choose Us</h3>
        <button 
          onClick={addNewReason} 
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          <Plus size={18} />
          <span>Add Reason</span>
        </button>
      </div>

      <div className="grid gap-4">
        {sections.whyChoose.reasons.map((reason, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            {editingSection === `whyChoose-${index}` ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={reason.title}
                  onChange={(e) => {
                    const newReasons = [...sections.whyChoose.reasons];
                    newReasons[index] = { ...newReasons[index], title: e.target.value };
                    setSections(prev => ({
                      ...prev,
                      whyChoose: {
                        ...prev.whyChoose,
                        reasons: newReasons
                      }
                    }));
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="Title"
                />
                <textarea
                  value={reason.description}
                  onChange={(e) => {
                    const newReasons = [...sections.whyChoose.reasons];
                    newReasons[index] = { ...newReasons[index], description: e.target.value };
                    setSections(prev => ({
                      ...prev,
                      whyChoose: {
                        ...prev.whyChoose,
                        reasons: newReasons
                      }
                    }));
                  }}
                  className="w-full p-2 border rounded"
                  rows="3"
                  placeholder="Description"
                />
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleReasonSave(index)} 
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    <Save size={18} />
                    <span>Save</span>
                  </button>
                  <button 
                    onClick={() => setEditingSection(null)} 
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    <RotateCcw size={18} />
                    <span>Cancel</span>
                  </button>
                  <button 
                    onClick={() => deleteReason(index)} 
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded ml-auto hover:bg-red-700 transition-colors"
                  >
                    <Trash size={18} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {reasonIcons[reason.icon]}
                  <h4 className="font-medium">{reason.title}</h4>
                </div>
                <p className="text-gray-600 mb-4">{reason.description}</p>
                <button 
                  onClick={() => setEditingSection(`whyChoose-${index}`)} 
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Edit2 size={18} />
                  <span>Edit</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {updateStatus.loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}