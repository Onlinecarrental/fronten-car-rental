import React, { useState } from 'react';
import { Edit2, Save, RotateCcw, Plus, Trash } from 'lucide-react';

export default function CarCollectionSection({ sections, setSections, editingSection, setEditingSection, handleUpdate }) {
  const [updateStatus, setUpdateStatus] = useState({
    loading: false,
    error: null,
    success: null
  });

  const addNewCar = () => {
    setSections(prev => ({
      ...prev,
      carCollection: {
        ...prev.carCollection,
        cars: [
          ...(prev.carCollection.cars || []),
          { 
            title: '', 
            description: '', 
            image: null,
            features: []
          }
        ]
      }
    }));
    setEditingSection(`car-${sections.carCollection.cars.length}`);
  };

  const handleCarSave = async (index) => {
    try {
      setUpdateStatus({ loading: true, error: null });

      const car = sections.carCollection.cars[index];
      if (!car.title?.trim() || !car.description?.trim()) {
        throw new Error('Title and description are required');
      }

      const content = {
        header: sections.carCollection.header,
        cars: sections.carCollection.cars.map((item, i) => ({
          ...item,
          title: item.title.trim(),
          description: item.description.trim()
        }))
      };

      // Handle image upload if present
      if (car.imageFile) {
        const formData = new FormData();
        formData.append('image', car.imageFile);
        formData.append('content', JSON.stringify(content));
        
        const result = await handleUpdate('carCollection', formData);
        
        if (result?.success) {
          setSections(prev => ({
            ...prev,
            carCollection: {
              ...result.data.content,
              cars: result.data.content.cars.map(c => ({
                ...c,
                imageFile: null
              }))
            }
          }));
          setEditingSection(null);
          setUpdateStatus({
            loading: false,
            error: null,
            success: 'Car updated successfully!'
          });
        }
      } else {
        const result = await handleUpdate('carCollection', content);
        
        if (result?.success) {
          setSections(prev => ({
            ...prev,
            carCollection: result.data.content
          }));
          setEditingSection(null);
          setUpdateStatus({
            loading: false,
            error: null,
            success: 'Car updated successfully!'
          });
        }
      }
    } catch (error) {
      setUpdateStatus({
        loading: false,
        error: error.message,
        success: null
      });
    }
  };

  const deleteCar = async (index) => {
    try {
      setUpdateStatus({ loading: true, error: null });

      const newCars = sections.carCollection.cars.filter((_, i) => i !== index);
      const content = {
        header: sections.carCollection.header,
        cars: newCars
      };

      const result = await handleUpdate('carCollection', content);

      if (result?.success) {
        setSections(prev => ({
          ...prev,
          carCollection: result.data.content
        }));
        setUpdateStatus({
          loading: false,
          error: null,
          success: 'Car deleted successfully!'
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

  const handleImageChange = (index, file) => {
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setUpdateStatus({
          loading: false,
          error: 'Image size should be less than 5MB',
          success: null
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        setUpdateStatus({
          loading: false,
          error: 'Please upload an image file',
          success: null
        });
        return;
      }

      setSections(prev => ({
        ...prev,
        carCollection: {
          ...prev.carCollection,
          cars: prev.carCollection.cars.map((car, i) => 
            i === index ? {
              ...car,
              imageFile: file,
              image: URL.createObjectURL(file)
            } : car
          )
        }
      }));
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
        <h3 className="text-xl font-semibold">Car Collection</h3>
        <button 
          onClick={addNewCar} 
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          <Plus size={18} />
          <span>Add Car</span>
        </button>
      </div>

      <div className="grid gap-4">
        {sections.carCollection.cars.map((car, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            {editingSection === `car-${index}` ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={car.title}
                  onChange={(e) => {
                    setSections(prev => ({
                      ...prev,
                      carCollection: {
                        ...prev.carCollection,
                        cars: prev.carCollection.cars.map((c, i) => 
                          i === index ? { ...c, title: e.target.value } : c
                        )
                      }
                    }));
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="Car Name"
                />
                <textarea
                  value={car.description}
                  onChange={(e) => {
                    setSections(prev => ({
                      ...prev,
                      carCollection: {
                        ...prev.carCollection,
                        cars: prev.carCollection.cars.map((c, i) => 
                          i === index ? { ...c, description: e.target.value } : c
                        )
                      }
                    }));
                  }}
                  className="w-full p-2 border rounded"
                  rows="3"
                  placeholder="Car Description"
                />
                <input
                  type="file"
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                  className="w-full p-2 border rounded"
                  accept="image/*"
                />
                {car.image && (
                  <div className="relative">
                    <img 
                      src={car.image}
                      alt={car.title || 'Car preview'} 
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleCarSave(index)}
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
                    onClick={() => deleteCar(index)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded ml-auto hover:bg-red-700 transition-colors"
                  >
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
                    src={car.image}
                    alt={car.title} 
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <button 
                  onClick={() => setEditingSection(`car-${index}`)}
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