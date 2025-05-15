import React from 'react';
import { Edit2, Save, RotateCcw, Plus, Trash } from 'lucide-react';

export default function WhyChooseSection({ sections, setSections, editingSection, setEditingSection, handleUpdate }) {
  const addNewReason = () => {
    const newReasons = [...sections.whyChoose, { title: '', description: '' }];
    setSections({ ...sections, whyChoose: newReasons });
  };

  const deleteReason = (index) => {
    const newReasons = sections.whyChoose.filter((_, i) => i !== index);
    setSections({ ...sections, whyChoose: newReasons });
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Why Choose Us</h3>
        <button onClick={addNewReason} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded">
          <Plus size={18} />
          <span>Add Reason</span>
        </button>
      </div>

      <div className="grid gap-4">
        {sections.whyChoose.map((reason, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            {editingSection === `whyChoose-${index}` ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={reason.title}
                  onChange={(e) => {
                    const newReasons = [...sections.whyChoose];
                    newReasons[index].title = e.target.value;
                    setSections({ ...sections, whyChoose: newReasons });
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="Title"
                />
                <textarea
                  value={reason.description}
                  onChange={(e) => {
                    const newReasons = [...sections.whyChoose];
                    newReasons[index].description = e.target.value;
                    setSections({ ...sections, whyChoose: newReasons });
                  }}
                  className="w-full p-2 border rounded"
                  rows="3"
                  placeholder="Description"
                />
                <div className="flex gap-2">
                  <button onClick={() => handleUpdate('whyChoose', sections.whyChoose)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded">
                    <Save size={18} />
                    <span>Save</span>
                  </button>
                  <button onClick={() => setEditingSection(null)} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded">
                    <RotateCcw size={18} />
                    <span>Cancel</span>
                  </button>
                  <button onClick={() => deleteReason(index)} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded ml-auto">
                    <Trash size={18} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="font-medium mb-2">{reason.title}</h4>
                <p className="text-gray-600 mb-4">{reason.description}</p>
                <button onClick={() => setEditingSection(`whyChoose-${index}`)} className="flex items-center gap-2 text-blue-600">
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