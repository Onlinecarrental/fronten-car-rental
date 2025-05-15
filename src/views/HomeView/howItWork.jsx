import React, { useState, useEffect } from "react";
import { Search, Calendar, MapPin, Car } from "lucide-react";
import axios from 'axios';
import jeep from "../../assets/image 35.svg";
import BaseCard from "../../components/card";
import HeadingTitle from "../../components/heading";

export default function HowItWork() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/homepage/howItWorks');
        if (response.data.success) {
          setSteps(response.data.data.content || []);
        }
      } catch (error) {
        console.error('Error fetching steps:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSteps();
  }, []);

  const getIcon = (iconName) => {
    const icons = {
      'search': <Search size={24} />,
      'calendar': <Calendar size={24} />,
      'map-pin': <MapPin size={24} />,
      'car': <Car size={24} />
    };
    return icons[iconName] || icons['car'];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[1250px] mx-auto p-6">
      <HeadingTitle 
        title="How It Works" 
        paragraph="Renting a car has never been easier with our simple steps"
      />

      <div className="flex flex-col mt-12 w-full lg:w-[1120px] h-auto lg:h-[550px] md:flex-row">
        <div className="md:w-1/2 relative lg:bottom-[24px] lg:left-[140px] z-[1] flex flex-col space-y-4">
          {steps.map((step, index) => (
            <BaseCard 
              key={index}
              width="w-full lg:w-[550px]" 
              height="h-auto" 
              boxShadow={false} 
              className="flex items-center p-4 border border-gray gap-4"
            >
              <BaseCard 
                bgColor="bg-gray" 
                boxShadow={false} 
                width="w-[56px]" 
                height="h-[76px]" 
                className="flex items-center justify-center"
              >
                {getIcon(step.icon)}
              </BaseCard>
              <div>
                <h3 className="text-base font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </BaseCard>
          ))}
        </div>

        <BaseCard 
          width="w-full lg:w-[620px]" 
          height="h-[500px]" 
          boxShadow={false} 
          bgColor="bg-gray" 
          className="flex justify-end items-center mt-8 md:mt-0"
        >
          <div className="flex justify-end my-auto">
            <img src={jeep} alt="Luxury Vehicle" className="w-full max-w-[400px] h-auto" />
          </div> 
        </BaseCard>
      </div>
    </div>
  );
}