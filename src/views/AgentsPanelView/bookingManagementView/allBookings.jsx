import React, { useState } from "react";
import BaseCard from "../../../components/card";
import Button from "../../../components/button";

const mockData = [
  { id: 1, customer: "Usman", vehicle: "Suzuki", date: "Jun 10, 2024", status: "Completed" },
  { id: 2, customer: "Zain", vehicle: "Suzuki", date: "Jun 10, 2024", status: "Completed" },
  { id: 3, customer: "M.Ali", vehicle: "Suzuki", date: "Jun 10, 2024", status: "Completed" },
  { id: 4, customer: "Faraz", vehicle: "Suzuki", date: "Jun 10, 2024", status: "Completed" },
  { id: 5, customer: "Uzair", vehicle: "Suzuki", date: "Jun 10, 2024", status: "Completed" },
  { id: 6, customer: "Farwa", vehicle: "Suzuki", date: "Jun 10, 2024", status: "Completed" },
  { id: 7, customer: "John", vehicle: "Toyota", date: "Jun 11, 2024", status: "Pending" },
  { id: 8, customer: "Sara", vehicle: "Honda", date: "Jun 12, 2024", status: "Pending" },
  { id: 9, customer: "Mike", vehicle: "BMW", date: "Jun 13, 2024", status: "Pending" },
  { id: 10, customer: "Emma", vehicle: "Audi", date: "Jun 14, 2024", status: "Pending" },
  { id: 11, customer: "Alex", vehicle: "Ford", date: "Jun 15, 2024", status: "Pending" },
  { id: 12, customer: "Linda", vehicle: "Hyundai", date: "Jun 16, 2024", status: "Pending" },
  { id: 13, customer: "Chris", vehicle: "Nissan", date: "Jun 17, 2024", status: "Cancel" },
  { id: 14, customer: "James", vehicle: "Kia", date: "Jun 18, 2024", status: "Cancel" },
  { id: 15, customer: "Olivia", vehicle: "Mazda", date: "Jun 19, 2024", status: "Cancel" },
  { id: 16, customer: "David", vehicle: "Volkswagen", date: "Jun 20, 2024", status: "Cancel" },
  { id: 17, customer: "Sophia", vehicle: "Subaru", date: "Jun 21, 2024", status: "Cancel" },
  { id: 18, customer: "Robert", vehicle: "Mercedes", date: "Jun 22, 2024", status: "Cancel" },
];

export default function AllBookings() {
  const [activeFilter, setActiveFilter] = useState("Completed");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredData = mockData.filter(item => item.status === activeFilter);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const goToPage = (page) => setCurrentPage(page);
  const goToPreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const getActionButtonTitle = () => {
    switch (activeFilter) {
      case "Completed":
        return "Complete";
      case "Pending":
        return "Pending";
      case "Cancel":
        return "Cancel";
      default:
        return "Action";
    }
  };

  return (
    <div className="p-8 flex flex-col items-center space-y-4">
      {/* Filter buttons OUTSIDE the card */}
      <div className="flex justify-center pb-6 gap-4">
        {["Completed", "Pending", "Cancel"].map((status) => (
          <Button
            key={status}
            title={status}
            bgColor={activeFilter === status ? "bg-black" : "bg-white"}
            textColor={activeFilter === status ? "text-white" : "text-black"}
            shadow={activeFilter === status ? "shadow-lg" : "shadow-none"}
            onClick={() => handleFilterChange(status)}
            width="120px"
            height="40px"
            className="rounded-full border"
          />
        ))}
      </div>

      {/* Table inside card */}
      <BaseCard width="w-full" height="h-auto" padding="p-0" className="border">
        <div className="grid grid-cols-4 bg-gray p-4  rounded-t-lg  font-bold text-center">
          <div className="mr-14">Customer</div>
          <div className="mr-14">Vehicle</div>
          <div className="mr-14">Date</div>
          <div className="mr-14">Action</div>
        </div>

        <div className="p-4 space-y-4">
          {currentData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-4 bg-gray rounded-lg p-4 items-center"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full ml-10"></div>
                {item.customer}
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-md ml-12"></div>
                {item.vehicle}
              </div>
              <div>
                <span className="bg-white rounded-md ml-14 px-2 py-1 text-sm">
                  {item.date}
                </span>
              </div>
              <div>
                <Button
                  title={getActionButtonTitle()}
                  bgColor="bg-indigo-600"
                  height="36px"
                  width="120px"
                  className="text-sm ml-14"
                />
              </div>
            </div>
          ))}
        </div>
      </BaseCard>

      {/* Pagination OUTSIDE the card */}
      <div className="flex justify-center pt-6 gap-2">
        <button
          onClick={goToPreviousPage}
          className="bg-indigo-600 text-white rounded-lg shadow-lg h-9 w-24 text-sm font-medium"
        >
          Previous
        </button>

        {[...Array(Math.max(5, totalPages))].map((_, index) => {
          const pageNumber = index + 1;
          const isActive = currentPage === pageNumber;
          const isAvailable = pageNumber <= totalPages;

          return (
            <button
              key={index}
              onClick={() => isAvailable && goToPage(pageNumber)}
              className={`h-9 w-9 text-sm font-medium rounded-lg shadow-lg ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : isAvailable
                  ? "bg-gray-300 text-black"
                  : "bg-gray-200 text-gray-400"
              }`}
              disabled={!isAvailable}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={goToNextPage}
          className="bg-indigo-600 text-white rounded-lg shadow-lg h-9 w-24 text-sm font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );
}
