import React from 'react';
import { Edit2, Save, RotateCcw, Plus, Trash } from 'lucide-react';

export default function FaqsSection({ sections, setSections, editingSection, setEditingSection, handleUpdate }) {
  const addNewFaq = () => {
    const newFaqs = [...sections.faqs, { 
      question: '', 
      answer: ''
    }];
    setSections({ ...sections, faqs: newFaqs });
  };

  const deleteFaq = (index) => {
    const newFaqs = sections.faqs.filter((_, i) => i !== index);
    setSections({ ...sections, faqs: newFaqs });
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">FAQs Section</h3>
        <button onClick={addNewFaq} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded">
          <Plus size={18} />
          <span>Add FAQ</span>
        </button>
      </div>

      <div className="grid gap-4">
        {sections.faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            {editingSection === `faq-${index}` ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => {
                    const newFaqs = [...sections.faqs];
                    newFaqs[index].question = e.target.value;
                    setSections({ ...sections, faqs: newFaqs });
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="Question"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => {
                    const newFaqs = [...sections.faqs];
                    newFaqs[index].answer = e.target.value;
                    setSections({ ...sections, faqs: newFaqs });
                  }}
                  className="w-full p-2 border rounded"
                  rows="4"
                  placeholder="Answer"
                />
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleUpdate('faqs', sections.faqs)} 
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded"
                  >
                    <Save size={18} />
                    <span>Save</span>
                  </button>
                  <button 
                    onClick={() => setEditingSection(null)} 
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded"
                  >
                    <RotateCcw size={18} />
                    <span>Cancel</span>
                  </button>
                  <button 
                    onClick={() => deleteFaq(index)} 
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded ml-auto"
                  >
                    <Trash size={18} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="font-medium mb-2">{faq.question}</h4>
                <p className="text-gray-600 mb-4">{faq.answer}</p>
                <button 
                  onClick={() => setEditingSection(`faq-${index}`)} 
                  className="flex items-center gap-2 text-blue-600"
                >
                  <Edit2 size={18} />
                  <span>Edit</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}