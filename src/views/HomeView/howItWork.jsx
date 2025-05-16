import React, { useState, useEffect } from "react";
import { Search, Calendar, MapPin, Car } from "lucide-react";
import axios from 'axios';
import jeep from "../../assets/image 35.svg";
import BaseCard from "../../components/card";
import HeadingTitle from "../../components/heading";

export default function HowItWork() {
  // Initialize state similar to services component
  const [howItWorksData, setHowItWorksData] = useState({
    header: {
      title: "How It Works",
      description: "Renting a car has never been easier"
    },
    items: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHowItWorks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('http://localhost:5000/api/homepage/howItWorks');
        
        if (response.data.success && response.data.data?.content) {
          const content = response.data.data.content;
          
          // Validate and set the data
          setHowItWorksData({
            header: {
              title: content.header?.title || howItWorksData.header.title,
              description: content.header?.description || howItWorksData.header.description
            },
            items: Array.isArray(content.items) ? content.items.map(item => ({
              title: item.title || '',
              description: item.description || '',
              icon: item.icon || 'car'
            })) : []
          });
        } else {
          throw new Error('Invalid response format from server');
        }
      } catch (error) {
        console.error('Error fetching how it works:', error);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchHowItWorks();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchHowItWorks, 30000);
    return () => clearInterval(interval);
  }, []);

  // Helper function to get icon component
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
    return (
      <div className="max-w-[1250px] mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="md:w-1/2 h-[500px] bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1250px] mx-auto p-6">
      <HeadingTitle 
        title={howItWorksData.header.title}
        paragraph={howItWorksData.header.description}
      />

      {error && (
        <div className="text-red-600 mb-8 bg-red-50 p-4 rounded">
          {error}
        </div>
      )}

      <div className="flex flex-col mt-12 w-full lg:w-[1120px] h-auto lg:h-[550px] md:flex-row">
        <div className="md:w-1/2 relative lg:bottom-[24px] lg:left-[140px] z-[1] flex flex-col space-y-4">
          {howItWorksData.items.map((step, index) => (
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