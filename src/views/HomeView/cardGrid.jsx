// import { useState } from 'react';

// export default function CarCollection() {
//   const [activeFilter, setActiveFilter] = useState('All Cars');
  
//   const filters = ['All Cars', 'Luxury Car', 'Vintage Car', 'Family Car', 'Off-Road Car'];
  
//   const cars = [
//     { id: 1, name: 'Porsche Cayenne GTS 2022', price: '78.90', image: '/api/placeholder/400/240' },
//     { id: 2, name: 'Porsche Cayenne GTS 2022', price: '78.90', image: '/api/placeholder/400/240' },
//     { id: 3, name: 'Porsche Cayenne GTS 2022', price: '78.90', image: '/api/placeholder/400/240' },
//     { id: 4, name: 'Porsche Cayenne GTS 2022', price: '78.90', image: '/api/placeholder/400/240' },
//     { id: 5, name: 'Porsche Cayenne GTS 2022', price: '78.90', image: '/api/placeholder/400/240' },
//     { id: 6, name: 'Porsche Cayenne GTS 2022', price: '78.90', image: '/api/placeholder/400/240' },
//   ];

//   return (
//     <div className="bg-gray-200 p-8 max-w-6xl mx-auto">
//       <div className="text-center mb-8">
//         <h1 className="text-2xl font-bold mb-2">Our Impressive Collection of Cars</h1>
//         <p className="text-gray-600 text-sm mb-6">
//           Ranging from elegant modern to powerful superb cars, all carefully selected to provide our
//           <br />
//           customers with the ultimate driving experience.
//         </p>
        
//         {/* Filter buttons */}
//         <div className="flex flex-wrap justify-center gap-2 mb-6">
//           {filters.map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setActiveFilter(filter)}
//               className={`px-4 py-1 text-sm rounded-full ${
//                 activeFilter === filter
//                   ? 'bg-black text-white'
//                   : 'bg-white text-black border border-gray-300'
//               }`}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Car Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {cars.map((car) => (
//           <div key={car.id} className="bg-white rounded-lg overflow-hidden shadow">
//             <img src={car.image} alt={car.name} className="w-full h-40 object-cover" />
//             <div className="p-4">
//               <h3 className="font-medium text-sm">{car.name}</h3>
//               <div className="flex items-center mt-1">
//                 <span className="font-bold">{car.price}</span>
//                 <span className="text-gray-400 text-xs ml-1">k/mo</span>
//               </div>
              
//               {/* Car features */}
//               <div className="flex justify-between mt-3 mb-4">
//                 <div className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-md">
//                   <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
//                   <span className="text-xs">Auto</span>
//                 </div>
//                 <div className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-md">
//                   <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
//                   <span className="text-xs">4 Seats</span>
//                 </div>
//                 <div className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-md">
//                   <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
//                   <span className="text-xs">Petrol</span>
//                 </div>
//               </div>
              
//               {/* View details button */}
//               <button className="w-full py-2 text-sm text-white bg-purple-600 rounded-md hover:bg-purple-700 transition">
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {/* See all cars button */}
//       <div className="text-center mt-8">
//         <button className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
//           See All Cars
//         </button>
//       </div>
//     </div>
//   );
// }
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeadingTitle from '../../components/heading'; 
import Button from '../../components/button';



const categories = [
    { title: "Popular Car", path: "/popular-cars" },
    { title: "Luxury Car", path: "/luxury-cars" },
    { title: "Vintage Car", path: "/vintage-cars" },
    { title: "Family Car", path: "/family-cars" },
    { title: "Off-Road Car", path: "/offroad-cars" }
  ];
  
  
  const handleCardClick = (path) => {
    navigate(path);
  };
// Define the navigation paths for each button

const CarCollection = () => {
  return (

    <div className=" mt-20 bg-gray">

        <div className="max-w-[1280px] mx-auto p-6">
      <HeadingTitle title="htlle jfs" paragraph='hfno dns  dnfps  hsffnsp sdhns sdh hddpa pdns dapd'/>
    </div>

    
    <div className="flex flex-wrap justify-center gap-4 p-6">
    {categories.map((category) => (
      <Button 
      className="active:bg-black"
        key={category.title}
        title={category.title} 
        bgColor="#F3F4F6" 
        hoverBgColor="#000000"
        hoverTextColor="white"
        width="180px"
        onClick={() => handleCardClick(category.path)}
      />
    ))}
  </div>


</div>

  );
};

export default CarCollection;