import { useState, useEffect } from 'react';
import { Calendar, User, Tag, Search, Menu, X, ChevronRight } from 'lucide-react';
import BaseCard from '../../components/card';
import interImg from '../../assets/CARD1.jpg';
import Button from '../../components/button';

export default function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

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
      profileImage: interImg,
      date: '24 Oct, 2021',
      author: 'Ahmed Khan',
      category: 'Environment',
      excerpt: 'Exploring sustainable solutions for our planet\'s future generations...'
    },
    {
      id: 2,
      profileImage: interImg,
      title: 'Peace, dignity and equality on a healthy planet',
      image: '/api/placeholder/400/250',
      date: '24 Oct, 2021',
      author: 'Mehak Ali',
      category: 'Technology',
      excerpt: 'Discussing how technology can in developing nations...'
    },
    {
      id: 3,
      profileImage: interImg,
      title: 'Peace, dignity and equality on a healthy planet',
      image: '/api/placeholder/400/250',
      date: '24 Oct, 2021',
      author: 'Rahul Dev',
      category: 'Automotive',
      excerpt: 'How sustainable vehicles are changing transportation paradigms...'
    },
    {
      id: 4,
      profileImage: interImg,
      title: 'Peace, dignity and equality on a healthy planet',
      image: '/api/placeholder/400/250',
      date: '24 Oct, 2021',
      author: 'Zainab Fatima',
      category: 'Environment',
      excerpt: 'Climate initiatives that are making a real difference...'
    },
    {
      id: 5,
      profileImage: interImg,
      title: 'Peace, dignity and equality on a healthy planet',
      image: '/api/placeholder/400/250',
      date: '24 Oct, 2021',
      author: 'Farhan Ahmed',
      category: 'Automotive',
      excerpt: 'The road ahead for electric vehicles in South Asia...'
    },
    {
      id: 6,
      profileImage: interImg,
      title: 'Peace, dignity and equality on a healthy planet',
      image: '/api/placeholder/400/250',
      date: '24 Oct, 2021',
      author: 'Rahul Dev',
      category: 'Automotive',
      excerpt: 'How sustainable vehicles are changing transportation paradigms...'
    },
    {
      id: 7,
      profileImage: interImg,
      title: 'Peace, dignity and equality on a healthy planet',
      image: '/api/placeholder/400/250',
      date: '24 Oct, 2021',
      author: 'Zainab Fatima',
      category: 'Environment',
      excerpt: 'Climate initiatives that are making a real difference...'
    },
    {
      id: 8,
      profileImage: interImg,
      title: 'Peace, dignity and equality on a healthy planet',
      image: '/api/placeholder/400/250',
      date: '24 Oct, 2021',
      author: 'Farhan Ahmed',
      category: 'Automotive',
      excerpt: 'The road ahead for electric vehicles in South Asia...'
    },{
      id: 9,
      profileImage: interImg,
      title: 'Peace, dignity and equality on a healthy planet',
      image: '/api/placeholder/400/250',
      date: '24 Oct, 2021',
      author: 'Rahul Dev',
      category: 'Automotive',
      excerpt: 'How sustainable vehicles are changing transportation paradigms...'
    },
    {
      id: 10,
      profileImage: interImg,
      title: 'Peace, dignity and equality on a healthy planet',
      image: '/api/placeholder/400/250',
      date: '24 Oct, 2021',
      author: 'Zainab Fatima',
      category: 'Environment',
      excerpt: 'Climate initiatives that are making a real difference...'
    }
  ];

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(post => post.category === activeCategory);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bg-gray-50 font-jakarta min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar and mobile menu code here */}
     {/* Mobile menu overlay */}
     {mobileMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
              <div className="absolute top-0 right-0 h-full w-64 bg-white shadow-lg p-4" onClick={e => e.stopPropagation()}>
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
        
            
            <BaseCard height='h-[400px]' boxShadow={false} bgColor='bg-gray' className=' sticky top-[5.5rem] z-1'>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-1">
                {categories.map(category => (
                  <li key={category.name}>
                    <button
                      onClick={() => setActiveCategory(category.name)}
                      className={`flex items-center   justify-between w-full py-2.5 px-4 rounded-lg transition ${
                        activeCategory === category.name 
                          ? 'bg-indigo-50 text-indigo-700 font-medium' 
                          : 'hover:bg-white'
                      }`}
                    >
                      <span className="flex items-center">
                        <Tag size={16} className="mr-2" />
                        {category.name}
                      </span>
                      <div className="flex items-center">
                        <span className="bg-Blue text-white  rounded-full text-xs px-2 py-1 mr-1">
                          {category.count}
                        </span>
                        
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </BaseCard>
          </div>
          <div className="lg:w-3/4">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentPosts.map(post => (
                <BaseCard
                boxShadow={false}
                  key={post.id}
                  width="w-full"
                  height="h-full"
                  bgColor="bg-gray"
                  padding="p-0"
                  className="overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative">
                    <img 
                      src={post.image}
                      alt={post.title} 
                      className="w-full h-52 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-Blue bg-opacity-90 text-white text-xs px-3 py-1.5 rounded-md">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-bold text-lg mb-3 hover:text-indigo-600 transition line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">{post.excerpt}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                      <div className="flex items-center">
                        <img 
                          src={post.profileImage}
                          alt={post.author}
                          className="w-10 h-10 rounded-full mr-3 border-2 border-gray-100 object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium">{post.author}</p>
                          <div className="flex items-center text-gray-500 text-xs">
                            <Calendar size={12} className="mr-1" />
                            {post.date}
                          </div>
                        </div>
                      </div>

                      <Button
                      to='/blogs/showblog'
                        iconRight={<ChevronRight size={16} />}
                        title="Read"
                        width="auto"
                        height="auto"
                        className="bg-Blue text-sm !px-3 py-3 transition-colors"
                      />
                    </div>
                  </div>
                </BaseCard>
              ))}
            </div>

            <div className="flex justify-center mt-8 mb-8">
              <div className="flex gap-4">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`bg-Blue text-white px-4 py-2 rounded-[10px] ${
                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
                  }`}
                >
                  <div className="flex justify-between gap-2 items-center">
                    <span>Previous</span>
                  </div>
                </button>

                {pageNumbers.map(number => (
                  <button
                    key={number}
                    onClick={() => goToPage(number)}
                    className={`px-4 py-2 rounded ${
                      currentPage === number
                        ? 'bg-Blue text-white'
                        : 'bg-white text-black hover:bg-Blue'
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`bg-Blue text-white px-4 py-2 rounded-[10px] ${
                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>Next</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
