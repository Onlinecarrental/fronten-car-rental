import React from "react";
import { FaBell } from "react-icons/fa";

function NavbarAgent() {
  return (
    <div className="flex justify-between items-center w-full bg-gray px-4 py-4">
      {/* Left side - Profile image and username */}
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full mr-3 overflow-hidden">
          {/* Using an actual image element for the profile picture */}
          <img 
            src="../src/assets/LOGO.png" 
            alt="Car Agent Profile" 
            className="w-full h-full object-cover bg-gray-200"
          />
        </div>
        <span className="text-black font-extrabold">Car Agent</span>
      </div>
      
      {/* Right side - Notification bell */}
      <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
        <FaBell className="text-gray-700" />
      </div>
    </div>
  );
}

export default NavbarAgent;