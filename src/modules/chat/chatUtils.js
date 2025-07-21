// Helper functions for chat module

// Check if a user is a participant in a chat
export function isParticipant(chat, userId) {
    return chat.participants && chat.participants.includes(userId);
}

// Format a message timestamp
export function formatTimestamp(ts) {
    const date = new Date(ts);
    return date.toLocaleString();
}

// Filter chats for a user
export function filterChatsForUser(chats, userId) {
    return chats.filter(chat => isParticipant(chat, userId));
} 