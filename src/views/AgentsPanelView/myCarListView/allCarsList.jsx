import React, { useState } from "react";
import Button from "./../../../components/button";
import BaseCard from "./../../../components/card";

const icons = [
  "./../../src/assets/mileage.svg",         // Mileage
  "./../../src/assets/transmission.svg",     // Transmission
  "./../../src/assets/seating.svg",    // Seating
  "./../../src/assets/feultype.svg",      // Fuel type
];
const cars = [
  {
    title: "Porsche Cayenne GTS 2022",
    price: "78.90",
    specs: ["4,000", "Auto", "4 Person", "Electric"],
    image: "./../../src/assets/CARD1.jpg",
  },
  {
    title: "Tesla Model X 2023",
    price: "89.99",
    specs: ["350", "Auto", "5 Person", "Electric"],
    image: "./../../src/assets/AUcar.svg",
  },
  {
    title: "BMW X5 2021",
    price: "72.00",
    specs: ["3,000", "Auto", "5 Person", "Hybrid"],
    image: "./../../src/assets/AUcar.svg",
  },
  {
    title: "Audi Q7 2022",
    price: "85.50",
    specs: ["3,500", "Auto", "7 Person", "Petrol"],
    image: "./../../src/assets/CARD1.jpg",
  },
  {
    title: "Mercedes GLC 2022",
    price: "80.25",
    specs: ["2,500", "Auto", "5 Person", "Diesel"],
    image: "./../../src/assets/AUcar.svg",
  },
  {
    title: "Ford Explorer 2022",
    price: "65.00",
    specs: ["2,800", "Auto", "7 Person", "Petrol"],
    image: "./../../src/assets/AUcar.svg",
  },
  {
    title: "Range Rover Sport 2023",
    price: "95.75",
    specs: ["4,400", "Auto", "5 Person", "Diesel"],
    image: "./../../src/assets/AUcar.svg",
  },
  {
    title: "Chevrolet Tahoe 2021",
    price: "70.50",
    specs: ["3,800", "Auto", "7 Person", "Petrol"],
    image: "./../../src/assets/AUcar.svg",
  },
];

const Card = ({ car, onEdit, onDelete }) => (
  <BaseCard bgColor="bg-gray" className="w-auto h-auto p-2" >
    <img
      src={car.image}
      alt={car.title}
      className="rounded-[10px] w-full h-[180px] object-cover"
    />
    <div className="px-3 pt-2">
      <h2 className="font-semibold text-[14px]">{car.title}</h2>
      <p className="text-[22px] font-bold pt-1">
        {car.price}
        <span className="text-[14px] font-normal">/day</span>
      </p>
    </div>
    <div className="flex justify-between items-center bg-white p-2 mt-2 rounded-[10px]">
     
    {car.specs.map((spec, idx) => (
  <div key={idx} className="text-center text-[10px]">
    <img
      src={icons[idx]}
      alt={`spec-icon-${idx}`}
      className="w-4 h-4 mx-auto mb-1"
    />
    <div className="text-[14px] font-bold">{spec}</div>
  </div>
))}

    </div>
    <div className="flex justify-between gap-2 px-3 pt-3 pb-1">
      <Button title="Edit" width="100%" className="text-[14px] px-0" onClick={() => onEdit(car)} />
      <Button title="Delete" width="100%" className="text-[14px] px-0" onClick={() => onDelete(car)} />
    </div>
  </BaseCard>
);

const Pagination = ({ totalPages, currentPage, setPage }) => (
  <div className="flex items-center justify-center gap-2 pt-12">
    <Button
      title="Previous"
      width="100px"
      height="40px"
      onClick={() => setPage((p) => Math.max(p - 1, 1))}
    />
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        className={`w-[30px] h-[30px] rounded-[5px] font-bold ${
          currentPage === i + 1 ? "bg-[#5937e0] text-white" : "bg-gray-200"
        }`}
        onClick={() => setPage(i + 1)}
      >
        {i + 1}
      </button>
    ))}
    <Button
      title="Next"
      width="80px"
      height="40px"
      onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
    />
  </div>
);

const AllCarsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 4;
  const totalPages = Math.ceil(cars.length / carsPerPage);
  const currentCars = cars.slice(
    (currentPage - 1) * carsPerPage,
    currentPage * carsPerPage
  );

  const handleEdit = (car) => {
    console.log("Edit", car);
    // Future logic for editing
  };

  const handleDelete = (car) => {
    console.log("Delete", car);
    // Future logic for deleting
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
        {currentCars.map((car, idx) => (
          <Card key={idx} car={car} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setPage={setCurrentPage}
      />
    </div>
  );
};

export default AllCarsList;
