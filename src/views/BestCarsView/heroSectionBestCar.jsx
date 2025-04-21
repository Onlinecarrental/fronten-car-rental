import React, { useState } from 'react';
import heroImage from "../../assets/Bannerimage.jpg";
import BaseCard from "../../components/card"
export default function HerosectionCar() {
  const [priceOpen, setPriceOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("Low to High");

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black/20">
        <div
          className="w-full h-full bg-cover opacity-50 bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />
      </div>

      {/* Header Content */}
      <div className="relative z-[1px] flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl font-bold text-black mb-2">Car Listing</h1>
        <p className="text-lg text-black mb-8">
          This is sample of page tagline and you can set it up using page option
        </p>

        {/* Search Bar */}
        <BaseCard width='max-w-[1120px]' bgColor='bg-gray' height='h-auto' className='flex  gap-16'>
        <div className="w-full max-w-4xl bg-gray-200/80 p-4 rounded-md">
          <div className="flex flex-wrap gap-2">
            {/* Car Models Dropdown */}
            <div className="flex-1 min-w-[200px] relative z-10">
              <div className="text-sm text-gray-600 mb-1">Select Car Model</div>
              <select className="w-full p-2 rounded bg-white">
                <option>Toyota Corolla</option>
                <option>Honda Civic</option>
                <option>Ford Mustang</option>
                <option>BMW 3 Series</option>
                <option>Hyundai Elantra</option>
              </select>
            </div>

            {/* Locations Dropdown */}
            <div className="flex-1 min-w-[200px] relative z-10">
              <div className="text-sm text-gray-600 mb-1">Select Location</div>
              <select className="w-full p-2 rounded bg-white">
                <option>New York</option>
                <option>Los Angeles</option>
                <option>Chicago</option>
                <option>Houston</option>
                <option>Miami</option>
              </select>
            </div>

            {/* Custom Price Filter Dropdown */}
           {/* Custom Price Filter Dropdown */}
       <div className="flex-1 min-w-[200px] relative z-10">
  <div className="text-sm text-gray-600 mb-1">Sort by Price</div>
  <div
    className="bg-white p-2 flex items-center justify-between rounded border cursor-pointer"
    onClick={() => setPriceOpen(!priceOpen)}
  >
    <span>{selectedPrice}</span>
    {/* This is the SVG you mentioned */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 transition-transform ${priceOpen ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
      />
    </svg>
  </div>
  {priceOpen && (
    <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-20">
      {["Low to High", "High to Low"].map((option) => (
        <div
          key={option}
          onClick={() => {
            setSelectedPrice(option);
            setPriceOpen(false);
          }}
          className="p-2 hover:bg-gray-100 cursor-pointer"
        >
          {option}
        </div>
      ))}
    </div>
  )}
</div>


            {/* Search Button */}
            <div className="min-w-[100px]">
              <div className="h-6" /> {/* Spacer to align with inputs */}
              <button className="w-full p-2 bg-purple-600 text-white rounded font-medium">
                Search
              </button>
            </div>
          </div>
        </div>
        </BaseCard>
 
      </div>
    </div>

  );
}
