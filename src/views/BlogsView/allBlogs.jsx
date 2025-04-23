import { useState } from 'react';
import { Calendar, User, Tag, Search, Menu, X, ChevronRight } from 'lucide-react';

export default function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Profile information
  const profile = {
    name: "Malik Rashid",
    image: "/api/placeholder/100/100",
    bio: "Web Developer & Tech Blogger"
  };
  
  const categories = [
    { name: 'All', count: 12 },
    { name: 'Technology', count: 5 },
    { name: 'Automotive', count: 4 },
    { name: 'Environment', count: 3 }
  ];
  
  const posts = [
    {
      id: 1,
      title: 'Peace, dignity and equality on a healthy planet',
      image: '/api/placeholder/400/250',
      date: '24 Oct, 2021',
      author: 'Ahmed Khan',
      category: 'Environment',
      excerpt: 'Exploring sustainable solutions for our planet\'s future generations...'
    },
    {
      id: 2,
      title: 'Peace, dignity and equality on a healthy planet',
      image: '/api/placeholder/400/250',
      date: '24 Oct, 2021',
      author: 'Mehak Ali',
      category: 'Technology',
      excerpt: 'Discussing how technology can promote equality in developing nations...'
    },
    {
      id: 3,
      title: 'Peace, dignity and equality on a healthy planet',
      image: '/api/placeholder/400/250',
      date: '24 Oct, 2021',
      author: 'Rahul Dev',
      category: 'Automotive',
      excerpt: 'How sustainable vehicles are changing transportation paradigms...'
    },
    {
      id: 4,
      title: 'Peace, dignity and equality on a healthy planet',
      image: '/api/placeholder/400/250',
      date: '24 Oct, 2021',
      author: 'Zainab Fatima',
      category: 'Environment',
      excerpt: 'Climate initiatives that are making a real difference...'
    },
    {
      id: 5,
      title: 'Peace, dignity and equality on a healthy planet',
      image: '/api/placeholder/400/250',
      date: '24 Oct, 2021',
      author: 'Farhan Ahmed',
      category: 'Automotive',
      excerpt: 'The road ahead for electric vehicles in South Asia...'
    },
    {
      id: 6,
      title: 'Peace, dignity and equality on a healthy planet',
      image: '/api/placeholder/400/250',
      date: '24 Oct, 2021',
      author: 'Ayesha Malik',
      category: 'Technology',
      excerpt: 'How digital literacy is empowering communities...'
    }
  ];
  
  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="bg-gray-50 min-h-screen">
     
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile menu overlay */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
              <div className="absolute top-0 right-0 h-full w-64 bg-white shadow-lg p-5" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Menu</h2>
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>
                
                <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
                  <img 
                    src={profile.image} 
                    alt={profile.name}
                    className="w-12 h-12 rounded-full mr-3 border-2 border-indigo-200"
                  />
                  <div>
                    <h3 className="font-bold">{profile.name}</h3>
                    <p className="text-sm text-gray-600">{profile.bio}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    className="w-full border border-gray-300 rounded-lg py-2 px-4 pl-10 bg-gray-50"
                  />
                </div>
                
                <h3 className="font-medium mb-3">Categories</h3>
                <ul>
                  {categories.map(category => (
                    <li key={category.name}>
                      <button
                        onClick={() => {
                          setActiveCategory(category.name);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center justify-between w-full py-2 px-3 mb-1 ${
                          activeCategory === category.name ? 'text-indigo-600 font-medium' : 'text-gray-600'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="bg-gray-100 text-gray-700 rounded-full text-xs px-2 py-0.5">
                          {category.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        
          {/* Sidebar - desktop */}
          <div className="hidden lg:block lg:w-1/4">
        
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-1">
                {categories.map(category => (
                  <li key={category.name}>
                    <button
                      onClick={() => setActiveCategory(category.name)}
                      className={`flex items-center justify-between w-full py-2.5 px-4 rounded-lg transition ${
                        activeCategory === category.name 
                          ? 'bg-indigo-50 text-indigo-700 font-medium' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="flex items-center">
                        <Tag size={16} className="mr-2" />
                        {category.name}
                      </span>
                      <div className="flex items-center">
                        <span className="bg-gray-100 text-gray-700 rounded-full text-xs px-2 py-1 mr-1">
                          {category.count}
                        </span>
                        {activeCategory === category.name && <ChevronRight size={16} className="text-indigo-500" />}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Category indication */}
  
             
              
            
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-blue-500 bg-opacity-90 text-white text-xs px-2 py-1 rounded-md">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 hover:text-indigo-600 transition">{post.title}</h3>
                    
                    <p className="text-gray-600 mb-4 text-sm">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        <img 
                          src="/api/placeholder/32/32" 
                          alt={post.author}
                          className="w-8 h-8 rounded-full mr-2 border border-gray-200"
                        />
                        <div>
                          <p className="text-sm font-medium">{post.author}</p>
                          <div className="flex items-center text-gray-500 text-xs">
                            <Calendar size={12} className="mr-1" />
                            {post.date}
                          </div>
                        </div>
                      </div>
                      
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center transition">
                        Read
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}