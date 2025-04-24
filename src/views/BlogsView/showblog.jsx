import React from 'react';
import { Calendar, Clock, User, List, Tag } from 'lucide-react';
import interImg from '../../assets/CARD1.jpg';
import BaseCard from '../../components/card';
import heroImage from "../../assets/Bannerimage.jpg";

const BlogPost = () => {
  // Sample data
  const post = {
    title: "What To Do if Your Rental Car Has Met With An Accident",
    date: "24 Oct, 2021",
    author: "Ahmed Khan",
    authorImage: interImg,
    featuredImage: interImg,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan odio vitae lorem tempus congue in at risus. Phasellus eget dui augue. Nam consectetur urna id enim sagittis efficitur. Aenean efficitur, mauris nec dignissim consequat, risus ligula porta dolor, at pulvinar sem lacus id eros. Ut sit amet sodales felis, eu interdum orci. Sed consectetur scelerisque nisl, ac hendrerit purus feugiat at. Suspendisse potenti. Suspendisse potenti.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan odio vitae lorem tempus congue in at risus. Phasellus eget dui augue. Nam consectetur urna id enim sagittis efficitur. Aenean efficitur, mauris nec dignissim consequat, risus ligula porta dolor, at pulvinar sem lacus id eros. Ut sit amet sodales felis, eu interdum orci. Sed consectetur scelerisque nisl, ac hendrerit purus feugiat at.`,
    categories: ["Automotive", "Insurance", "Travel Tips"],
    tableOfContents: [
      { title: "What to do immediately after an accident", anchor: "#immediately" },
      { title: "Contacting the rental company", anchor: "#contact" },
      { title: "Insurance coverage details", anchor: "#insurance" },
      { title: "Documentation requirements", anchor: "#documentation" },
      { title: "Legal considerations", anchor: "#legal" }
    ]
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
     
  <div className="relative w-full h-[400px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black/20">
        <div
          className="w-full h-full bg-cover opacity-30 bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />
      </div>

      {/* Header Content */}
      <div className="relative z-[1px] flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl  font-bold text-black mb-2">   {post.title}</h1>
          <div className="flex items-center space-x-4">
            {/* Profile Image in Hero Section */}
            <div className="flex items-center">
              <img 
                src={post.authorImage}
                alt={post.author}
                className="w-12 h-12 rounded-full  object-cover border-2 border-white mr-2"
              />
              <span className="text-black text-sm font-medium">{post.author}</span>
            </div>
            
            <div className="flex items-center text-black">
              <Calendar size={16} className="mr-1" />
              <span className="text-sm">{post.date}</span>
            </div>
          </div>

       
      </div>
    </div>
      {/* Content Area */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - on left for desktop, stacked on mobile */}
          <div className="lg:w-1/4 order-2 lg:order-1">
            {/* Enhanced Sticky Sidebar */}
            <BaseCard width='w-auto' boxShadow={false} height='h-auto' className=" border-2 border-gray sticky top-[88px]">
           
              {/* Table of Contents with enhanced styling */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center border-b pb-2 border-gray-200">
                  <List size={18} className="mr-2 text-blue-600" />
                  Table of Contents
                </h3>
                <div className="space-y-3">
                  {post.tableOfContents.map((item, index) => (
                    <div key={index} className="flex items-start group">
                      <span className="flex items-center justify-center bg-blue-100 text-blue-600 w-6 h-6 rounded-full text-xs font-medium mr-3">
                        {index + 1}
                      </span>
                      <a 
                        href={item.anchor} 
                        className="text-gray-700 group-hover:text-blue-600 text-sm leading-tight transition duration-200"
                      >
                        {item.title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </BaseCard>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4 order-1 lg:order-2">
            <BaseCard width='w-auto' boxShadow={false} className=' border-2 border-gray'  height='h-auto'>
              {/* Featured Image - Center Positioned */}
              <div className="relative">
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
                  className="w-full h-80 object-cover"
                />
              </div>
              
              {/* Author profile directly below image */}
              <div className="flex flex-col items-center -mt-12 mb-6">
                <img 
                  src={post.authorImage}
                  alt={post.author}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
                />
                <h4 className="font-bold text-lg mt-2">{post.author}</h4>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <Calendar size={14} className="mr-1" />
                  <span>{post.date}</span>
                </div>
              </div>
              
              {/* Post content */}
              <div className="p-6 pt-0">
                <h2 id="immediately" className="text-2xl scroll-mt-24  font-bold mb-4 text-gray-800">
                  {post.title}
                </h2>
                
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan odio vitae lorem tempus congue in at risus. Phasellus eget dui augue. Nam consectetur urna id enim sagittis efficitur. Aenean efficitur, mauris nec dignissim consequat, risus ligula porta dolor, at pulvinar sem lacus id eros. Ut sit amet sodales felis, eu interdum orci. Sed consectetur scelerisque nisl, ac hendrerit purus feugiat at.
                  </p>
                  
                  <h3 id="contact" className="text-xl scroll-mt-24 font-bold mt-6 mb-3 text-gray-800 flex items-center">
                   
                    Contacting the Rental Company
                  </h3>
                  <p className="mb-4">
                    Suspendisse potenti. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan odio vitae lorem tempus congue in at risus. Phasellus eget dui augue. Nam consectetur urna id enim sagittis efficitur. Aenean efficitur, mauris nec dignissim consequat, risus ligula porta dolor, at pulvinar sem lacus id eros.
                  </p>
                  
                  <h3 id="insurance" className="text-xl scroll-mt-24  font-bold mt-6 mb-3 text-gray-800 flex items-center">
                   
                    Insurance Coverage Details
                  </h3>
                  <p className="mb-4">
                    Ut sit amet sodales felis, eu interdum orci. Sed consectetur scelerisque nisl, ac hendrerit purus feugiat at. Suspendisse potenti. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan odio vitae lorem tempus congue in at risus.
                  </p>
                  
                  <h3 id="documentation" className="text-xl scroll-mt-24 font-bold mt-6 mb-3 text-gray-800 flex items-center">
                   
                    Documentation Requirements
                  </h3>
                  <p className="mb-4">
                    Phasellus eget dui augue. Nam consectetur urna id enim sagittis efficitur. Aenean efficitur, mauris nec dignissim consequat, risus ligula porta dolor, at pulvinar sem lacus id eros. Ut sit amet sodales felis, eu interdum orci. Sed consectetur scelerisque nisl, ac hendrerit purus feugiat at.
                  </p>
                  
                  <h3 id="legal" className="text-xl scroll-mt-24 font-bold mt-6 mb-3 text-gray-800 flex items-center">
                   
                    Legal Considerations
                  </h3>
                  <p className="mb-4">
                    Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan odio vitae lorem tempus congue in at risus. Phasellus eget dui augue. Nam consectetur urna id enim sagittis efficitur. Aenean efficitur, mauris nec dignissim consequat, risus ligula porta dolor, at pulvinar sem lacus id eros.
                  </p>
                </div>
              </div>
            </BaseCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;