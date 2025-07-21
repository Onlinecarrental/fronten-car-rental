import React, { useEffect, useState } from 'react';
import { useChat } from '../../../modules/chat/useChat';
import { getCustomerNameById } from '../../../modules/chat/chatUtils';

export default function AgentChat() {
    // Assume agent info is stored in localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const { chats, messages, setActiveChatId, send, activeChatId, loading, error } = useChat({
        userId: user?.uid,
        role: 'agent',
        isAdmin: false
    });
    const [search, setSearch] = useState('');
    const [customerNames, setCustomerNames] = useState({});

    // Set the first chat as active by default
    useEffect(() => {
        if (chats.length > 0 && !activeChatId) {
            setActiveChatId(chats[0]._id);
        }
    }, [chats, activeChatId, setActiveChatId]);

    // Filter chats by search
    const filteredChats = chats.filter(chat => {
        const name = chat.customerName || chat.userId || '';
        return name.toLowerCase().includes(search.toLowerCase());
    });

    useEffect(() => {
        // Find userIds that need fetching
        const missing = filteredChats
            .filter(chat => !chat.customerName && chat.userId && !customerNames[chat.userId])
            .map(chat => chat.userId);

        if (missing.length > 0) {
            missing.forEach(async (userId) => {
                const name = await getCustomerNameById(userId);
                if (name) {
                    setCustomerNames(prev => ({ ...prev, [userId]: name }));
                }
            });
        }
    }, [filteredChats, customerNames]);

    const activeChat = filteredChats.find(c => c._id === activeChatId);
    const headerName = activeChat?.customerName || customerNames[activeChat?.userId] || 'Customer Name';

    return (
        <div className="w-full h-[80vh] flex bg-white rounded-lg shadow overflow-hidden font-jakarta">
            {/* Sidebar: Chat List */}
            <div className="w-[340px] min-w-[260px] border-r bg-gray-100 flex flex-col">
                <div className="p-4 border-b font-bold text-lg flex items-center">Messages</div>
                <div className="p-3">
                    <input
                        type="text"
                        placeholder="SEARCH THE MESSAGE"
                        className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 px-2 pb-2">
                    {filteredChats.map(chat => (
                        <div
                            key={chat._id}
                            onClick={() => setActiveChatId(chat._id)}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer shadow-sm mb-2 transition-all ${activeChatId === chat._id ? 'bg-gray-300' : 'bg-white hover:bg-gray-200'}`}
                        >
                            <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-xl">
                                {/* Placeholder avatar */}
                                {chat.customerName ? chat.customerName[0] : 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold truncate">{chat.customerName || customerNames[chat.userId] || 'Customer Name'}</div>
                                <div className="text-xs text-gray-500 truncate">{chat.lastMessage?.text || 'No messages yet'}</div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-xs text-gray-400">{chat.lastMessage?.createdAt ? new Date(chat.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                                {chat.unreadCount > 0 && <span className="w-3 h-3 bg-red-500 rounded-full mt-1"></span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-4 bg-gray-300 p-4 border-b">
                    <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-2xl">
                        {headerName[0] || 'U'}
                    </div>
                    <div className="font-semibold text-lg">
                        {headerName}
                    </div>
                </div>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 bg-white flex flex-col gap-4">
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div className="text-red-500">{error.message || error.toString()}</div>
                    ) : messages.length === 0 ? (
                        <div className="text-gray-400 text-center mt-10">No messages yet</div>
                    ) : (
                        messages.map(msg => (
                            <div key={msg._id} className={`flex ${msg.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs px-4 py-2 rounded-lg shadow ${msg.senderId === user?.uid ? 'bg-gray-300' : 'bg-gray-200'}`}>
                                    <div className="text-base font-medium mb-1">{msg.senderId !== user?.uid && msg.senderName ? msg.senderName : ''}</div>
                                    <div className="text-lg">{msg.text}</div>
                                    <div className="text-xs text-right text-gray-500 mt-1">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {/* Input */}
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        const text = e.target.elements.message.value;
                        if (text) {
                            send(text);
                            e.target.reset();
                        }
                    }}
                    className="flex items-center gap-2 p-4 bg-gray-300 border-t"
                >
                    <input
                        name="message"
                        type="text"
                        placeholder="SEARCH THE MESSAGE"
                        autoComplete="off"
                        className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring"
                    />
                    <button type="submit" className="px-6 py-2 rounded-full bg-gray-500 text-white font-semibold hover:bg-gray-700 transition-colors">Send</button>
                </form>
            </div>
        </div>
    );
} 