import React from 'react';
import HeadingTitle from '../../components/heading';

export default function ServicesBenefit() {
  return (
    <div className="bg-white py-8 px-4 w-full">
      <div className="max-w-[1250px] mx-auto text-center">
    <HeadingTitle title="Our Services & Benefits" paragraph='To make renting easy and hassle-free, we provide a variety of services and advantages. We have you covered with a variety of vehicles and flexible rental terms.'
        />
        <div className="grid grid-cols-1 max-w-[1120px] mx-auto mt-8 md:grid-cols-3 gap-8">
          {/* Quality Choice */}
          <div className="flex flex-col items-center">
            <div className="bg-gray border-4 border-black p-2 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Quality Choice</h3>
            <p className="text-sm text-gray-700">
              We offer a wide range of high-quality vehicles to choose from, including luxury cars, SUVs, vans, and more.
            </p>
          </div>
          
          {/* Affordable Prices */}
          <div className="flex flex-col items-center">
            <div className="bg-gray border-4 border-black p-2 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Affordable Prices</h3>
            <p className="text-sm text-gray-700">
              Our rental rates are highly competitive and affordable, allowing our customers to enjoy their trips without breaking the bank.
            </p>
          </div>
          
          {/* Convenient Online Booking */}
          <div className="flex flex-col items-center">
            <div className="bg-gray border-4 border-black p-2 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Convenient Online Booking</h3>
            <p className="text-sm text-gray-700">
              With our easy-to-use online booking system, customers can quickly and conveniently reserve their vehicles at any time, anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}