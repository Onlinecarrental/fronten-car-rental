import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../components/button';
import carimage from '../../assets/car 2 1.svg';

export default function HeroSectionHome() {
  const [heroData, setHeroData] = useState({
    title: 'Enjoy your life with our comfortable cars.',
    description: 'Carent is ready to serve the best experience in car rental.',
    image: carimage
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/homepage/hero');
        if (response.data.success && response.data.data) {
          const content = response.data.data.content || {};
          setHeroData({
            ...content,
            image: content.image 
              ? `http://localhost:5000/${content.image}`.replace(/\/\//g, '/')
              : carimage
          });
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
        setHeroData(prev => ({ ...prev, image: carimage }));
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  return (
    <div className="relative bg-gray w-full h-[100%] flex">
      <div className="max-w-[1280px] mx-auto px-6 w-full pt-8 md:pt-36 flex flex-col md:flex-row items-start justify-between">
        {/* Left content */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            {heroData.title}
          </h1>
          <p className="text-lg md:text-xl text-black mb-8">
            {heroData.description}
          </p>
          <Button height="43px" width="auto" boxShadow={false} title="Book Now" to="/login" />
        </div>

        {/* Right content - Image */}
        <div className="w-full md:w-1/2 mt-8 flex justify-end">
          {loading ? (
            <div className="animate-pulse bg-gray-200 w-full h-[300px]"></div>
          ) : (
            <img 
              src={heroData.image}
              alt="Featured Car"
              className="object-contain max-w-full h-auto"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = carimage; // Fallback to default image
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
