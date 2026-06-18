import { useContext } from 'react';
import { ChatContext } from '../app/providers/ChatPanelProvider';
import type { ChatContextType } from '../app/providers/ChatPanelProvider';

export function useChatPanel(): ChatContextType {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatPanel must be used within a ChatPanelProvider');
  }
  return context;
}
