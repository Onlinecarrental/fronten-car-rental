import React, { useState } from 'react';
import { Edit2, Save, RotateCcw, Plus, Trash, AlertCircle, Upload } from 'lucide-react';
import axios from 'axios';

export default function ServicesSection({ sections, setSections, editingSection, setEditingSection, handleUpdate }) {
  const [updateStatus, setUpdateStatus] = useState({
    loading: false,
    error: null,
    success: null
  });

  // Access items array correctly from sections structure
  const services = sections?.services?.items || [];

  const handleServiceSave = async () => {
    try {
      setUpdateStatus({ loading: true, error: null });

      const content = {
        header: sections.services.header,
        items: services.map(item => ({
          title: item.title.trim(),
          description: item.description.trim(),
          icon: item.icon
        }))
      };

      const result = await handleUpdate('services', content);

      if (result?.success) {
        setSections(prev => ({
          ...prev,
          services: result.data.content
        }));
        setEditingSection(null);
        setUpdateStatus({
          loading: false,
          error: null,
          success: 'Services updated successfully!'
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

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newServices = [...sections.services];
      newServices[index] = {
        ...newServices[index],
        icon: file,
        iconPreview: reader.result
      };
      setSections({ ...sections, services: newServices });
    };

    reader.readAsDataURL(file);
  };

  const addNewService = () => {
    setSections(prev => ({
      ...prev,
      services: {
        ...prev.services,
        items: [
          ...(prev.services?.items || []),
          { title: '', description: '', icon: null }
        ]
      }
    }));
  };

  const deleteService = (index) => {
    setSections(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="mb-8">
      {updateStatus.error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle size={18} />
          <span>{updateStatus.error}</span>
        </div>
      )}

      {updateStatus.success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
          <Save size={18} />
          <span>{updateStatus.success}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Our Services</h3>
        <button 
          onClick={addNewService} 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus size={18} />
          <span>Add Service</span>
        </button>
      </div>

      <div className="grid gap-4">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            {editingSection === `service-${index}` ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => {
                      const newServices = [...sections.services];
                      newServices[index].title = e.target.value;
                      setSections({ ...sections, services: newServices });
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Service Title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={service.description}
                    onChange={(e) => {
                      const newServices = [...sections.services];
                      newServices[index].description = e.target.value;
                      setSections({ ...sections, services: newServices });
                    }}
                    className="w-full p-2 border rounded"
                    rows="3"
                    placeholder="Service Description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Icon</label>
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(e, index)}
                    className="w-full p-2 border rounded"
                    accept="image/*"
                  />
                  {service.iconPreview && (
                    <img 
                      src={service.iconPreview} 
                      alt="Icon Preview" 
                      className="mt-4 w-16 h-16 object-contain"
                    />
                  )}
                </div>

                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleServiceSave(index)}
                      disabled={updateStatus.loading}
                      className={`flex items-center gap-2 px-4 py-2 ${
                        updateStatus.loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
                      } text-white rounded`}
                    >
                      <Save size={18} />
                      <span>{updateStatus.loading ? 'Saving...' : 'Save'}</span>
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
                    onClick={() => deleteService(index)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    <Trash size={18} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <h4 className="font-medium text-xl">{service.title || 'No title set'}</h4>
                  <p className="text-gray-600 mt-2">{service.description || 'No description set'}</p>
                  {service.icon && (
                    <img 
                      src={typeof service.icon === 'string' ? service.icon : URL.createObjectURL(service.icon)} 
                      alt={service.title} 
                      className="mt-4 w-16 h-16 object-contain"
                    />
                  )}
                </div>
                <button
                  onClick={() => setEditingSection(`service-${index}`)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
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