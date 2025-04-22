import React from 'react';
import BaseCard from '../../components/card';

export default function CustomerTestimonials() {
  const testimonials = [
    {
      stars: 5,
      date: "OCT, 2020",
      text: "From the moment we booked online to picking up our car, everything was seamless. The vehicle was sparkling clean, fuel-efficient, and made our road trip enjoyable and stress-free. The customer service team was incredibly helpful and accommodating. Will definitely use again!",
      name: "charl white",
      role: "customer",
      profileType: "light",
      image: "/images/user1.jpg" // ✅ Add your own image path
    },
    {
      stars: 5,
      date: "OCT, 2020",
      text: "From the moment we booked online to picking up our car, everything was seamless. The vehicle was sparkling clean, fuel-efficient, and made our road trip enjoyable and stress-free. The customer service team was incredibly helpful and accommodating. Will definitely use again!",
      name: "charl white",
      role: "customer",
      profileType: "light",
      image: "/images/user2.jpg"
    },
    {
      stars: 5,
      date: "OCT, 2020",
      text: "From the moment we booked online to picking up our car, everything was seamless. The vehicle was sparkling clean, fuel-efficient, and made our road trip enjoyable and stress-free. The customer service team was incredibly helpful and accommodating. Will definitely use again!",
      name: "charl white",
      role: "customer",
      profileType: "dark",
      image: "/images/user3.jpg"
    }
  ];

  return (
    <div className="w-full bg-white py-12 px-4">
      <div className="max-w-[1250px] mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h2 className="text-[40px] font-medium font-poppins text-black ">What Our Customers are</h2>
          <h2 className="text-[40px] font-medium font-poppins text-black mx-auto">saying about us</h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 font-jakarta md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <BaseCard height='h-auto' bgColor='bg-gray' width='w-[380px]' key={index} >
              {/* Star Rating and Date */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white text-sm">{testimonial.date}</span>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 text-sm mb-4">{testimonial.text}</p>

              {/* Horizontal Line */}
              <hr className="my-4 border-white" />

              {/* Customer Info */}
              <div className="flex items-center">
                <div className="mr-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{testimonial.name}</span>
                  <span className="text-xs text-gray">{testimonial.role}</span>
                </div>
              </div>
            </BaseCard>
          ))}
        </div>

      </div>
    </div>
  );
}
