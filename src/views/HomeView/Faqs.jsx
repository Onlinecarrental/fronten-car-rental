import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeadingTitle from '../../components/heading';
import BaseCard from '../../components/card';
import { ChevronDown } from 'lucide-react'; // Add this import

export default function Faqs() {
  const [faqData, setFaqData] = useState({
    header: {
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions about our car rental services'
    },
    faqs: []
  });
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/homepage/faqs');
        if (response.data.success) {
          // Handle both old and new data structure
          const content = response.data.data.content;
          setFaqData(prevState => ({
            ...prevState,
            ...(content.header && { header: content.header }),
            faqs: Array.isArray(content.faqs) ? content.faqs : []
          }));
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        // Keep default values on error
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="w-full bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <HeadingTitle 
          title={faqData.header.title}
          paragraph={faqData.header.description}
        />
        
        <div className="mt-12 space-y-4">
          {faqData.faqs.map((faq, index) => (
            <BaseCard 
              key={index}
              width="w-full"
              height="auto"
              className="cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={() => toggleAccordion(index)}
            >
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-6 h-6 transition-transform duration-300 ${
                      activeIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </div>
                <div className={`
                  mt-4 text-gray-600
                  transition-all duration-300 ease-in-out
                  ${activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
                `}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </BaseCard>
          ))}
        </div>
      </div>
    </div>
  );
}