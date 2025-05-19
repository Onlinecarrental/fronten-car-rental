import React, { useState } from 'react';
import { Edit2, Save, RotateCcw, Plus, Trash, Shield, Award, ThumbsUp } from 'lucide-react';

const trustIcons = {
  'shield': <Shield className="w-6 h-6 text-blue-600" />,
  'award': <Award className="w-6 h-6 text-yellow-600" />,
  'thumbs-up': <ThumbsUp className="w-6 h-6 text-green-600" />
};

export default function TrustSection({ sections, setSections, editingSection, setEditingSection, handleUpdate }) {
  const [updateStatus, setUpdateStatus] = useState({
    loading: false,
    error: null,
    success: null
  });

  const handleTrustSave = async (index) => {
    try {
      setUpdateStatus({ loading: true, error: null });

      const trust = sections.trust.items[index];
      if (!trust.title?.trim() || !trust.description?.trim()) {
        throw new Error('Title and description are required');
      }

      const content = {
        header: sections.trust.header,
        items: sections.trust.items.map(item => ({
          ...item,
          title: item.title.trim(),
          description: item.description.trim(),
          icon: item.icon || 'shield'
        }))
      };

      const result = await handleUpdate('trust', content);

      if (result?.success) {
        setSections(prev => ({
          ...prev,
          trust: result.data.content
        }));
        setEditingSection(null);
        setUpdateStatus({
          loading: false,
          error: null,
          success: 'Trust property updated successfully!'
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

  const addNewTrust = () => {
    setSections(prev => ({
      ...prev,
      trust: {
        ...prev.trust,
        items: [
          ...(prev.trust.items || []),
          { title: '', description: '', icon: 'shield' }
        ]
      }
    }));
    setEditingSection(`trust-${sections.trust.items.length}`);
  };

  const deleteTrust = async (index) => {
    try {
      setUpdateStatus({ loading: true, error: null });

      const newItems = sections.trust.items.filter((_, i) => i !== index);
      const content = {
        header: sections.trust.header,
        items: newItems
      };

      const result = await handleUpdate('trust', content);

      if (result?.success) {
        setSections(prev => ({
          ...prev,
          trust: result.data.content
        }));
        setUpdateStatus({
          loading: false,
          error: null,
          success: 'Trust property deleted successfully!'
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
        <h3 className="text-xl font-semibold">Trust Properties</h3>
        <button 
          onClick={addNewTrust} 
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          <Plus size={18} />
          <span>Add Trust Property</span>
        </button>
      </div>

      <div className="grid gap-4">
        {sections.trust.items.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            {editingSection === `trust-${index}` ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const newItems = [...sections.trust.items];
                    newItems[index] = { ...newItems[index], title: e.target.value };
                    setSections(prev => ({
                      ...prev,
                      trust: {
                        ...prev.trust,
                        items: newItems
                      }
                    }));
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="Title"
                />
                <textarea
                  value={item.description}
                  onChange={(e) => {
                    const newItems = [...sections.trust.items];
                    newItems[index] = { ...newItems[index], description: e.target.value };
                    setSections(prev => ({
                      ...prev,
                      trust: {
                        ...prev.trust,
                        items: newItems
                      }
                    }));
                  }}
                  className="w-full p-2 border rounded"
                  rows="3"
                  placeholder="Description"
                />
                <select
                  value={item.icon || 'shield'}
                  onChange={(e) => {
                    const newItems = [...sections.trust.items];
                    newItems[index] = { ...newItems[index], icon: e.target.value };
                    setSections(prev => ({
                      ...prev,
                      trust: {
                        ...prev.trust,
                        items: newItems
                      }
                    }));
                  }}
                  className="w-full p-2 border rounded"
                >
                  <option value="shield">Shield</option>
                  <option value="award">Award</option>
                  <option value="thumbs-up">Thumbs Up</option>
                </select>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleTrustSave(index)}
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
                    onClick={() => deleteTrust(index)}
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
                  {trustIcons[item.icon || 'shield']}
                  <h4 className="font-medium">{item.title}</h4>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <button 
                  onClick={() => setEditingSection(`trust-${index}`)}
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