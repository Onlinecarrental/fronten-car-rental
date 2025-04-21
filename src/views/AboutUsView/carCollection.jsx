import React from 'react';
import Button from '../../components/button';
import HeadingTitle from '../../components/heading'; 

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



export default function CarCollection() {
   

  return (
   
     <div className="mt-20 py-9 bg-gray">
           <div className="max-w-[1280px] mx-auto p-6">
             <HeadingTitle 
               title="Our Impressive Collection of Car " 
               paragraph="Find the perfect car for any journey—from luxurious rides to rugged off-roaders." 
             />
           </div>
     
           <div className="flex flex-wrap justify-center gap-4 p-6">
             {categories.map((category) => (
               <Button 
                 textColor='black'
                 key={category.title}
                 title={category.title} 
                 bgColor="bg-white" 
                 hoverBgColor="hover:bg-[#000000]"
                 hoverTextColor="hover:text-white"
                 width="180px"
                 onClick={() => handleCardClick(category.path)}
               />
             ))}
           </div>
         

    <div className="flex flex-col md:flex-row items-start mt-10 p-6 bg-gray max-w-7xl mx-auto">
      <div className="w-full md:w-1/2 pl-8 space-y-6 pr-4">
        <h2 className="text-4xl font-bold">We Are More Than</h2>
        
        <p className="text-lg">
          Lorem pretium fermentum quam, sit amet cursus ante sollicitudin velen morbi consesua the miss sustion consation porttitor orci sit amet iaculis nisan.
        </p>
        
        <p className="text-lg">
          Lorem pretium fermentum quam sit amet cursus ante sollicitudin velen fermen morbinetion consesua the risus consequation the porttito
        </p>
        
        <p className="text-lg">
          Lorem pretium fermentum quam sit amet cursus ante sollicitudin velen fermen morbinetion consesua the risus consequation the porttito
        </p>
        
        <div className="space-y-3 mt-6">
          <div className="flex items-center">
            <div className="mr-2 rounded-full p-1">
              <img 
                src="../src/assets/bluetick.svg"
                alt="Checkmark" 
                className="h-6 w-6"
              />
            </div>
            <span className="text-base font-medium">24/7 Roadside Assistance</span>
          </div>
          
          <div className="flex items-center">
            <div className="mr-2 rounded-full p-1">
              <img 
                src="../src/assets/bluetick.svg"
                alt="Checkmark" 
                className="h-6 w-6"
              />
            </div>
            <span className="text-base font-medium">Free Cancellation & Return</span>
          </div>
          
          <div className="flex items-center">
            <div className="mr-2  rounded-full p-1">
              <img 
                src="../src/assets/bluetick.svg" 
                alt="Checkmark" 
                className="h-6 w-6"
              />
            </div>
            <span className="text-base font-medium">Rent Now Pay When You Arrive</span>
          </div>
        </div>
      </div>
      
      <div className="w-full  md:w-1/2 mt-6 md:mt-0">
        <div className="rounded-lg  overflow-hidden">
          <img 
            src="../src/assets/AUcar.svg"
            alt="Luxury car at night" 
            className="w-full h-auto mt-10 mb-10 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
    </div>
  );
}
