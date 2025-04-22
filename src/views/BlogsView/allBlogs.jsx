import React from "react";
import BaseCard from "../../components/card";

export default function BlogCard({ 
  imageUrl = "/api/placeholder/400/200",
  title = "Peace, dignity and equality on a healthy planet",
  date = "24 Oct,2021",
  onClick = () => {}
}


) {
  return (
    <BaseCard 
      width="w-full" 
      height="h-auto" 
      padding="p-0" 
      boxShadow={true}
      className="max-w-xs overflow-hidden"
    >
      {/* Image Container */}
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content Container */}
      <div className="p-4">
        {/* Using img tag for title text */}
        <img 
          src={`/api/placeholder/300/50?text=${encodeURIComponent(title)}`}
          alt={title}
          className="w-full mb-4"
        />
        
        <div className="flex items-center justify-between mt-2">
          {/* Date with calendar icon */}
          <div className="flex items-center">
            <div className="bg-gray-200 p-1 rounded">
              <img 
                src="/api/placeholder/16/16?text=calendar" 
                alt="Calendar" 
                className="w-4 h-4"
              />
            </div>
            <span className="text-sm text-gray-600 ml-2">{date}</span>
          </div>
          
          {/* Read More button */}
          <button 
            className="flex items-center justify-center bg-indigo-600 text-white text-sm py-1 px-3 rounded-md"
            onClick={onClick}
          >
            Read More
            <img 
              src="/api/placeholder/16/16?text=→" 
              alt="Arrow" 
              className="w-4 h-4 ml-1"
            />
          </button>
        </div>
      </div>
    </BaseCard>
  );
}

