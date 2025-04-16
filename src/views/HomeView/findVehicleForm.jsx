import { useState, useEffect } from 'react';

// Internal Button component definition
function CustomButton({
  title,
  onClick = null,
  height = "50px",
  width = "150px",
  bgColor = "#5937E0",
  hoverBgColor = "#A9A9A9",
  hoverTextColor = "white",
  activeColor = "#000000",
  boxShadow = true,
  rounded = "rounded-[10px]",
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  const buttonStyle = {
    backgroundColor: isActive ? activeColor : (isHovered ? hoverBgColor : bgColor),
    color: isHovered ? hoverTextColor : "Black",
    height: height,
    width: width,
    transition: "background-color 0.2s, color 0.2s, transform 0.2s",
    boxShadow: boxShadow ? "4px 10px 30px 0px rgba(0, 0, 0, 0.3)" : "none",
  };

  return (
    <button
      className={`font-medium text-[20px] px-4 lg:px-5 transition duration-300 ease-in-out ${rounded}`}
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => {
        setIsActive(false);
        setIsHovered(true);
      }}
    >
      {title}
    </button>
  );
}

// Internal BaseCard component definition
function BaseCard({
  children,
  width = "650px",
  height = "300px",
  bgColor = "#ffffff",
  padding = "16px",
  borderRadius = "25px"
}) {
  return (
    <div
      className="relative"
      style={{
        width: width,
        height: height,
        backgroundColor: bgColor,
        
        borderRadius: borderRadius,
        boxShadow: "4px 10px 30px 0px rgba(0, 0, 0, 0.3)",
        padding: padding,
      }}
    >
      {children}
    </div>
  );
}

export default function CarRentalForm() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form on submission attempt
  useEffect(() => {
    if (isSubmitting) {
      validateForm();
    }
  }, [isSubmitting, pickupLocation, dropoffLocation, pickupDate, dropoffDate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!pickupLocation.trim()) {
      newErrors.pickupLocation = 'Pickup location is required';
    }
    
    if (!dropoffLocation.trim()) {
      newErrors.dropoffLocation = 'Drop-off location is required';
    }
    
    if (!pickupDate) {
      newErrors.pickupDate = 'Pickup date is required';
    }
    
    if (!dropoffDate) {
      newErrors.dropoffDate = 'Drop-off date is required';
    } else if (pickupDate && dropoffDate && new Date(dropoffDate) < new Date(pickupDate)) {
      newErrors.dropoffDate = 'Drop-off date must be after pickup date';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      handleSubmit();
    } else {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    // Here you would handle the actual form submission
    console.log('Form submitted:', { pickupLocation, dropoffLocation, pickupDate, dropoffDate });
    setIsSubmitting(false);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <BaseCard  width="1200px" height="auto" padding="24px">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Drop-off Location */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">Drop-off Location</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                type="text"
                className={`pl-10 w-full py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.dropoffLocation ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Search a location"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
              />
            </div>
            {errors.dropoffLocation && <p className="mt-1 text-xs text-red-500">{errors.dropoffLocation}</p>}
          </div>

          {/* Pick-up Location */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">Pick-up Location</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                type="text"
                className={`pl-10 w-full py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.pickupLocation ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Search a location"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              />
            </div>
            {errors.pickupLocation && <p className="mt-1 text-xs text-red-500">{errors.pickupLocation}</p>}
          </div>

          {/* Pick-up Date */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">Pick-up date</label>
            <div className="relative">
              <input
                type="date"
                className={`w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.pickupDate ? 'border-red-500' : 'border-gray-300'}`}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {errors.pickupDate && <p className="mt-1 text-xs text-red-500">{errors.pickupDate}</p>}
          </div>

          {/* Drop-off Date */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">Drop-off date</label>
            <div className="relative">
              <input
                type="date"
                className={`w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.dropoffDate ? 'border-red-500' : 'border-gray-300'}`}
                value={dropoffDate} 
                onChange={(e) => setDropoffDate(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {errors.dropoffDate && <p className="mt-1 text-xs text-red-500">{errors.dropoffDate}</p>}
          </div>
          <div className='flex flex-col'> <CustomButton
            title="Find a Vehicle"
            onClick={() => setIsSubmitting(true)}
            width="180px"
            bgColor="#5937E0"
            hoverBgColor="#4c2ed6"
            hoverTextColor="white"
            rounded="rounded-[10px]"
            boxShadow={true}
          /></div>
        </div>

        {/* Find a Vehicle Button */}
        
         
        
      </BaseCard>
    </div>
  );
}