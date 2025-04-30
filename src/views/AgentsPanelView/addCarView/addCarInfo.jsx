import React, { useState } from "react";

export default function AddCarInfo() {
  // State to store form values
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    year: "",
    licenseNo: "",
    color: "",
    seats: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Form data submitted:", formData);
    // You can add API call or other functionality here in the future
  };

  return (
    <div className="w-full  mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray"> Car Info</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-lg font-medium mb-1">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Car Name"
            className="w-full p-3 bg-gray rounded text-black placeholder-white"
          />
        </div>

        {/* Model Field */}
        <div>
          <label htmlFor="model" className="block text-lg font-medium mb-1">Model:</label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Enter Car Model"
            className="w-full p-3 bg-gray rounded text-black placeholder-white"
          />
        </div>

        {/* Year Field */}
        <div>
          <label htmlFor="year" className="block text-lg font-medium mb-1">Year</label>
          <input
            type="text"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Enter Model Year"
            className="w-full p-3 bg-gray rounded text-black placeholder-white"
          />
        </div>

        {/* License Number Field */}
        <div>
          <label htmlFor="licenseNo" className="block text-lg font-medium mb-1">License no:</label>
          <input
            type="text"
            id="licenseNo"
            name="licenseNo"
            value={formData.licenseNo}
            onChange={handleChange}
            placeholder  = "Enter License no."
            className="w-full p-3 bg-gray rounded text-black placeholder-white"
          />
        </div>

        {/* Color Field */}
        <div>
          <label htmlFor="color" className="block text-lg font-medium mb-1">Color:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Enter Color"
            className="w-full p-3 bg-gray rounded text-black placeholder-white"
          />
        </div>

        {/* Seats Field */}
        <div>
          <label htmlFor="seats" className="block text-lg font-medium mb-1">Seats</label>
          <input
            type="number"
            id="seats"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            placeholder="Enter Total Seats"
            className="w-full p-3 bg-gray rounded text-black placeholder-white"
          />
        </div>
      </div>
      
     
    </div>
  );
}