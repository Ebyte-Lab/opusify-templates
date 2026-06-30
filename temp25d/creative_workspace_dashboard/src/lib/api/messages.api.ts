import { Conversation, Message } from '../../types/common.types';
import { mockConversations, mockMessages } from '../mock/messages.mock';
import { delay } from './client';
import { TeamMember } from '../../types/team.types';

let localConversations = [...mockConversations];
let localMessages = { ...mockMessages };

export const messagesApi = {
  getConversations: async (): Promise<Conversation[]> => {
    await delay(400);
    return [...localConversations];
  },

  getMessages: async (convId: string): Promise<Message[]> => {
    await delay(500);
    return localMessages[convId] || [];
  },

  sendMessage: async (convId: string, text: string, sender: TeamMember): Promise<Message> => {
    await delay(300);
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender,
      text,
      timestamp: new Date().toISOString(),
      reactions: []
    };

    if (!localMessages[convId]) {
      localMessages[convId] = [];
    }
    localMessages[convId].push(newMessage);

    // Update last message in conversation list
    const convIndex = localConversations.findIndex(c => c.id === convId);
    if (convIndex !== -1) {
      localConversations[convIndex] = {
        ...localConversations[convIndex],
        lastMessage: {
          text: `${sender.name.split(' ')[0]}: ${text}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      };
    }

    return newMessage;
  }
};
