import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldCheck, Clock, Trophy, HeartHandshake, Wallet, MapPin } from 'lucide-react';
import HeadingTitle from '../../components/heading';
import BaseCard from '../../components/card';

export default function WhyChooseUs() {
  const [whyChooseData, setWhyChooseData] = useState({
    header: {
      title: 'WHY CHOOSE US?',
      description: 'Experience premium car rental service with our commitment to excellence'
    },
    items: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get('http://localhost:5000/api/homepage/whyChoose');
        
        if (response.data.success && response.data.data?.content) {
          const content = response.data.data.content;
          
          // Validate and set the data
          setWhyChooseData({
            header: {
              title: content.header?.title || whyChooseData.header.title,
              description: content.header?.description || whyChooseData.header.description
            },
            items: Array.isArray(content.items) ? content.items.map(item => ({
              title: item.title || '',
              description: item.description || '',
              icon: item.icon || 'shield-check'
            })) : []
          });
        } else {
          throw new Error('Invalid response format from server');
        }
      } catch (error) {
        console.error('Error fetching features:', error);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchFeatures();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchFeatures, 30000);
    return () => clearInterval(interval);
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
    return (
      <div className="w-full bg-gray py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="h-48 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <HeadingTitle 
          title={whyChooseData.header.title}
          paragraph={whyChooseData.header.description}
        />

        {error && (
          <div className="text-red-600 mb-8 bg-red-50 p-4 rounded">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 mt-12 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseData.items.map((feature, index) => (
            <BaseCard 
              key={index}
              width='w-[300px]' 
              className='flex flex-col mx-auto items-center hover:shadow-lg transition-shadow duration-300' 
              height='h-auto'
            >
              <BaseCard 
                height='h-auto' 
                width='w-auto' 
                bgColor='bg-gray' 
                boxShadow={false}
                className="p-3 rounded-full"
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