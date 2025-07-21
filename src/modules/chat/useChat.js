import { useState, useEffect } from 'react';
import { getUserChats, getAllChats, getChatMessages, sendMessage } from './chatApi';

export function useChat({ userId, role, isAdmin }) {
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch chats
    useEffect(() => {
        setLoading(true);
        setError(null);
        if (isAdmin) {
            getAllChats().then(setChats).catch(setError).finally(() => setLoading(false));
        } else if (userId && role) {
            getUserChats(userId, role).then(setChats).catch(setError).finally(() => setLoading(false));
        }
    }, [userId, role, isAdmin]);

    // Fetch messages for active chat
    useEffect(() => {
        if (activeChatId) {
            setLoading(true);
            getChatMessages(activeChatId, userId, role)
                .then(setMessages)
                .catch(setError)
                .finally(() => setLoading(false));
        } else {
            setMessages([]);
        }
    }, [activeChatId, userId, role]);

    // Send message
    const send = async (text) => {
        if (!activeChatId || !userId) return;
        setLoading(true);
        try {
            await sendMessage(activeChatId, userId, role, text);
            const msgs = await getChatMessages(activeChatId, userId, role);
            setMessages(msgs);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        chats,
        messages,
        setActiveChatId,
        send,
        activeChatId,
        loading,
        error,
    };
} 