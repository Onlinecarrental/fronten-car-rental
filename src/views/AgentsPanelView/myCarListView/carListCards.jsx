import React from "react";
import BaseCard from "../../../components/card";
import Button from "../../../components/button";
import { FaClock } from "react-icons/fa";

export default function CarListCards() {
  return (
    <div className="p-8 bg-white">
      {/* Add Car button centered at the top */}
      <div className="flex justify-center mb-8">
        <Button 
          title="Add Car" 
          bgColor="bg-black" 
          textColor="text-white"
          width="120px"
          to="/addcar" // This would be the path to your add car form
        />
      </div>
      
      {/* Car cards row */}
      <div className="bg-white p-4 rounded-lg flex flex-wrap justify-center gap-16">
      {/* First Card */}
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
        <p className="text-center font-medium">Car List</p>
        <p className="text-center text-xl font-bold">0</p>
      </BaseCard>

      {/* Second Card */}
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
        <p className="text-center font-medium">Car List</p>
        <p className="text-center text-xl font-bold">0</p>
      </BaseCard>

      {/* Third Card */}
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
        <p className="text-center font-medium">Car List</p>
        <p className="text-center text-xl font-bold">0</p>
      </BaseCard>
    </div>



    </div>
  );
}