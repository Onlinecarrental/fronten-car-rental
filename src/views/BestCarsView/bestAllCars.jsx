import React, { useState } from 'react';
import BaseCard from '../../components/card';
import interImg from '../../assets/CARD1.jpg';
import Button from '../../components/button';
import { Gauge, Cog, Users, Battery, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AllBestCars() {
  const [cars] = useState([
    {
      id: 1,
      name: "Porsche Cayenne GTS 2022",
      price: 78.90,
      image: interImg,
      specs: {
        engine: "4,000",
        transmission: "Auto",
        seats: "4 Person",
        type: "Electric"
      }
    },
    {
      id: 2,
      name: "Porsche Cayenne GTS 2022",
      price: 78.90,
      image: interImg,
      specs: {
        engine: "4,000",
        transmission: "Auto",
        seats: "4 Person",
        type: "Electric"
      }
    },
    {
      id: 3,
      name: "Porsche Cayenne GTS 2022",
      price: 78.90,
      image: interImg,
      specs: {
        engine: "4,000",
        transmission: "Auto",
        seats: "4 Person",
        type: "Electric"
      }
    },
    {
      id: 4,
      name: "Porsche Cayenne GTS 2022",
      price: 78.90,
      image: interImg,
      specs: {
        engine: "4,000",
        transmission: "Auto",
        seats: "4 Person",
        type: "Electric"
      }
    },
    {
      id: 5,
      name: "Porsche Cayenne GTS 2022",
      price: 78.90,
      image: interImg,
      specs: {
        engine: "4,000",
        transmission: "Auto",
        seats: "4 Person",
        type: "Electric"
      }
    },
    {
        id: 6,
        name: "Porsche Cayenne GTS 2022",
        price: 78.90,
        image: interImg,
        specs: {
          engine: "4,000",
          transmission: "Auto",
          seats: "4 Person",
          type: "Electric"
        }
      },
      {
        id: 7,
        name: "Porsche Cayenne GTS 2022",
        price: 78.90,
        image: interImg,
        specs: {
          engine: "4,000",
          transmission: "Auto",
          seats: "4 Person",
          type: "Electric"
        }
      },
      {
        id: 8,
        name: "Porsche Cayenne GTS 2022",
        price: 78.90,
        image: interImg,
        specs: {
          engine: "4,000",
          transmission: "Auto",
          seats: "4 Person",
          type: "Electric"
        }
      },
      {
        id: 9,
        name: "Porsche Cayenne GTS 2022",
        price: 78.90,
        image: interImg,
        specs: {
          engine: "4,000",
          transmission: "Auto",
          seats: "4 Person",
          type: "Electric"
        }
      },
      {
        id: 10,
        name: "Porsche Cayenne GTS 2022",
        price: 78.90,
        image: interImg,
        specs: {
          engine: "4,000",
          transmission: "Auto",
          seats: "4 Person",
          type: "Electric"
        }
      },
      {
        id: 11,
        name: "Porsche Cayenne GTS 2022",
        price: 78.90,
        image: interImg,
        specs: {
          engine: "4,000",
          transmission: "Auto",
          seats: "4 Person",
          type: "Electric"
        }
      },
      {
        id: 12,
        name: "Porsche Cayenne GTS 2022",
        price: 78.90,
        image: interImg,
        specs: {
          engine: "4,000",
          transmission: "Auto",
          seats: "4 Person",
          type: "Electric"
        }
      },
      {
        id: 13,
        name: "Porsche Cayenne GTS 2022",
        price: 78.90,
        image: interImg,
        specs: {
          engine: "4,000",
          transmission: "Auto",
          seats: "4 Person",
          type: "Electric"
        }
      },
      {
        id: 14,
        name: "Porsche Cayenne GTS 2022",
        price: 78.90,
        image: interImg,
        specs: {
          engine: "4,000",
          transmission: "Auto",
          seats: "4 Person",
          type: "Electric"
        }
      }
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 9; // Updated to show 9 cards per page

  // Calculate pagination values
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / carsPerPage);

  // Handle page changes
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bg-white w-full">
      <div className="flex flex-col md:flex-row gap-4 mt-20 flex-wrap justify-center">
        {currentCars.map((car) => (
          <BaseCard width='w-[380px]' padding='p-[8px]' height='h-full' key={car.id}>
            <div className="relative h-48 overflow-hidden">
              <img src={car.image} alt={car.name} className="w-full h-full rounded-[15px] object-cover" />
            </div>
            <div className="p-4">
              <div className='py-3'>
                <h3 className="text-[20px] font-[600] text-black font-jakarta">{car.name}</h3>
                <div className="mt-1 flex mb-3 items-end">
                  <span className="text-[28px] font-bold">${car.price.toFixed(2)}</span>
                  <span className="text-[18px] ml-1">/day</span>
                </div>
              </div>
              <BaseCard bgColor='bg-gray' className='flex flex-row px-6 justify-between' boxShadow={false} width='w-300px' height='h-auto'>
                <div className="flex flex-col items-center justify-center">
                  <Gauge size={18} className="text-gray-600" />
                  <span className="text-xs mt-1">{car.specs.engine}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Cog size={18} className="text-gray-600" />
                  <span className="text-xs mt-1">{car.specs.transmission}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Users size={18} className="text-gray-600" />
                  <span className="text-xs mt-1">{car.specs.seats}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Battery size={18} className="text-gray-600" />
                  <span className="text-xs mt-1">{car.specs.type}</span>
                </div>
              </BaseCard>
              <div className='mt-2 ml-[5px]'>
                <Button boxShadow={false} title="Rent Now" width='320px' height='40px' />
              </div>
            </div>
          </BaseCard>
        ))}
      </div>
{/* Pagination Component */}
<div className="flex justify-center mt-8 mb-8">
  <div className="flex gap-4">
    {/* Previous Button */}
    <button
      onClick={() => goToPage(currentPage - 1)}
      disabled={currentPage === 1}
      className={`bg-Blue text-white px-4 py-2 rounded-[10px] ${
        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
      }`}
    >
      <div className="flex justify-between gap-2 items-center">
        <span>Previous</span>
      </div>
    </button>

    {/* Page Numbers */}
    {pageNumbers.map(number => (
      <button
        key={number}
        onClick={() => goToPage(number)}
        className={`px-4 py-2 rounded ${
          currentPage === number
            ? 'bg-Blue text-white'
            : 'bg-gray text-white hover:bg-Blue'
        }`}
      >
        {number}
      </button>
    ))}

    {/* Next Button */}
    <button
      onClick={() => goToPage(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`bg-Blue text-white px-4 py-2 rounded-[10px] ${
        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
      }`}
    >
      <div className="flex items-center gap-2">
        <span>Next</span>
        
      </div>
    </button>
  </div>
</div>
</div>

  );
}