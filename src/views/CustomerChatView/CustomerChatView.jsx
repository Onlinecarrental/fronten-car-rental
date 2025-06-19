import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import io from 'socket.io-client';
import { auth } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

const API_URL = 'http://localhost:5000/api';
let socket;

const CustomerChatView = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [chatId, setChatId] = useState(localStorage.getItem('activeChatId'));
    const [agentInfo, setAgentInfo] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const messagesEndRef = useRef(null);

    // Listen for auth state changes from Firebase
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log("Firebase auth user:", user ? user.uid : "No user");
        });

        return () => unsubscribe();
    }, []);

    // Get userId from Firebase auth or localStorage fallback
    const userId = currentUser?.uid || localStorage.getItem('userId');
    const userName = currentUser?.displayName || localStorage.getItem('userName') || 'Customer';

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
            setMessages(prevMessages => [...prevMessages, message]);
        });

        // Listen for typing events
        socket.on('user_typing', (user) => {
            if (user !== userName) {
                setIsTyping(true);
            }
        });

        // Listen for stop typing events
        socket.on('user_stop_typing', (user) => {
            if (user !== userName) {
                setIsTyping(false);
            }
        });

        return () => {
            socket.off('new_message');
            socket.off('user_typing');
            socket.off('user_stop_typing');
        };
    }, [userName]);

    // Join chat room on chat selection
    useEffect(() => {
        if (!socket || !chatId) return;

        socket.emit('join_chat', chatId);

        return () => {
            socket.emit('leave_chat', chatId);
        };
    }, [chatId]);

    // Load chat details and messages
    useEffect(() => {
        if (!chatId) {
            setLoading(false);
            return;
        }

        const loadChat = async () => {
            try {
                // Get chat details
                const chatResponse = await axios.get(`${API_URL}/chats/${chatId}`);
                if (chatResponse.data.success) {
                    const chat = chatResponse.data.data;
                    setAgentInfo(chat.agentId);
                }

                // Get messages
                const messagesResponse = await axios.get(`${API_URL}/chats/${chatId}/messages`);
                if (messagesResponse.data.success) {
                    setMessages(messagesResponse.data.data);
                }

                // Mark messages as read
                await axios.put(`${API_URL}/chats/messages/read`, {
                    chatId,
                    recipientType: 'user'
                });

                setLoading(false);
            } catch (error) {
                console.error('Error loading chat:', error);
                setLoading(false);
            }
        };

        loadChat();
    }, [chatId]);

    // Auto-scroll to the bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !chatId) return;

        try {
            const messageData = {
                chatId,
                senderId: userId,
                sender: 'user',
                text: newMessage
            };

            // Send message to server
            const response = await axios.post(`${API_URL}/chats/messages`, messageData);
            
            // Add message to local state
            setMessages(prev => [...prev, response.data.data]);
            
            // Clear input
            setNewMessage('');
            
            // Emit socket event
            if (socket) {
                socket.emit('send_message', response.data.data);
            }
            
            // Clear typing indicator
            socket.emit('stop_typing', { chatId, user: userName });
            clearTimeout(typingTimeout);
            
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        }
    };

    const handleTyping = () => {
        if (!socket || !chatId) return;

        socket.emit('typing', { chatId, user: userName });

        // Clear existing timeout
        if (typingTimeout) clearTimeout(typingTimeout);

        // Set new timeout
        const timeout = setTimeout(() => {
            socket.emit('stop_typing', { chatId, user: userName });
        }, 2000);

        setTypingTimeout(timeout);
    };

    const goBack = () => {
        navigate(-1);
    };

    if (!chatId) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">No Active Chat</h2>
                    <p className="text-gray-600 mb-6">You don't have any active chat sessions.</p>
                    <button
                        onClick={goBack}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={goBack}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <FaArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">
                                    Chat with Agent
                                </h1>
                                <p className="text-sm text-gray-600">
                                    {agentInfo ? agentInfo.name || 'Agent' : 'Connecting...'}
                                </p>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            {new Date().toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Container */}
            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="bg-white rounded-lg shadow-sm border">
                    {/* Messages */}
                    <div className="h-96 overflow-y-auto p-4">
                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="text-center text-gray-500 my-8">
                                <p className="mb-2">No messages yet</p>
                                <p className="text-sm">Start the conversation with your agent!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map(message => (
                                    <div
                                        key={message._id}
                                        className={`flex ${
                                            message.sender === 'user' ? 'justify-end' : 'justify-start'
                                        }`}
                                    >
                                        <div
                                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                                message.sender === 'user'
                                                    ? 'bg-blue-500 text-white'
                                                    : message.sender === 'system'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            <div className="text-sm font-medium mb-1">
                                                {message.sender === 'user' ? 'You' : 
                                                 message.sender === 'system' ? 'System' : 
                                                 agentInfo?.name || 'Agent'}
                                            </div>
                                            <div>{message.text}</div>
                                            <div className="text-xs mt-1 opacity-70">
                                                {new Date(message.createdAt).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                                            <div className="text-sm">Agent is typing...</div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Message Input */}
                    <form onSubmit={handleSendMessage} className="border-t p-4">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => {
                                    setNewMessage(e.target.value);
                                    handleTyping();
                                }}
                                placeholder="Type your message..."
                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerChatView; 