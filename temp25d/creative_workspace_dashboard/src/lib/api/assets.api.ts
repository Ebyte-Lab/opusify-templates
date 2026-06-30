import { Asset } from '../../types/asset.types';
import { mockAssets, mockDiscussions, DiscussionComment } from '../mock/assets.mock';
import { delay } from './client';
import { TeamMember } from '../../types/team.types';

let localAssets = [...mockAssets];
let localDiscussions = { ...mockDiscussions };

export const assetsApi = {
  getAll: async (): Promise<Asset[]> => {
    await delay(500);
    return [...localAssets];
  },

  getById: async (id: string): Promise<Asset | null> => {
    await delay(400);
    return localAssets.find(a => a.id === id) || null;
  },

  create: async (payload: Omit<Asset, 'id' | 'uploadedAt'>): Promise<Asset> => {
    await delay(600);
    const newAsset: Asset = {
      ...payload,
      id: `asset-${Date.now()}`,
      uploadedAt: new Date().toISOString()
    };
    localAssets.unshift(newAsset);
    localDiscussions[newAsset.id] = [];
    return newAsset;
  },

  update: async (id: string, payload: Partial<Asset>): Promise<Asset> => {
    await delay(400);
    const index = localAssets.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Asset not found');
    const updated = {
      ...localAssets[index],
      ...payload
    };
    localAssets[index] = updated;
    return updated;
  },

  delete: async (id: string): Promise<void> => {
    await delay(400);
    localAssets = localAssets.filter(a => a.id !== id);
    delete localDiscussions[id];
  },

  // Discussions API
  getDiscussions: async (assetId: string): Promise<DiscussionComment[]> => {
    await delay(300);
    return localDiscussions[assetId] || [];
  },

  postComment: async (
    assetId: string,
    text: string,
    user: TeamMember
  ): Promise<DiscussionComment> => {
    await delay(400);
    const newComment: DiscussionComment = {
      id: `comm-${Date.now()}`,
      user: user.name,
      role: user.role === 'admin' ? 'Admin' : 'Editor',
      text,
      avatar: user.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      timestamp: 'Just now'
    };

    if (!localDiscussions[assetId]) {
      localDiscussions[assetId] = [];
    }
    localDiscussions[assetId].push(newComment);
    return newComment;
  }
};
