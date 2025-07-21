import axios from 'axios';

export const getUserChats = async (userId, role) => {
    // Use userId for customers, agentId for agents
    const param = role === 'customer' ? 'userId' : 'agentId';
    const res = await axios.get(`http://localhost:5000/api/chats?${param}=${userId}&role=${role}`);
    return res.data.data;
};

export const getAllChats = async () => {
    const res = await axios.get('http://localhost:5000/api/chats?role=admin');
    return res.data.data;
};

export const getChatMessages = async (chatId, userId, role) => {
    const res = await axios.get(`http://localhost:5000/api/chats/${chatId}/messages?userId=${userId}&role=${role}`);
    return res.data.data;
};

export const sendMessage = async (chatId, senderId, senderRole, text) => {
    const res = await axios.post('http://localhost:5000/api/chats/messages', {
        chatId, senderId, senderRole, text
    });
    return res.data.data;
}; 