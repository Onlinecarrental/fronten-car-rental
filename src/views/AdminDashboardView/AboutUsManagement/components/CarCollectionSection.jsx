import React from 'react';
import { Edit2, Save, RotateCcw, Plus, Trash } from 'lucide-react';

export default function CarCollectionSection({ sections, setSections, editingSection, setEditingSection, handleUpdate }) {
  const addNewCar = () => {
    const newCars = [...sections.carCollection, { 
      title: '', 
      description: '', 
      image: '',
      features: []
    }];
    setSections({ ...sections, carCollection: newCars });
  };

  const deleteCar = (index) => {
    const newCars = sections.carCollection.filter((_, i) => i !== index);
    setSections({ ...sections, carCollection: newCars });
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Car Collection</h3>
        <button onClick={addNewCar} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded">
          <Plus size={18} />
          <span>Add Car</span>
        </button>
      </div>

      <div className="grid gap-4">
        {sections.carCollection.map((car, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            {editingSection === `car-${index}` ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={car.title}
                  onChange={(e) => {
                    const newCars = [...sections.carCollection];
                    newCars[index].title = e.target.value;
                    setSections({ ...sections, carCollection: newCars });
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="Car Name"
                />
                <textarea
                  value={car.description}
                  onChange={(e) => {
                    const newCars = [...sections.carCollection];
                    newCars[index].description = e.target.value;
                    setSections({ ...sections, carCollection: newCars });
                  }}
                  className="w-full p-2 border rounded"
                  rows="3"
                  placeholder="Car Description"
                />
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const newCars = [...sections.carCollection];
                      newCars[index].image = file;
                      setSections({ ...sections, carCollection: newCars });
                    }
                  }}
                  className="w-full p-2 border rounded"
                  accept="image/*"
                />
                <div className="flex gap-2">
                  <button onClick={() => handleUpdate('carCollection', sections.carCollection)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded">
                    <Save size={18} />
                    <span>Save</span>
                  </button>
                  <button onClick={() => setEditingSection(null)} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded">
                    <RotateCcw size={18} />
                    <span>Cancel</span>
                  </button>
                  <button onClick={() => deleteCar(index)} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded ml-auto">
                    <Trash size={18} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="font-medium mb-2">{car.title}</h4>
                <p className="text-gray-600 mb-4">{car.description}</p>
                {car.image && (
                  <img 
                    src={typeof car.image === 'string' ? car.image : URL.createObjectURL(car.image)} 
                    alt={car.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <button onClick={() => setEditingSection(`car-${index}`)} className="flex items-center gap-2 text-blue-600">
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