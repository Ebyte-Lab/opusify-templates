import { create } from 'zustand';
import { Workspace } from '../types/common.types';

interface WorkspaceStore {
  workspace: Workspace | null;
  plan: 'free' | 'pro' | 'team' | 'enterprise';
  setWorkspace: (ws: Workspace) => void;
  setPlan: (plan: 'free' | 'pro' | 'team' | 'enterprise') => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  workspace: {
    id: 'ws-1',
    name: 'Creative Canvas',
    slug: 'creative-canvas',
    defaultRole: 'editor',
    plan: 'pro'
  },
  plan: 'pro',
  setWorkspace: (workspace) => set({ workspace, plan: workspace.plan }),
  setPlan: (plan) => set((state) => ({
    plan,
    workspace: state.workspace ? { ...state.workspace, plan } : null
  }))
}));
