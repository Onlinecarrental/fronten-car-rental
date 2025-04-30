import React from "react";
import Button from "./button"; // Importing your existing Button component
import { FaEnvelope, FaCarAlt, FaCalendarAlt, FaListAlt, FaPhoneAlt, FaSignOutAlt } from "react-icons/fa"; // You may need to install this package

function Sidebar() {
  return (
    <div className="flex flex-col h-screen bg-black text-white w-64 p-4">
      {/* Logo and Title */}
      <div className="flex items-center mb-8">
        <div className="bg-white rounded-full p-2 mr-2">
          <img src="../src/assets/LOGO.png" alt="AA Car Rental Logo" className="w-12 h-12 " />
        </div>
        <span className="text-lg font-bold">AA Car Rental</span>
      </div>

      {/* Navigation Menu */}
      <div className="flex flex-col flex-grow space-y-2">

      <Button 
          title="Messages" 
          bgColor="bg-white" 
          textColor="text-black" 
          width="100%" 
          rounded="rounded-md" 
          hoverBgColor="hover:bg-gray"
          className="justify-center"
           
        />
        
        <Button 
          title="Add a Car" 
          to="/addcar"
          bgColor="bg-white" 
          textColor="text-black" 
          width="100%" 
          rounded="rounded-md" 
          hoverBgColor="hover:bg-gray"
          className="justify-center"
        /> 
        
        <Button 
          title="Bookings" 
          to="/booking-management"
          bgColor="bg-white" 
          textColor="text-black" 
          width="100%" 
          rounded="rounded-md" 
          hoverBgColor="hover:bg-gray"
          className="justify-center"
        />
        
        <Button 
          title="Car Lists" 
          to="/carlist"
          bgColor="bg-white" 
          textColor="text-black" 
          width="100%" 
          rounded="rounded-md" 
          hoverBgColor="hover:bg-gray"
          className="justify-center"
        />
        
        <Button 
          title="Contact us" 
          bgColor="bg-white" 
          textColor="text-black" 
          width="100%" 
          rounded="rounded-md" 
          hoverBgColor="hover:bg-gray"
          className="justify-center"
        />
      </div>

      {/* Logout Button at Bottom */}
      <div className="mt-auto">
        <Button 
          title="Log out" 
          bgColor="bg-indigo-600" 
          textColor="text-white" 
          width="100%" 
          rounded="rounded-md" 
          hoverBgColor="hover:bg-indigo-700"
          className="justify-center"
          iconRight={<FaSignOutAlt />}
        />
      </div>
    </div>
  );
}

export default Sidebar;