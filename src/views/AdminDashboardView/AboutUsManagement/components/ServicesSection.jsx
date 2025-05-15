import React from 'react';
import { Edit2, Save, RotateCcw, Plus, Trash } from 'lucide-react';

export default function ServicesSection({ sections, setSections, editingSection, setEditingSection, handleUpdate }) {
  const addNewService = () => {
    const newServices = [...sections.services, { title: '', description: '', icon: '' }];
    setSections({ ...sections, services: newServices });
  };

  const deleteService = (index) => {
    const newServices = sections.services.filter((_, i) => i !== index);
    setSections({ ...sections, services: newServices });
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Our Services</h3>
        <button onClick={addNewService} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded">
          <Plus size={18} />
          <span>Add Service</span>
        </button>
      </div>

      <div className="grid gap-4">
        {sections.services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            {editingSection === `service-${index}` ? (
              <div className="space-y-4">
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
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const newServices = [...sections.services];
                      newServices[index].icon = file;
                      setSections({ ...sections, services: newServices });
                    }
                  }}
                  className="w-full p-2 border rounded"
                  accept="image/*"
                />
                <div className="flex gap-2">
                  <button onClick={() => handleUpdate('services', sections.services)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded">
                    <Save size={18} />
                    <span>Save</span>
                  </button>
                  <button onClick={() => setEditingSection(null)} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded">
                    <RotateCcw size={18} />
                    <span>Cancel</span>
                  </button>
                  <button onClick={() => deleteService(index)} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded ml-auto">
                    <Trash size={18} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="font-medium mb-2">{service.title}</h4>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button onClick={() => setEditingSection(`service-${index}`)} className="flex items-center gap-2 text-blue-600">
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