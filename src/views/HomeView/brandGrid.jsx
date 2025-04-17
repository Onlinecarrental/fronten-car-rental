import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseCard from '../../components/card';

// Import car brand logos
import toyotaLogo from '../../assets/toyota.svg';
import bmwLogo from '../../assets/bmw.svg';
import mercedesLogo from '../../assets/mercedes.svg';
import hondaLogo from '../../assets/honda.svg';
import suzukiLogo from '../../assets/suzuki.svg';
import nissanLogo from '../../assets/nissan.svg';
import kiaLogo from '../../assets/kia.svg';
import fordLogo from '../../assets/ford.svg';
import teslaLogo from '../../assets/tesla.svg';
import hyundaiLogo from '../../assets/hyundai.svg';
import audiLogo from '../../assets/audi.svg';
import peugeotLogo from '../../assets/peugeot.svg';

const CarBrandsGrid = () => {
  const navigate = useNavigate();
  
  const carBrands = [
    { id: 1, name: 'Toyota', logo: toyotaLogo, path: '/assets/toyota.svg' },
    { id: 2, name: 'BMW', logo: bmwLogo, path: '/cars/bmw' },
    { id: 3, name: 'Mercedes-Benz', logo: mercedesLogo, path: '/cars/mercedes' },
    { id: 4, name: 'Honda', logo: hondaLogo, path: '/cars/honda' },
    { id: 5, name: 'Suzuki', logo: suzukiLogo, path: '/cars/suzuki' },
    { id: 6, name: 'Nissan', logo: nissanLogo, path: '/cars/nissan' },
    { id: 7, name: 'KIA', logo: kiaLogo, path: '/cars/chevrolet' },
    { id: 8, name: 'Ford', logo: fordLogo, path: '/cars/ford ' },
    { id: 9, name: 'Tesla', logo: teslaLogo , path: '/cars/tesla' },
    { id: 10, name: 'Hyundai', logo: hyundaiLogo, path: '/cars/hyundai' },
    { id: 11, name: 'Audi', logo: audiLogo, path: '/cars/audi' },
    { id: 12, name: 'Peugeot', logo: peugeotLogo, path: '/cars/peugeot' }
  ];
  
  const handleCardClick = (path) => {
    navigate(path);
  };
  
  return (
    <div className= "w-full">
    <div className="grid grid-cols-2 max-w-[900px]  mx-auto md:grid-cols-3 lg:grid-cols-6 gap-4">
      {carBrands.map((brand) => (
        <BaseCard
        bgColor='gray'
          key={brand.id} 
          onClick={() => handleCardClick(brand.path)}
          className="rounded-lg cursor-pointer"
        >
          <div className="flex   flex-col items-center justify-center h-full p-4">
            <img 
              src={brand.logo} 
              
              className="w-12 h-12 mb-2"
            />
            <p className="text-center text-sm font-medium">{brand.name}</p>
          </div>
        </BaseCard>
      ))}
    </div>
    </div>
  );
};

export default CarBrandsGrid;