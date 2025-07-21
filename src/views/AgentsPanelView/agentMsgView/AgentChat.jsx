import React, { useEffect } from 'react';
import { useChat } from '../../../modules/chat/useChat';

export default function AgentChat() {
    // Assume agent info is stored in localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const { chats, messages, setActiveChatId, send, activeChatId, loading, error } = useChat({
        userId: user?.uid,
        role: 'agent',
        isAdmin: false
    });

    // Set the first chat as active by default
    useEffect(() => {
        if (chats.length > 0 && !activeChatId) {
            setActiveChatId(chats[0]._id);
        }
    }, [chats, activeChatId, setActiveChatId]);

    return (
        <div className="chat-container">
            <h2>Agent Chat</h2>
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error.message || error.toString()}</div>}
            <div className="chat-list">
                {chats.map(chat => (
                    <button
                        key={chat._id}
                        onClick={() => setActiveChatId(chat._id)}
                        className={activeChatId === chat._id ? 'active' : ''}
                    >
                        Chat with Customer {chat.customerName || chat.userId}
                    </button>
                ))}
            </div>
            <div className="chat-messages">
                {messages.map(msg => (
                    <div key={msg._id} className={msg.senderId === user?.uid ? 'sent' : 'received'}>
                        <span>{msg.text}</span>
                        <span className="timestamp">{new Date(msg.createdAt).toLocaleString()}</span>
                    </div>
                ))}
            </div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    const text = e.target.elements.message.value;
                    if (text) {
                        send(text);
                        e.target.reset();
                    }
                }}
                className="chat-input"
            >
                <input name="message" type="text" placeholder="Type your message..." autoComplete="off" />
                <button type="submit">Send</button>
            </form>
        </div>
    );
} 