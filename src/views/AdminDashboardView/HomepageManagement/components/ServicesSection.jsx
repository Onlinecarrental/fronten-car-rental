import React from 'react';
import { Edit2, Save, RotateCcw, Plus, Trash } from 'lucide-react';

export default function ServicesSection({ sections, setSections, editingSection, setEditingSection, handleUpdate }) {
  // Add proper default values with null checking
  const defaultServices = {
    header: {
      title: 'Our Services & Benefits',
      description: 'To make renting easy and hassle-free, we provide a variety of services and advantages'
    },
    items: [] // Ensure items is always an array
  };

  // Use nullish coalescing to handle undefined sections
  const servicesData = sections?.services ?? defaultServices;
  
  // Ensure items is always an array even if it's undefined in servicesData
  const items = servicesData?.items ?? [];

  const isEditingHeader = editingSection === 'services-header';

  const handleHeaderEdit = () => {
    setEditingSection('services-header');
  };

  const handleHeaderSave = () => {
    const formData = new FormData();
    formData.append('content', JSON.stringify({
      header: servicesData.header,
      items: items
    }));
    handleUpdate('services', formData);
  };

  const handleHeaderChange = (field, value) => {
    setSections({
      ...sections,
      services: {
        ...servicesData,
        header: {
          ...servicesData.header,
          [field]: value
        }
      }
    });
  };

  return (
    <div className="mb-8">
      {/* Header Section */}
      <div className="mb-8 bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Section Header</h3>
          {!isEditingHeader ? (
            <button
              onClick={handleHeaderEdit}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <Edit2 size={18} />
              <span>Edit Header</span>
            </button>
          ) : null}
        </div>

        {isEditingHeader ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={servicesData.header?.title || ''}
                onChange={(e) => handleHeaderChange('title', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={servicesData.header?.description || ''}
                onChange={(e) => handleHeaderChange('description', e.target.value)}
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
                <span>Save Changes</span>
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
            <p className="font-bold mt-2">{servicesData.header?.title || 'No title set'}</p>
            <p className="text-gray-600 mt-1">{servicesData.header?.description || 'No description set'}</p>
          </div>
        )}
      </div>

      {/* Services Items Section */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Services & Benefits</h3>
        <button
          onClick={() => {
            const newServices = [...items, {
              title: '',
              description: '',
              iconPath: 'M12 6v6m0 0v6m0-6h6m-6 0H6'
            }];
            setSections({
              ...sections,
              services: {
                ...servicesData,
                items: newServices
              }
            });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus size={18} />
          <span>Add Service</span>
        </button>
      </div>

      <div className="space-y-4">
        {items.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            {editingSection === `service-${index}` ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={service.title || ''}
                    onChange={(e) => {
                      const newServices = [...items];
                      newServices[index] = {
                        ...service,
                        title: e.target.value
                      };
                      setSections({ ...sections, services: { ...servicesData, items: newServices } });
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Enter service title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={service.description || ''}
                    onChange={(e) => {
                      const newServices = [...items];
                      newServices[index] = {
                        ...service,
                        description: e.target.value
                      };
                      setSections({ ...sections, services: { ...servicesData, items: newServices } });
                    }}
                    rows="3"
                    className="w-full p-2 border rounded"
                    placeholder="Enter service description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Icon Path</label>
                  <input
                    type="text"
                    value={service.iconPath || ''}
                    onChange={(e) => {
                      const newServices = [...items];
                      newServices[index] = {
                        ...service,
                        iconPath: e.target.value
                      };
                      setSections({ ...sections, services: { ...servicesData, items: newServices } });
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Enter SVG path data"
                  />
                </div>

                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const formData = new FormData();
                        formData.append('content', JSON.stringify(servicesData));
                        handleUpdate('services', formData);
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
                  <button
                    onClick={() => {
                      const newServices = items.filter((_, i) => i !== index);
                      setSections({ ...sections, services: { ...servicesData, items: newServices } });
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    <Trash size={18} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={service.iconPath}
                      />
                    </svg>
                  </div>
                  <h4 className="font-medium">{service.title}</h4>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button
                  onClick={() => setEditingSection(`service-${index}`)}
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