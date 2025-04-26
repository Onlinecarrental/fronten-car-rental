import { useState, useEffect } from 'react';
import 'flatpickr/dist/flatpickr.css';
import flatpickr from 'flatpickr';

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    location: '',
    dateFrom: '',
    dateTo: '',
    price: '',
    paymentMethod: 'Credit Card',
    paymentNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Allow only alphabets and space for name
    if (name === 'name' && /[^a-zA-Z\s]/.test(value)) return;

    // Allow only numbers for mobile
    if (name === 'mobile' && /[^0-9]/.test(value)) return;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error on change
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{11}$/; // Exactly 10 digits for Indian mobile numbers
    return re.test(phone);
  };
  const parseDMY = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };
  
 
  const validateStep = () => {
    const stepErrors = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) stepErrors.name = 'Name is required';
      
      if (!formData.email.trim()) {
        stepErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        stepErrors.email = 'Please enter a valid email address';
      }
      
      if (!formData.mobile.trim()) {
        stepErrors.mobile = 'Mobile number is required';
      } else if (!validatePhone(formData.mobile)) {
        stepErrors.mobile = 'Please enter a valid 10-digit phone number';
      }
    }

    if (currentStep === 2) {
      if (!formData.location.trim()) stepErrors.location = 'Location is required';
      
      if (currentStep === 2) {
        if (!formData.location.trim()) stepErrors.location = 'Location is required';
      
        const from = parseDMY(formData.dateFrom);
        const to = parseDMY(formData.dateTo);
      
        if (!formData.dateFrom || isNaN(from.getTime())) {
          stepErrors.dateFrom = 'Valid start date is required (DD/MM/YYYY)';
        }
        if (!formData.dateTo || isNaN(to.getTime())) {
          stepErrors.dateTo = 'Valid end date is required (DD/MM/YYYY)';
        }
      
        if (!stepErrors.dateFrom && !stepErrors.dateTo && from > to) {
          stepErrors.dateTo = 'End date must be after start date';
        }
    }
    }

    if (currentStep === 3) {
      if (!formData.price.trim()) stepErrors.price = 'Price is required';
      if (!formData.paymentNumber.trim()) stepErrors.paymentNumber = 'Payment number is required';
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (validateStep()) {
      setBookingSuccess(true);
      console.log('Booking submitted:', formData);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      location: '',
      dateFrom: '',
      dateTo: '',
      price: '',
      paymentMethod: 'Credit Card',
      paymentNumber: ''
    });
    setCurrentStep(1);
    setBookingSuccess(false);
  };

  const paymentMethods = ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer', 'Cash'];
  useEffect(() => {
    if (currentStep === 2) {
      const fromPicker = flatpickr("#dateFrom", {
        dateFormat: "d/m/Y",
        allowInput: true,
        onChange: ([date]) => {
          const formatted = flatpickr.formatDate(date, "d/m/Y");
          setFormData(prev => ({ ...prev, dateFrom: formatted }));
          setErrors(prev => ({ ...prev, dateFrom: '' }));
        }
      });
  
      const toPicker = flatpickr("#dateTo", {
        dateFormat: "d/m/Y",
        allowInput: true,
        minDate: formData.dateFrom || null,
        onChange: ([date]) => {
          const formatted = flatpickr.formatDate(date, "d/m/Y");
          setFormData(prev => ({ ...prev, dateTo: formatted }));
          setErrors(prev => ({ ...prev, dateTo: '' }));
        }
      });
  
      return () => {
        fromPicker.destroy();
        toPicker.destroy();
      };
    }
  }, [currentStep, formData.dateFrom]); 
  
  return (
    <div className="w-full mx-auto font-jakarta bg-white">
      <div className="p-4">
        {bookingSuccess ? (
          <div className="text-center max-w-[700px]  mx-auto p-14">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-3xl font-[600]   mb-2">Booking Successful!</h2>
            <p className="text-[18px]">Your booking has been confirmed.</p>
            <p className="mb-6 text-[18px]">Agent when see you they give you message.</p>
            <button 
              onClick={resetForm}
              className="px-4 py-4 bg-Blue text-[18px] text-white rounded-md"
            >
              Make Another Booking
            </button>
          </div>
        ) : (
          <>
            <div className="text-center font-bold text-[35px] mb-8">BOOKING FORM</div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center ">
              {[1, 2, 3].map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className={` w-20  h-20 rounded-md flex items-center text-[24px] font-[500] justify-center ${step <= currentStep ? 'bg-black text-white' : 'bg-gray text-white'}`}>{step}</div>
                  {step < 3 && <div className={`h-[10px] w-[8rem] ${step < currentStep ? 'bg-black' : 'bg-gray'}`}></div>}
                </div>
              ))}
            </div>

            {/* Form Content */}
            <div className="p-4">
              {currentStep === 1 && (
                <div className="bg-gray mx-auto max-w-[700px] p-4 rounded-md">
                  <div className=" text-center  text-[28px] font-bold">Personal Detail</div>
                  <div className="mb-4 ">
                    <label className="block text-lg font-[500] mb-1">Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>

                  <div className="mb-4 ">
                    <label className="block text-lg font-[500] mb-1">Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>

                  <div className="mb-4 ">
                    <label className="block text-lg font-[500] mb-1">Mobile No:</label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="Enter 11-digit mobile number"
                      maxLength="11"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                  </div>

                  <div className="flex justify-between mt-6">
                    <button disabled className="px-4 py-2 bg-white text-black rounded-md opacity-50 cursor-not-allowed">Back</button>
                    <button onClick={nextStep} className="px-4 py-2 bg-Blue text-white rounded-md">Next</button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="bg-gray mx-auto max-w-[700px] p-4 rounded-md">
                  <div className=" text-center  text-[28px] font-bold">Booking Details</div>

                  <div className="mb-4 ">
                    <label className="block text-lg font-[500] mb-1">Location:</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter location"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                  </div>

                  <div className="mb-4 ">
                    <label className="block text-lg font-[500] mb-1">Date From:</label>
                    <input
  type="text"
  id="dateFrom"
  value={formData.dateFrom}
  onChange={(e) => setFormData({ ...formData, dateFrom: e.target.value })}
  placeholder="DD/MM/YYYY"
  className="w-full p-2 border border-gray-300 rounded-md"
/>
{errors.dateFrom && <p className="text-red-500 text-sm">{errors.dateFrom}</p>}</div>

                  <div className="mb-4 ">
                    <label className="block text-lg font-[500] mb-1">Date To:</label>
                    <input
  type="text"
  id="dateTo"
  value={formData.dateTo}
  onChange={(e) => setFormData({ ...formData, dateTo: e.target.value })}
  placeholder="DD/MM/YYYY"
  className="w-full p-2 border border-gray-300 rounded-md"
/>
{errors.dateTo && <p className="text-red-500 text-sm">{errors.dateTo}</p>}</div>

                  <div className="flex justify-between mt-6">
                    <button onClick={prevStep} className="px-4 py-2 bg-white text-black rounded-md">Previous</button>
                    <button onClick={nextStep} className="px-4 py-2 bg-Blue text-white rounded-md">Next</button>
                  </div>
                </div>
              )}

{currentStep === 3 && (
  <div className="bg-gray mx-auto max-w-[700px] p-4 rounded-md">
    <div className=" text-center  text-[28px] font-bold">Payment Details</div>

    <div className="mb-4 ">
      <label className="block text-lg font-[500] mb-1">Price:</label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit(); // Enter to submit
          }}
          placeholder="Enter price"
          className="w-full p-2 pl-8 border border-gray-300 rounded-md"
        />
      </div>
      {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
    </div>

    <div className="mb-4 ">
      <label className="block text-lg font-[500] mb-1">Payment Method:</label>
      <select
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        {paymentMethods.map((method, i) => (
          <option key={i} value={method}>{method}</option>
        ))}
      </select>
    </div>

    <div className="mb-4 ">
      <label className="block text-lg font-[500] mb-1">Payment Number:</label>
      <input
        type="text"
        name="paymentNumber"
        value={formData.paymentNumber}
        onChange={handleInputChange}
        placeholder="Enter card/account number"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      {errors.paymentNumber && <p className="text-red-500 text-sm">{errors.paymentNumber}</p>}
    </div>

    <div className="flex justify-between mt-6">
      <button onClick={prevStep} className="px-4 py-2 bg-white text-black rounded-md">Previous</button>
      <button onClick={handleSubmit} className="px-4 py-2 bg-Blue text-white rounded-md">Submit </button>
    </div>
  </div>
)}

            </div>
          </>
        )}
      </div>
    </div>
  );
}