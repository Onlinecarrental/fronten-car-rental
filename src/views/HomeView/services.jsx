import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeadingTitle from '../../components/heading';

export default function ServicesBenefits() {
  const [serviceData, setServiceData] = useState({
    header: {
      title: 'Our Services & Benefits',
      description: 'To make renting easy and hassle-free, we provide a variety of services and advantages'
    },
    items: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/homepage/services');
        if (response.data.success) {
          setServiceData(response.data.data.content);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray py-8 px-4 w-full">
      <div className="max-w-[1250px] mx-auto text-center">
        <HeadingTitle
          title={serviceData.header.title}
          paragraph={serviceData.header.description}
        />
        <div className="grid grid-cols-1 max-w-[1120px] mx-auto mt-8 md:grid-cols-3 gap-8">
          {serviceData.items.map((service, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-white border-4 border-black p-2 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.iconPath} />
                </svg>
              </div>
              <h3 className="font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}