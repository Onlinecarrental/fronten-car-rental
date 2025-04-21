import React from 'react';

export default function TrustProperties() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-white max-w-6xl mx-auto">
      <div className="w-full md:w-1/2 space-y-6 pr-4">
        <div>
          <h2 className="text-4xl font-bold mb-2">YOUR Trusted Patner is in a</h2>
          <h3 className="text-4xl font-bold">A Car Rental Company</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-gray p-3 mr-4 rounded">
              <img 
                src="../src/assets/Tp-1.svg" 
                alt="Document icon" 
              
              />
            </div>
            <p className="text-base">Lorem pretium fermentum quam, sit amet cursus ante sollicitudin velen morbi consesua the miss sustion consation porttitor orci sit amet iaculis nisan.</p>
          </div>
          
          <div className="flex items-start">
            <div className="bg-gray p-3 mr-4 rounded">
              <img 
                src="../src/assets/Tp-2.svg"
                alt="Car icon" 
                
              />
            </div>
            <p className="text-base">Lorem pretium fermentum quam sit amet cursus ante sollicitudin velen fermen morbinetion consesua the risus consequation the porttito</p>
          </div>
          
          <div className="flex items-start">
            <div className="bg-gray p-3 mr-4 rounded">
              <img 
                src="../src/assets/Tp-1.svg"
                alt="Car icon" 
                
              />
            </div>
            <p className="text-base">Lorem pretium fermentum quam sit amet cursus ante sollicitudin velen fermen morbinetion consesua the risus consequation the porttito</p>
          </div>
          
          <div className="flex items-start">
            <div className="bg-gray p-3 mr-4 rounded">
              <img 
                src="../src/assets/Tp-2.svg"
                alt="Car icon" 
               
              />
            </div>
            <p className="text-base">Lorem pretium fermentum quam sit amet cursus ante sollicitudin velen fermen morbinetion consesua the risus consequation the porttito</p>
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
  );
}