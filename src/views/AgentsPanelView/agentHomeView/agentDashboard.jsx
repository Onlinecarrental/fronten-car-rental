
import React, { useState, useEffect } from "react";
import BaseCard from "../../../components/card";
import { FaClock } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
function AgentDashboardView() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Function to format date like "24 Oct, 2021"
    const formatDate = () => {
      const date = new Date();
      const options = { day: "2-digit", month: "short", year: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);
      setCurrentDate(formattedDate.replace(",", ""));
    };

    // Function to format time like "07:30pm"
    const formatTime = () => {
      const date = new Date();
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const formattedTime = 
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}${ampm}`;
      
      setCurrentTime(formattedTime);
    };

    // Initial call
    formatDate();
    formatTime();

    // Update time every minute
    const intervalId = setInterval(() => {
      formatDate();
      formatTime();
    }, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className=" flex flex-col w-full">
      {/* Header with Welcome text */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">WellCome Agent</h1>
      </div>

      {/* Date and Time Section */}
      <div className="  flex items-center mb-4 gap-4">
        <div className="flex items-center">
          <div className="bg-gray p-2 rounded">
            <FaCalendar className="text-black" />
          </div>
          <span className="ml-2 text-black">{currentDate}</span>
        </div>
        
        <div className="flex items-center">
          <div className="bg-gray p-2 rounded">
            <FaClock className="text-black" />
          </div>
          <span className="ml-2 text-black">{currentTime}</span>
        </div>
      </div>

      {/* Cards Container with Pink Background */}
     
    <div className="bg-pink-100 p-4 rounded-lg flex flex-wrap justify-center gap-4">
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

export default AgentDashboardView;