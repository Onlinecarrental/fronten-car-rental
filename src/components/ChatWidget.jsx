import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import io from 'socket.io-client';
import { auth } from '../firebase/config'; // Import Firebase auth
import { onAuthStateChanged } from 'firebase/auth';

const API_URL = 'http://localhost:5000/api';
let socket;

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [chatId, setChatId] = useState(null);
    const [agents, setAgents] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState(null);
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
    const userName = currentUser?.displayName || localStorage.getItem('userName') || 'User';

    // For debugging
    useEffect(() => {
        console.log("ChatWidget component mounted");
        console.log("User ID:", userId);
        console.log("User name:", userName);
    }, [userId, userName]);

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

    // Fetch available agents
    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await axios.get(`${API_URL}/chats/agents`);
                if (response.data.success) {
                    setAgents(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching agents:', error);
            }
        };

        fetchAgents();
    }, []);

    // Find or create a chat session when a user selects an agent
    useEffect(() => {
        if (!userId || !selectedAgent) return;

        setLoading(true);

        const loadOrCreateChat = async () => {
            try {
                const response = await axios.post(`${API_URL}/chats`, {
                    userId,
                    agentId: selectedAgent._id
                });

                if (response.data.success) {
                    setChatId(response.data.data._id);
                }
            } catch (error) {
                console.error('Error creating/loading chat:', error);
            } finally {
                setLoading(false);
            }
        };

        loadOrCreateChat();
    }, [userId, selectedAgent]);

    // Load messages for current chat
    useEffect(() => {
        if (!chatId) return;

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${API_URL}/chats/${chatId}/messages`);
                if (response.data.success) {
                    setMessages(response.data.data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching messages:', error);
                setLoading(false);
            }
        };

        fetchMessages();

        // Mark messages as read when chat is loaded
        const markMessagesAsRead = async () => {
            try {
                await axios.put(`${API_URL}/chats/messages/read`, {
                    chatId,
                    recipientType: 'user'
                });
            } catch (error) {
                console.error('Error marking messages as read:', error);
            }
        };

        markMessagesAsRead();
    }, [chatId]);

    // Auto-scroll to the bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !chatId) return;

        const messageData = {
            chatId,
            senderId: userId,
            sender: 'user',
            text: newMessage
        };

        // Emit message via socket
        socket.emit('send_message', messageData);

        // Clear typing indicator
        socket.emit('stop_typing', { chatId, user: userName });
        clearTimeout(typingTimeout);

        setNewMessage('');
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

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    // Always render the button, but check authentication for chat functionality
    return (
        <div className="fixed bottom-5 right-5 z-50">
            {/* Chat button */}
            <button
                onClick={userId ? toggleChat : () => alert("Please log in to use the chat")}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
            >
                {isOpen ? <FaTimes size={20} /> : <FaComments size={20} />}
            </button>

            {/* Chat window - only show if logged in and chat is open */}
            {userId && isOpen && (
                <div className="absolute bottom-16 right-0 w-96 h-[500px] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col border border-gray-300">
                    {/* Header */}
                    <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
                        <h3 className="font-bold">
                            {selectedAgent ? `Chat with ${selectedAgent.name || 'Agent'}` : 'Select an Agent'}
                        </h3>
                        <button onClick={toggleChat} className="text-white hover:text-gray-200">
                            <FaTimes size={16} />
                        </button>
                    </div>

                    {/* Agent selection or chat area */}
                    {!selectedAgent ? (
                        <div className="flex-1 overflow-y-auto p-4">
                            <h4 className="font-semibold mb-3">Choose an agent to chat with:</h4>
                            {agents.length === 0 ? (
                                <p className="text-gray-500">No agents available at the moment</p>
                            ) : (
                                <div className="space-y-2">
                                    {agents.map(agent => (
                                        <div
                                            key={agent._id}
                                            className="p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                                            onClick={() => setSelectedAgent(agent)}
                                        >
                                            <div className="font-medium">{agent.name || 'Agent'}</div>
                                            <div className="text-sm text-gray-600">{agent.email}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Messages */}
                            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                                {loading ? (
                                    <div className="flex justify-center items-center h-full">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div className="text-center text-gray-500 my-4">
                                        No messages yet. Start the conversation!
                                    </div>
                                ) : (
                                    <>
                                        {messages.map(message => (
                                            <div
                                                key={message._id}
                                                className={`max-w-[70%] mb-3 p-3 rounded-lg ${message.sender === 'user'
                                                    ? 'ml-auto bg-blue-500 text-white rounded-br-none'
                                                    : 'mr-auto bg-gray-200 text-black rounded-bl-none'
                                                    }`}
                                            >
                                                <div>{message.text}</div>
                                                <div className="text-xs text-right mt-1 opacity-70">
                                                    {new Date(message.createdAt).toLocaleString()}
                                                </div>
                                            </div>
                                        ))}
                                        {isTyping && (
                                            <div className="max-w-[70%] mr-auto p-2 text-gray-500 text-sm">
                                                Agent is typing...
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </>
                                )}
                            </div>

                            {/* Message input */}
                            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-300 bg-white">
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
                                        <FaPaperPlane />
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatWidget;