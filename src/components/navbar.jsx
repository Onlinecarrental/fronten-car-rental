import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Button from "./button";
import logo from "../assets/logo.svg"
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white sticky top-0 w-full z-10">
      
      <div className=" flex items-center justify-between max-w-screen-xl mx-auto p-4">
        
        <Link to="/home" className="text-[20px] font-[400] flex gap-2 items-center font-poppins text-white">
 <img src={logo} alt="car rental logo" className="w-[50px] h-[50px]" />
          <span>AA Car Rental</span>
        </Link>

        {/* Center Menu (visible on lg and up) */}
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex space-x-5 text-[16px] font-[400] font-jakarta">
            <li><Link to="/home/best-cars" className="hover:text-[#efff11]">BEST CARS</Link></li>
            <li><Link to="/home/customerreviews" className="hover:text-[#efff11]">Customer Review</Link></li>
           
            <li><Link to="/home/blogs" className="hover:text-[#efff11]">BLOGS</Link></li>
            <li><Link to="/home/about-us" className="hover:text-[#efff11]">About Us</Link></li>
         <li><Link to="/home/contactus" className="hover:text-[#efff11]">Contact Us</Link></li>
         <li><Link to="/home/bookingform" className="hover:text-[#efff11]">Booking</Link></li>
           
          </ul>
        </div>

        {/* Log Out button (right on desktop) */}
        <div className="hidden lg:block">
          <Button height="43px" width="125px" title="Log Out" to="/login" />
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white lg:hidden focus:outline-none"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:hidden bg-black p-4 space-y-4`}
      >
        <ul className="flex flex-col space-y-4 text-[16px] font-[400] font-jakarta">
          <li><Link to="/home" className="hover:text-[#efff11]">HOME</Link></li>
          <li><Link to="/home/best-cars" className="hover:text-[#efff11]">BEST CARS</Link></li>
          <li><Link to="/home/blogs" className="hover:text-[#efff11]">BLOGS</Link></li>
          <li><Link to="/home/about-us" className="hover:text-[#efff11]">About Us</Link></li>
          <li><Link to="/home/contactus" className="hover:text-[#efff11]">Contact Us</Link></li>
          
          <li>
            <Button height="43px" width="125px" title="Log Out" to="/login" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;