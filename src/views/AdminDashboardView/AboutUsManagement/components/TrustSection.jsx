import React from 'react';
import { Edit2, Save, RotateCcw, Plus, Trash } from 'lucide-react';

export default function TrustSection({ sections, setSections, editingSection, setEditingSection, handleUpdate }) {
  const addNewTrust = () => {
    const newTrust = [...sections.trust, { title: '', description: '', icon: '' }];
    setSections({ ...sections, trust: newTrust });
  };

  const deleteTrust = (index) => {
    const newTrust = sections.trust.filter((_, i) => i !== index);
    setSections({ ...sections, trust: newTrust });
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Trust Properties</h3>
        <button onClick={addNewTrust} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded">
          <Plus size={18} />
          <span>Add Trust Property</span>
        </button>
      </div>

      <div className="grid gap-4">
        {sections.trust.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            {editingSection === `trust-${index}` ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const newTrust = [...sections.trust];
                    newTrust[index].title = e.target.value;
                    setSections({ ...sections, trust: newTrust });
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="Title"
                />
                <textarea
                  value={item.description}
                  onChange={(e) => {
                    const newTrust = [...sections.trust];
                    newTrust[index].description = e.target.value;
                    setSections({ ...sections, trust: newTrust });
                  }}
                  className="w-full p-2 border rounded"
                  rows="3"
                  placeholder="Description"
                />
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const newTrust = [...sections.trust];
                      newTrust[index].icon = file;
                      setSections({ ...sections, trust: newTrust });
                    }
                  }}
                  className="w-full p-2 border rounded"
                  accept="image/*"
                />
                <div className="flex gap-2">
                  <button onClick={() => handleUpdate('trust', sections.trust)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded">
                    <Save size={18} />
                    <span>Save</span>
                  </button>
                  <button onClick={() => setEditingSection(null)} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded">
                    <RotateCcw size={18} />
                    <span>Cancel</span>
                  </button>
                  <button onClick={() => deleteTrust(index)} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded ml-auto">
                    <Trash size={18} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="font-medium mb-2">{item.title}</h4>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <button onClick={() => setEditingSection(`trust-${index}`)} className="flex items-center gap-2 text-blue-600">
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