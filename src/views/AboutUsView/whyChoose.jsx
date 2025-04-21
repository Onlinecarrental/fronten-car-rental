import React from 'react';
import { Instagram } from 'lucide-react';
import HeadingTitle from '../../components/heading';
import BaseCard from '../../components/card';

export default function WhyChoose() {
  const features = [
    {
      title: "Seamless Experience",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum."
    },
    {
      title: "Seamless Experience",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum."
    },
    {
      title: "Seamless Experience",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum."
    },
    {
      title: "Seamless Experience",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum."
    },
    {
      title: "Seamless Experience",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum."
    },
    {
      title: "Seamless Experience",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum."
    }
  ];

  return (
    <div className="w-full bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading Section */}
       <HeadingTitle title="WHY CHOOSE US?" paragraph='To make renting easy and hassle-free, we provide a variety of services and advantages. We have you covered with a variety of vehicles and flexible rental terms.

Seamless Experience
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.

'/> 
        {/* Features Grid */}
        <div className="grid grid-cols-1 mt-12 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <BaseCard width='w-[300px]' className='flex flex-col mx-auto items-center' height='h-auto' key={index} >
              {/* Icon */}
              <BaseCard height='h-auto' width='w-auto' bgColor='bg-gray' boxShadow={false}>
                <Instagram size={24} className="text-purple-600" />
              </BaseCard>
              
              {/* Title */}
              <h3 className="font-bold text-center mb-2">{feature.title}</h3>
              
              {/* Description */}
              <p className="text-sm text-gray-600 text-center">
                {feature.description}
              </p>
            </BaseCard>
          ))}
        </div>
      </div>
    </div>
  );
}