import React from "react";
import BaseCard from "../../../components/card";
import Button from "../../../components/button";

const BookingListDashboard = () => {
  // Sample booking data with image URLs - you can replace this with your actual data
  const bookings = [
    { id: 1, name: "USman", image: "../src/assets/profile-modified.png" },
    { id: 2, name: "USman", image: "../src/assets/profile-modified.png" },
    { id: 3, name: "USman", image: "../src/assets/profile-modified.png" }
  ];

  return (
    <BaseCard
      width="w-full"
      height="full"
      padding="p-6"
      className="mx-auto border"
    >
      <h1 className="text-center text-3xl font-bold mb-6">Booking list</h1>
      
      <div className="flex flex-col gap-4">
        {bookings.map((booking) => (
          <div 
            key={booking.id} 
            className="flex items-center justify-between bg-gray rounded-lg p-4"
          >
            <div className="flex items-center gap-4">
              {/* Customer image with fallback */}
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src={booking.image} 
                  alt={`${booking.name}'s profile`}
                  className="w-full h-full object-cover bg-white"
                  
                />
              </div>
              <span className="font-medium text-lg">{booking.name}</span>
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

export default BookingListDashboard;