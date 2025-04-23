import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import interImg from '../../assets/CARD1.jpg';
import BaseCard from '../../components/card';
export default function CarDetailCard() {
  const car = {
    name: "Car Detail",
    transmission: "Auto",
    passengers: 4,
    model: "2017",
    offRoad: "Light",
    price: "$39.99/Day",
    description:
      "General Information. Lorem ipsum dolor sit amet, consectetur adipiscing. Paradise is simply a placeholder text of the printing industry. Lor simply dummy text of printing. Lorem ipsum dolor sit amet.",
  };

  const images = [
    interImg,interImg,interImg,interImg,interImg
  ];

  const details = [
    {
      label: "Transmission",
      value: car.transmission,
      icon:interImg,
    },
    {
      label: "Passengers",
      value: car.passengers,
      icon: interImg,
    },
    {
      label: "Model",
      value: car.model,
      icon: interImg,
    },
    {
      label: "Off road",
      value: car.offRoad,
      icon: interImg,
    },
  ];

  return (
    <div className="max-w-[1250px] mx-auto my-8 bg-white ">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2 p-4">
          {/* Static Main Image */}
          <div className="mb-4">
            <img
              src={images[0]}
              alt="Main Car"
              className="w-full h-64 object-cover rounded-md"
            />
          </div>

          {/* Thumbnail Swiper with Pagination */}
          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="rounded-md"
          >
            {[...images.slice(1), images[1]].map((src, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-[300px] h-[200px] object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Car Details */}
        <div className="md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4">{car.name}</h2>

          <div className="mb-6 space-y-4">
            {details.map((item, idx) => (
              <div key={idx} className="flex items-center">
                <BaseCard width='w-[45px]' height='h-[40px]' bgColor='bg-gray' className='rounded-[5px] flex items-center  border border-black' boxShadow={false}>
                  <img src={item.icon} alt={item.label} className="w-[35px] h-[30px]" />
                </BaseCard>
                <span className="font-medium ml-2">{item.label}:</span>
                <span className="ml-2">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="text-3xl font-bold text-black mb-4">
            {car.price}
          </div>

          <div>
            <h3 className="font-bold mb-2">General Information</h3>
            <p className="text-gray-600 text-sm">{car.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
