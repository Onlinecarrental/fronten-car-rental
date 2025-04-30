import React from "react";
import BaseCard from "../../../components/card";
import Button from "../../../components/button";

const CarListingDashboard = () => {
  // Sample car data with images
  const cars = [
    { id: 1, name: "Suzuki Mehran", image: "../src/assets/suzuki.svg" },
    { id: 2, name: "Honda City", image: "../src/assets/honda.svg" },
    { id: 3, name: "KIA Sportage", image: "../src/assets/kia.svg" }
  ];

  return (
    <BaseCard
      width="w-full"
      height="full"
      padding="p-6"
      className="mx-auto border m-14"
    >
      <h1 className="text-center text-3xl font-bold mb-6">Car Listing</h1>
      
      <div className="flex flex-col gap-4">
        {cars.map((car) => (
          <div 
            key={car.id} 
            className="flex items-center justify-between bg-gray rounded-lg p-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-md overflow-hidden bg-white">
                <img 
                  src={car.image} 
                  alt={`${car.name}`}
                  className="w-full h-full object-cover"
                  
                />
              </div>
              <span className="font-medium text-lg">{car.name}</span>
            </div>
            
            <Button 
              title="Active"
              hoverBgColor="hover:bg-indigo-700"
              width="120px"
              height="40px"
              className="text-base"
            />
          </div>
        ))}
      </div>
    </BaseCard>
  );
};

export default CarListingDashboard;