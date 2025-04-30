import React, { useState } from 'react';
import BaseCard from "../../../components/card"; // Adjust the import path as needed

const MsgDashboard = () => {
  // Sample message data with profile images
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Usman',
      content: 'hello',
      time: '07:30pm',
      unread: true,
      profileImg: '../src/assets/profile-modified.png' // Add profile image path
    },
    {
      id: 2,
      sender: 'Ali',
      content: 'hello',
      time: '07:00pm',
      unread: true,
      profileImg: '../src/assets/profile-modified.png' // Add profile image path
    },
    {
      id: 3,
      sender: 'Zain',
      content: 'hello',
      time: '06:10pm',
      unread: true,
      profileImg: '../src/assets/profile-modified.png' // Add profile image path
    }
  ]);

  // Function to handle marking a message as read
  const markAsRead = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? {...msg, unread: false} : msg
    ));
  };

  return (
    <BaseCard
      width="w-full"
      height="full"
      padding="p-6"
      className="mx-auto m-12 border"
    >
      <h1 className="text-center text-2xl font-bold mb-4">Messages</h1>
      
      <div className="space-y-3">
        {messages.map((message) => (
          <div 
            key={message.id}
            className="bg-gray rounded-lg p-3 flex justify-between items-center cursor-pointer hover:bg-gray transition-colors"
            onClick={() => markAsRead(message.id)}
          >
            <div className="flex items-center">
              {/* Image instead of div */}
              <div className="w-10 h-10 rounded-full mr-3 bg-white overflow-hidden">
                <img 
                  src={message.profileImg} 
                  alt={`${message.sender}'s profile`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/path/to/default-avatar.jpg"; // Fallback image
                  }}
                />
              </div>
              <div>
                <div className="font-medium">{message.sender}</div>
                <div className="text-sm">{message.content}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm mr-2">{message.time}</span>
              {message.unread && (
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                  2
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </BaseCard>
  );
};

export default MsgDashboard;