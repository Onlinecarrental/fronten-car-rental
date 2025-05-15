import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroSection from './components/HeroSection';
import TrustSection from './components/TrustSection';
import WhyChooseSection from './components/WhyChooseSection';
import CarCollectionSection from './components/CarCollectionSection';
import FaqsSection from './components/FaqsSection';
import ServicesSection from './components/ServicesSection';

export default function AboutUsManagement({ initialSection = 'hero' }) {
  const [sections, setSections] = useState({
    hero: {},
    trust: [],
    services: [],
    whyChoose: [],
    carCollection: [],
    faqs: []
  });
  const [editingSection, setEditingSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(initialSection);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/about');
      setSections(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching about sections:', error);
    }
  };

  const handleUpdate = async (sectionType, content) => {
    try {
      const formData = new FormData();
      if (content.image instanceof File) {
        formData.append('image', content.image);
      }
      formData.append('content', JSON.stringify(content));

      await axios.patch(
        `http://localhost:5000/api/about/${sectionType}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      fetchSections();
      setEditingSection(null);
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  const sectionProps = {
    sections,
    setSections,
    editingSection,
    setEditingSection,
    handleUpdate
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">About Us Page Management</h2>
      
      {/* Section Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${activeSection === 'hero' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveSection('hero')}
        >
          Hero Section
        </button>
        <button
          className={`px-4 py-2 rounded ${activeSection === 'services' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveSection('services')}
        >
          Services
        </button>
        <button
          className={`px-4 py-2 rounded ${activeSection === 'trust' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveSection('trust')}
        >
          Trust Section
        </button>
        <button
          className={`px-4 py-2 rounded ${activeSection === 'whyChoose' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveSection('whyChoose')}
        >
          Why Choose Us
        </button>
        <button
          className={`px-4 py-2 rounded ${activeSection === 'carCollection' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveSection('carCollection')}
        >
          Car Collection
        </button>
        <button
          className={`px-4 py-2 rounded ${activeSection === 'faqs' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveSection('faqs')}
        >
          FAQs
        </button>
      </div>

      {/* Section Content */}
      <div className="mt-6">
        {activeSection === 'hero' && (
          <HeroSection {...sectionProps} />
        )}
        {activeSection === 'services' && (
          <ServicesSection {...sectionProps} />
        )}
        {activeSection === 'trust' && (
          <TrustSection {...sectionProps} />
        )}
        {activeSection === 'whyChoose' && (
          <WhyChooseSection {...sectionProps} />
        )}
        {activeSection === 'carCollection' && (
          <CarCollectionSection {...sectionProps} />
        )}
        {activeSection === 'faqs' && (
          <FaqsSection {...sectionProps} />
        )}
      </div>
    </div>
  );
}