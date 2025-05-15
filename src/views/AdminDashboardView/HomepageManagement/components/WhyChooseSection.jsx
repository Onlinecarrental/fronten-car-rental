import React from 'react';
  import { Edit2, Save, RotateCcw, Plus, Trash, Shield, Clock, Trophy } from 'lucide-react';

export default function WhyChooseSection({ sections, setSections, editingSection, setEditingSection, handleUpdate }) {
  const defaultData = {
    header: {
      title: 'Why Choose Us',
      description: 'We offer the best experience with our rental deals'
    },
    reasons: []
  };

  const sectionData = {
    header: {
      title: sections?.whyChoose?.header?.title ?? defaultData.header.title,
      description: sections?.whyChoose?.header?.description ?? defaultData.header.description
    },
    reasons: sections?.whyChoose?.reasons ?? []
  };

  const isEditingHeader = editingSection === 'whyChoose-header';

  const handleHeaderEdit = () => {
    setEditingSection('whyChoose-header');
  };

  const handleHeaderSave = async () => {
    try {
      const formData = new FormData();
      const content = {
        header: sectionData.header,
        reasons: sectionData.reasons
      };
      
      formData.append('content', JSON.stringify(content));
      await handleUpdate('whyChoose', formData);
      setEditingSection(null);
    } catch (error) {
      console.error('Error saving header:', error);
    }
  };

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'shield-check':
        return <Shield className="w-6 h-6" />;
      case 'clock':
        return <Clock className="w-6 h-6" />;
      case 'trophy':
        return <Trophy className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const addNewReason = () => {
    const newReason = {
      title: '',
      description: '',
      icon: 'shield-check'
    };
    setSections({
      ...sections,
      whyChoose: {
        ...sectionData,
        reasons: [...sectionData.reasons, newReason]
      }
    });
  };

  const updateReason = (index, field, value) => {
    const newReasons = [...sectionData.reasons];
    newReasons[index] = { ...newReasons[index], [field]: value };
    setSections({
      ...sections,
      whyChoose: {
        ...sectionData,
        reasons: newReasons
      }
    });
  };

  const handleReasonSave = async (index) => {
    try {
      const formData = new FormData();
      const content = {
        header: sectionData.header,
        reasons: sectionData.reasons
      };
      
      formData.append('content', JSON.stringify(content));
      await handleUpdate('whyChoose', formData);
      setEditingSection(null);
    } catch (error) {
      console.error('Error saving reason:', error);
    }
  };

  const deleteReason = async (index) => {
    try {
      const newReasons = sectionData.reasons.filter((_, i) => i !== index);
      const content = {
        header: sectionData.header,
        reasons: newReasons
      };

      setSections({
        ...sections,
        whyChoose: {
          ...sectionData,
          reasons: newReasons
        }
      });

      const formData = new FormData();
      formData.append('content', JSON.stringify(content));
      await handleUpdate('whyChoose', formData);
    } catch (error) {
      console.error('Error deleting reason:', error);
    }
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
                value={sectionData.header.title}
                onChange={(e) => setSections({
                  ...sections,
                  whyChoose: {
                    ...sectionData,
                    header: { ...sectionData.header, title: e.target.value }
                  }
                })}
                className="w-full p-2 border rounded"
                placeholder="Section Title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={sectionData.header.description}
                onChange={(e) => setSections({
                  ...sections,
                  whyChoose: {
                    ...sectionData,
                    header: { ...sectionData.header, description: e.target.value }
                  }
                })}
                rows="3"
                className="w-full p-2 border rounded"
                placeholder="Section Description"
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
            <p className="font-bold mt-2">{sectionData.header.title}</p>
            <p className="text-gray-600 mt-1">{sectionData.header.description}</p>
          </div>
        )}
      </div>

      {/* Reasons Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Reasons</h3>
          <button 
            onClick={addNewReason}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus size={18} />
            <span>Add Reason</span>
          </button>
        </div>

        <div className="grid gap-4">
          {sectionData.reasons.map((reason, index) => (
            <div key={index} className="border rounded-lg p-4">
              {editingSection === `whyChoose-${index}` ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      value={reason.title}
                      onChange={(e) => updateReason(index, 'title', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Reason Title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      value={reason.description}
                      onChange={(e) => updateReason(index, 'description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                      placeholder="Reason Description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Icon</label>
                    <select
                      value={reason.icon}
                      onChange={(e) => updateReason(index, 'icon', e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="shield-check">Shield</option>
                      <option value="clock">Clock</option>
                      <option value="trophy">Trophy</option>
                    </select>
                    <div className="mt-2">
                      {getIconComponent(reason.icon)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleReasonSave(index)}
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
                    <button 
                      onClick={() => deleteReason(index)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      <Trash size={18} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    {getIconComponent(reason.icon)}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium mb-2">{reason.title || 'Untitled Reason'}</h4>
                    <p className="text-gray-600 mb-4">{reason.description || 'No description'}</p>
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => setEditingSection(`whyChoose-${index}`)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                      >
                        <Edit2 size={18} />
                        <span>Edit</span>
                      </button>
                      <button 
                        onClick={() => deleteReason(index)}
                        className="flex items-center gap-2 text-red-600 hover:text-red-800"
                      >
                        <Trash size={18} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}