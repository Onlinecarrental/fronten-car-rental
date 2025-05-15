import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaClock } from "react-icons/fa";
import Button from "./../../../components/button";
import BaseCard from "./../../../components/card";

const icons = [
  "./../../src/assets/mileage.svg",
  "./../../src/assets/transmission.svg",
  "./../../src/assets/seating.svg",
  "./../../src/assets/feultype.svg",
];

const Card = ({ car, onEdit, onDelete }) => {
  return (
    <BaseCard bgColor="bg-gray" className="w-auto h-auto p-2">
      <img
        src={`http://localhost:5000/${car.coverImage}`}
        alt={car.name}
        className="rounded-[10px] w-full h-[180px] object-cover"
        onError={(e) => {
          e.target.src = "./../../src/assets/default-car.jpg";
        }}
      />
      <div className="px-3 pt-2">
        <h2 className="font-semibold text-[14px]">{car.name}</h2>
        <p className="text-[22px] font-bold pt-1">
          ${car.dailyRate}
          <span className="text-[14px] font-normal">/day</span>
        </p>
      </div>
      <div className="flex justify-between items-center bg-white p-2 mt-2 rounded-[10px]">
        <div className="text-center text-[10px]">
          <img src={icons[0]} alt="mileage" className="w-4 h-4 mx-auto mb-1" />
          <div className="text-[14px] font-bold">{car.model}</div>
        </div>
        <div className="text-center text-[10px]">
          <img src={icons[1]} alt="transmission" className="w-4 h-4 mx-auto mb-1" />
          <div className="text-[14px] font-bold">{car.transmission}</div>
        </div>
        <div className="text-center text-[10px]">
          <img src={icons[2]} alt="seats" className="w-4 h-4 mx-auto mb-1" />
          <div className="text-[14px] font-bold">{car.seats} Seats</div>
        </div>
        <div className="text-center text-[10px]">
          <img src={icons[3]} alt="fuel" className="w-4 h-4 mx-auto mb-1" />
          <div className="text-[14px] font-bold">{car.fuelType}</div>
        </div>
      </div>
      <div className="flex justify-between gap-2 px-3 pt-3 pb-1">
        <Button 
          title="Edit" 
          width="100%" 
          className="text-[14px] px-0 bg-blue-600 hover:bg-blue-700 text-white" 
          onClick={() => onEdit(car)} 
        />
        <Button 
          title="Delete" 
          width="100%" 
          className="text-[14px] px-0 bg-red-600 hover:bg-red-700 text-white" 
          onClick={() => onDelete(car)} 
        />
      </div>
    </BaseCard>
  );
};

const Pagination = ({ totalPages, currentPage, setPage }) => {
  return (
    <div className="flex items-center justify-center gap-2 pt-12">
      <Button
        title="Previous"
        width="100px"
        height="40px"
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
      />
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`w-[30px] h-[30px] rounded-[5px] font-bold ${
            currentPage === i + 1 ? "bg-[#5937e0] text-white" : "bg-gray-200"
          }`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <Button
        title="Next"
        width="80px"
        height="40px"
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
      />
    </div>
  );
};

const AllCarsList = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carsPerPage = 4;

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('http://localhost:5000/api/cars', {
        timeout: 5000 // 5 second timeout
      });
      
      if (response.data.success) {
        setCars(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch cars');
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      if (error.code === 'ECONNREFUSED' || error.code === 'ECONNABORTED') {
        setError('Cannot connect to server. Please check if the server is running.');
      } else {
        setError(
          error.response?.data?.message || 
          error.message || 
          'An unexpected error occurred'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleEdit = async (car) => {
    try {
      // First fetch the car details
      const response = await axios.get(`http://localhost:5000/api/cars/${car._id}`);
      
      if (response.data.success) {
        // Store car data in localStorage for the form
        localStorage.setItem('editCarData', JSON.stringify(response.data.data));
        // Navigate to edit page
        navigate(`/agent/addcar/${car._id}`);
      } else {
        throw new Error(response.data.message || 'Failed to fetch car details');
      }
    } catch (error) {
      console.error('Edit error:', error);
      alert(error.response?.data?.message || 'Could not open edit page');
    }
  };

  const handleDelete = async (car) => {
    if (!window.confirm('Are you sure you want to delete this car?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.delete(`http://localhost:5000/api/cars/${car._id}`);
      
      if (response.data.success) {
        alert('Car deleted successfully!');
        await fetchCars(); // Refresh the list
      } else {
        throw new Error(response.data.message || 'Failed to delete car');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert(error.response?.data?.message || 'Failed to delete car');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error}</p>
        <button 
          onClick={fetchCars}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  const totalPages = Math.ceil(cars.length / carsPerPage);
  const currentCars = cars.slice(
    (currentPage - 1) * carsPerPage,
    currentPage * carsPerPage
  );

  return (
    <div className="p-8 bg-white">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">Car Management</h1>
        <Button 
          title="Add New Car" 
          bgColor="bg-blue-600" 
          textColor="text-white"
          width="120px"
          onClick={() => navigate('/agent/addcar')}
        />
      </div>
      
      <div className="bg-white p-4 rounded-lg flex flex-wrap justify-center gap-16 mb-8">
        <BaseCard
          width="w-full md:w-auto"
          height="h-auto"
          padding="px-16 py-8"
          bgColor="bg-gray"
          className="flex flex-col items-center justify-center border"
        >
          <div className="bg-gray p-2 rounded-md border mb-2">
            <FaClock className="text-black" />
          </div>
          <p className="text-center font-medium">Total Cars</p>
          <p className="text-center text-xl font-bold">{cars.length}</p>
        </BaseCard>
      </div>

      {currentCars.length > 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
            {currentCars.map((car) => (
              <Card 
                key={car._id} 
                car={car} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setPage={setCurrentPage}
            />
          )}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <p className="text-xl mb-4">No cars available</p>
          <Button 
            title="Add Your First Car" 
            bgColor="bg-blue-600" 
            textColor="text-white"
            width="160px"
            onClick={() => navigate('/agent/addcar')}
          />
        </div>
      )}
    </div>
  );
};

export default AllCarsList;
