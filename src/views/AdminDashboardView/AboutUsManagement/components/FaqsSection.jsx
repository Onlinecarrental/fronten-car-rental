import React, { useState } from 'react';
import { Edit2, Save, RotateCcw, Plus, Trash } from 'lucide-react';

export default function FaqsSection({ sections, setSections, editingSection, setEditingSection, handleUpdate }) {
  const [updateStatus, setUpdateStatus] = useState({
    loading: false,
    error: null,
    success: null
  });

  // Safely access FAQs array with proper default value
  const faqs = sections?.faqs?.items || [];

  const handleFaqSave = async (index) => {
    try {
      setUpdateStatus({ loading: true, error: null });

      if (!sections?.faqs?.header) {
        throw new Error('FAQ section header is missing');
      }

      const content = {
        header: sections.faqs.header,
        items: faqs.map(item => ({
          question: item.question?.trim() || '',
          answer: item.answer?.trim() || ''
        }))
      };

      const result = await handleUpdate('faqs', content);

      if (result?.success) {
        setSections(prev => ({
          ...prev,
          faqs: result.data.content
        }));
        setEditingSection(null);
        setUpdateStatus({
          loading: false,
          error: null,
          success: 'FAQs updated successfully!'
        });
      }
    } catch (error) {
      setUpdateStatus({
        loading: false,
        error: error.message,
        success: null
      });
    }
  };

  const addNewFaq = () => {
    setSections(prev => ({
      ...prev,
      faqs: {
        ...prev.faqs,
        items: [
          ...(prev.faqs?.items || []),
          { question: '', answer: '' }
        ]
      }
    }));
    setEditingSection(`faq-${faqs.length}`);
  };

  const deleteFaq = async (index) => {
    try {
      setUpdateStatus({ loading: true, error: null });

      const newFaqs = faqs.filter((_, i) => i !== index);
      const content = {
        header: sections.faqs.header,
        items: newFaqs
      };

      const result = await handleUpdate('faqs', content);

      if (result?.success) {
        setSections(prev => ({
          ...prev,
          faqs: result.data.content
        }));
        setUpdateStatus({
          loading: false,
          error: null,
          success: 'FAQ deleted successfully!'
        });
      }
    } catch (error) {
      setUpdateStatus({
        loading: false,
        error: error.message,
        success: null
      });
    }
  };

  return (
    <div className="mb-8">
      {updateStatus.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded mb-4">
          {updateStatus.error}
        </div>
      )}

      {updateStatus.success && (
        <div className="bg-green-50 text-green-600 p-4 rounded mb-4">
          {updateStatus.success}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">FAQs Section</h3>
        <button 
          onClick={addNewFaq} 
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          <Plus size={18} />
          <span>Add FAQ</span>
        </button>
      </div>

      <div className="grid gap-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            {/* Rest of your rendering logic remains the same */}
          </div>
        ))}
      </div>

      {updateStatus.loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}