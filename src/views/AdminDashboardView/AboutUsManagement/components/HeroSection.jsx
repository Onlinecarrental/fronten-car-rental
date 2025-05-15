import React from 'react';
import { Edit2, Save, RotateCcw } from 'lucide-react';

export default function HeroSection({ sections, setSections, editingSection, setEditingSection, handleUpdate }) {
  const handleSave = () => {
    const heroData = {
      title: sections.hero?.title || '',
      tagline: sections.hero?.tagline || '',
      image: sections.hero?.image
    };
    handleUpdate('hero', heroData);
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Hero Section</h3>
      <div className="bg-white rounded-lg shadow p-4">
        {editingSection === 'hero' ? (
          <div className="space-y-4">
            <input
              type="text"
              value={sections.hero?.title || ''}
              onChange={(e) => setSections({
                ...sections,
                hero: { ...sections.hero, title: e.target.value }
              })}
              className="w-full p-2 border rounded"
              placeholder="Hero Title"
            />
            <textarea
              value={sections.hero?.tagline || ''}
              onChange={(e) => setSections({
                ...sections,
                hero: { ...sections.hero, tagline: e.target.value }
              })}
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="Hero Tagline"
            />
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setSections({
                    ...sections,
                    hero: { ...sections.hero, image: file }
                  });
                }
              }}
              className="w-full p-2 border rounded"
              accept="image/*"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
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
            <div className="mb-4">
              <h4 className="font-medium">Current Content</h4>
              <p className="text-xl font-bold mt-2">{sections.hero?.title}</p>
              <p className="text-gray-600 mt-2">{sections.hero?.tagline}</p>
            </div>
            <button
              onClick={() => setEditingSection('hero')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Edit2 size={18} />
              <span>Edit Section</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}