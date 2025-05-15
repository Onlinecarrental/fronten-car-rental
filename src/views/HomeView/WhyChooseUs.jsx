import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldCheck, Clock, Trophy, HeartHandshake, Wallet, MapPin } from 'lucide-react';
import HeadingTitle from '../../components/heading';
import BaseCard from '../../components/card';

export default function WhyChooseUs() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/homepage/whyChoose');
        if (response.data.success) {
          setFeatures(response.data.data.content || []);
        }
      } catch (error) {
        console.error('Error fetching features:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  const getIcon = (iconName) => {
    const icons = {
      'shield-check': <ShieldCheck size={24} className="text-purple-600" />,
      'clock': <Clock size={24} className="text-purple-600" />,
      'trophy': <Trophy size={24} className="text-purple-600" />,
      'heart-handshake': <HeartHandshake size={24} className="text-purple-600" />,
      'wallet': <Wallet size={24} className="text-purple-600" />,
      'map-pin': <MapPin size={24} className="text-purple-600" />
    };
    return icons[iconName] || icons['shield-check'];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full bg-gray py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <HeadingTitle 
          title="WHY CHOOSE US?" 
          paragraph="Experience premium car rental service with our commitment to excellence"
        />
        
        <div className="grid grid-cols-1 mt-12 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <BaseCard 
              key={index}
              width='w-[300px]' 
              className='flex flex-col mx-auto items-center' 
              height='h-auto'
            >
              <BaseCard 
                height='h-auto' 
                width='w-auto' 
                bgColor='bg-gray' 
                boxShadow={false}
              >
                {getIcon(feature.icon)}
              </BaseCard>
              
              <h3 className="font-bold text-center mb-2">
                {feature.title}
              </h3>
              
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