import React from 'react';
import Button from '../../components/button';
import carimage from '../../assets/car 2 1.svg';

export default function HeroSectionHome() {
  return (
    <div className="relative bg-gray w-full  h-[100%] flex  ">
      {/* Hero Content Container */}
      <div className="max-w-[1280px] mx-auto px-6 w-full pt-8 md:pt-36 flex flex-col md:flex-row  items-start justify-between">
        
        {/* Left Text Content */}
        <div className="w-full  md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Enjoy your life with our comfortable cars.
          </h1>
          <p className="text-lg md:text-xl text-black mb-8">
            Carent is ready to serve the best experience in car rental.
          </p>
          <Button height="43px" width="auto" boxShadow={false} title="Book Now" to="/login" />
        </div>

        {/* Car Image */}
        <div className="w-full md:w-1/2  mt-8 flex justify-end">
          <img 
            src={carimage}
            alt="Blue Sports Car" 
            className="object-contain max-w-full h-auto" 
          />
        </div>
      </div>
    </div>

    /*new code */
    
  );
}
