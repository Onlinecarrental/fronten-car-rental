import { Search, Calendar, MapPin, Heading } from "lucide-react";
import { useState } from "react";
import jeep from "../../assets/image 35.svg"
import BaseCard from "../../components/card";
import HeadingTitle from "../../components/heading";
const cardData = [
    {
      icon: <Search size={24} />,
      title: "Browse and select",
      description:
        "Choose from our wide range of premium cars, select the pickup and return dates and locations that suit you best.",
    },
    {
      icon: <Calendar size={24} />,
      title: "Book and confirm",
      description:
        "Book your desired car with just a few clicks and receive an instant confirmation via email or SMS.",
    },
    {
      icon: <MapPin size={24} />,
      title: "Enjoy your ride",
      description:
        "Pick up your car at the designated location and enjoy your premium driving experience with our top-quality service.",
    },
  ];
// Main component
export default function Howitwork() {
  return (
    <div className="max-w-[1250px]    mx-auto p-6">
      {/* Header Section */}
      <HeadingTitle title="how it work" paragraph="Renting a luxury car has never been easier. Our streamlined process makes it simple for you to book and confirm your vehicle of choice online."/>

      {/* Process and Image Container */}
      <div className="flex flex-col mt-12  w-[1120px] h-[550px] md:flex-row ">
        {/* Process Steps */}
        <div className="md:w-1/2 my-auto relative bottom-[24px] left-[140px]  z-[1]        flex flex-col h-[400px] items-center gap-4">
        {cardData.map((item, index) => (
  <BaseCard width="w-[550px]" height="h-[300px]" boxShadow={false} key={index} className="flex items-center my-a  border border-gray gap-4 h-auto">
    <BaseCard bgColor="bg-gray" boxShadow={false} width="w-[56px]" height="h-[76px]" className="mt-1 flex items-center">{item.icon}</BaseCard>
    <div>
      <h3 className="text-base font-semibold mb-1">{item.title}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
    </div>
  </BaseCard>
))}

    </div>

        {/* Car Image */}
        <BaseCard width="w-[620px]" height="h-[500px]" boxShadow={false} bgColor="bg-gray" className="flex justify-end   items-center">
      
      <div className="flex justify-end my-auto"> <img 
            src={jeep} 
            alt="Jeep Wrangler" 
            className="w-[400px] h-auto"
          /></div> 
        </BaseCard>
      </div>
    </div>
  );
}