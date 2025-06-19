import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const API_URL = 'http://localhost:5000/api';
let socket;

const AgentMsgView = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [activeChats, setActiveChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const agentId = localStorage.getItem('agentId');
    const agentName = localStorage.getItem('agentName') || 'Agent';

    // Initialize socket connection
    useEffect(() => {
        socket = io('http://localhost:5000');

        return () => {
            if (socket) socket.disconnect();
        };
    }, []);

    // Socket event listeners
    useEffect(() => {
        if (!socket) return;

        // Listen for new messages
        socket.on('new_message', (message) => {
            if (selectedChat && message.chatId === selectedChat._id) {
                setMessages(prevMessages => [...prevMessages, message]);

                // Mark message as read if it's from user
                if (message.sender === 'user') {
                    markMessageAsRead(selectedChat._id);
                }
            }

            // Refresh active chats to update last message
            fetchAgentChats();
        });

        // Listen for typing events
        socket.on('user_typing', (user) => {
            if (user !== agentName) {
                setIsTyping(true);
            }
        });

        // Listen for stop typing events
        socket.on('user_stop_typing', (user) => {
            if (user !== agentName) {
                setIsTyping(false);
            }
        });

        return () => {
            socket.off('new_message');
            socket.off('user_typing');
            socket.off('user_stop_typing');
        };
    }, [selectedChat, agentName]);

    // Join chat room on chat selection
    useEffect(() => {
        if (!socket || !selectedChat) return;

        socket.emit('join_chat', selectedChat._id);

        return () => {
            socket.emit('leave_chat', selectedChat._id);
        };
    }, [selectedChat]);

    // Fetch active chats for this agent
    const fetchAgentChats = async () => {
        if (!agentId) return;

        try {
            console.log('Fetching agent chats for:', agentId);
            
            // Real API call to get agent's chats
            const response = await axios.get(`${API_URL}/chats/agent/${agentId}`);
            
            if (response.data.success) {
                const chats = response.data.data;
                console.log('Real chats from API:', chats);
                
                // Sort chats by most recently updated
                const sortedChats = [...chats].sort((a, b) => 
                    new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
                );
                
                setActiveChats(sortedChats);
                
                // If there's no selected chat but we have chats, select the first one
                if (sortedChats.length > 0 && !selectedChat) {
                    setSelectedChat(sortedChats[0]);
                }
            }
        } catch (error) {
            console.error('Error fetching agent chats:', error);
        }
    };

    useEffect(() => {
        // Set a default agent ID if not set
        if (!agentId) {
            const defaultAgentId = 'agent-1'; // You can change this to a real agent ID
            localStorage.setItem('agentId', defaultAgentId);
            localStorage.setItem('agentName', 'Agent 1');
            window.location.reload();
            return;
        }
        
        fetchAgentChats();
    }, [agentId]);

    // Load messages for selected chat
    useEffect(() => {
        if (!selectedChat) return;

        setLoading(true);

        const fetchMessages = async () => {
            try {
                console.log('Fetching messages for chat:', selectedChat._id);
                
                // Real API call to get chat messages
                const response = await axios.get(`${API_URL}/chats/${selectedChat._id}/messages`);
                
                if (response.data.success) {
                    const messages = response.data.data;
                    console.log('Real messages from API:', messages);
                    setMessages(messages);
                }
                
                // Mark messages as read
                markMessageAsRead(selectedChat._id);
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [selectedChat]);

    // Auto-scroll to the bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const markMessageAsRead = async (chatId) => {
        try {
            console.log('Marking messages as read for chat:', chatId);
            // Real API call to mark messages as read
            await axios.put(`${API_URL}/chats/messages/read`, {
                chatId,
                recipientType: 'agent'
            });
            
            if (socket && selectedChat) {
                socket.emit('stop_typing', { chatId: selectedChat._id, user: agentName });
            }
            clearTimeout(typingTimeout);
            setNewMessage('');
        } catch (error) {
            console.error('Error marking messages as read:', error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedChat) return;

        try {
            const messageData = {
                chatId: selectedChat._id,
                senderId: agentId,
                sender: 'agent',
                text: newMessage
            };

            // Send message to server
            const response = await axios.post(`${API_URL}/chats/messages`, messageData);
            
            if (response.data.success) {
                // Update local state with the new message
                setMessages(prev => [...prev, response.data.data]);
                
                // Update chat list to show the new message
                setActiveChats(prevChats => 
                    prevChats.map(chat => 
                        chat._id === selectedChat._id 
                            ? { 
                                ...chat, 
                                lastMessage: { 
                                    text: newMessage, 
                                    timestamp: new Date().toISOString(),
                                    sender: 'agent'
                                },
                                updatedAt: new Date().toISOString()
                            } 
                            : chat
                    )
                );
                
                // Clear input field
                setNewMessage('');
                
                // Emit socket event
                if (socket) {
                    socket.emit('send_message', response.data.data);
                }
            }
            
        } catch (error) {
            console.error('Error sending message:', error);
            // Show error to user
            alert('Failed to send message. Please try again.');
        }
    };

    const handleTyping = () => {
        if (!socket || !selectedChat) return;

        socket.emit('typing', { chatId: selectedChat._id, user: agentName });

        // Clear existing timeout
        if (typingTimeout) clearTimeout(typingTimeout);

        // Set new timeout
        const timeout = setTimeout(() => {
            socket.emit('stop_typing', { chatId: selectedChat._id, user: agentName });
        }, 2000);

        setTypingTimeout(timeout);
    };

    return (
        <div className="flex h-[calc(100vh-64px)]">
            {/* Chat list sidebar */}
            <div className="w-1/4 bg-gray-100 border-r border-gray-300 overflow-y-auto">
                <h2 className="p-4 font-bold text-lg border-b border-gray-300">Active Conversations</h2>
                <div className="divide-y divide-gray-300">
                    {activeChats.length === 0 ? (
                        <div className="p-4 text-gray-500">No active chats</div>
                    ) : (
                        activeChats.map(chat => (
                            <div
                                key={chat._id}
                                className={`p-4 cursor-pointer hover:bg-gray-200 ${selectedChat?._id === chat._id ? 'bg-gray-200' : ''}`}
                                onClick={() => setSelectedChat(chat)}
                            >
                                <div className="font-medium">
                                    User: {chat.userId && chat.userId.name ? chat.userId.name : 'Unknown User'}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {chat.lastMessage ?
                                        `${chat.lastMessage.text.substring(0, 20)}${chat.lastMessage.text.length > 20 ? '...' : ''}` :
                                        'No messages yet'
                                    }
                                </div>
                                <div className="text-xs text-gray-500">
                                    {chat.lastMessage ? new Date(chat.lastMessage.timestamp).toLocaleString() : ''}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat area */}
            <div className="w-3/4 flex flex-col">
                {selectedChat ? (
                    <>
                        {/* Chat header */}
                        <div className="p-4 border-b border-gray-300 bg-white">
                            <h2 className="font-bold">
                                Chat with {selectedChat.userId && selectedChat.userId.name ? selectedChat.userId.name : 'User'}
                            </h2>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                            {loading ? (
                                <div className="flex justify-center items-center h-full">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="text-center text-gray-500 my-4">No messages yet</div>
                            ) : (
                                <>
                                    {messages.map(message => (
                                        <div
                                            key={message._id}
                                            className={`max-w-[70%] mb-3 p-3 rounded-lg ${message.sender === 'agent'
                                                ? 'ml-auto bg-blue-500 text-white rounded-br-none'
                                                : 'mr-auto bg-gray-200 text-black rounded-bl-none'
                                                }`}
                                        >
                                            <div className="mb-1 text-xs opacity-70">
                                                {message.sender === 'agent' ? 'You' : (selectedChat.userId && selectedChat.userId.name) || 'User'}
                                            </div>
                                            <div>{message.text}</div>
                                            <div className="text-xs text-right mt-1 opacity-70">
                                                {new Date(message.createdAt).toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="max-w-[70%] mr-auto p-2 text-gray-500 text-sm">
                                            User is typing...
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </>
                            )}
                        </div>

                        {/* Message input */}
                        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-300 bg-white">
                            <div className="flex">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => {
                                        setNewMessage(e.target.value);
                                        handleTyping();
                                    }}
                                    className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Type your message..."
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gray-50">
                        <div className="text-center text-gray-500">
                            <p className="mb-4">Select a conversation to start chatting</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgentMsgView;
