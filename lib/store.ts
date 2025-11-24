"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Platform, platforms } from './utils';
import { uid } from './utils';

export type Account = {
  id: string;
  platform: Platform;
  name: string;
  connected: boolean;
};

export type Post = {
  id: string;
  caption: string;
  hashtags: string[];
  imagePrompt?: string;
  platforms: Platform[];
  scheduledAt?: string; // ISO
  status: 'draft' | 'scheduled' | 'posted' | 'failed';
  metrics: { likes: number; comments: number; shares: number };
};

type Store = {
  accounts: Account[];
  posts: Post[];
  addAccount: (platform: Platform, name: string) => void;
  toggleAccount: (id: string, connected: boolean) => void;
  createPost: (p: Omit<Post, 'id' | 'metrics' | 'status'> & Partial<Pick<Post, 'status'>>) => string;
  updatePost: (id: string, p: Partial<Post>) => void;
  runSchedulerTick: () => void;
  simulateEngagementTick: () => void;
};

export const useStore = create<Store>()(persist((set, get) => ({
  accounts: platforms.map((p, i) => ({ id: uid('acct'), platform: p, name: `${p} account`, connected: false })),
  posts: [],
  addAccount: (platform, name) => set(state => ({ accounts: [...state.accounts, { id: uid('acct'), platform, name, connected: true }] })),
  toggleAccount: (id, connected) => set(state => ({ accounts: state.accounts.map(a => a.id === id ? { ...a, connected } : a) })),
  createPost: (input) => {
    const id = uid('post');
    const post: Post = {
      id,
      caption: input.caption,
      hashtags: input.hashtags,
      imagePrompt: input.imagePrompt,
      platforms: input.platforms,
      scheduledAt: input.scheduledAt,
      status: input.status ?? (input.scheduledAt ? 'scheduled' : 'draft'),
      metrics: { likes: 0, comments: 0, shares: 0 },
    };
    set(state => ({ posts: [post, ...state.posts] }));
    return id;
  },
  updatePost: (id, p) => set(state => ({ posts: state.posts.map(x => x.id === id ? { ...x, ...p } : x) })),
  runSchedulerTick: () => {
    const now = Date.now();
    const toPost = get().posts.filter(p => p.status === 'scheduled' && p.scheduledAt && new Date(p.scheduledAt).getTime() <= now);
    if (toPost.length === 0) return;
    // simulate posting success
    set(state => ({
      posts: state.posts.map(p => {
        if (p.status === 'scheduled' && p.scheduledAt && new Date(p.scheduledAt).getTime() <= now) {
          return { ...p, status: 'posted' };
        }
        return p;
      })
    }));
  },
  simulateEngagementTick: () => {
    // randomly bump metrics for posted content
    set(state => ({
      posts: state.posts.map(p => {
        if (p.status !== 'posted') return p;
        const inc = () => (Math.random() < 0.4 ? 1 : 0);
        return {
          ...p,
          metrics: {
            likes: p.metrics.likes + inc(),
            comments: p.metrics.comments + (Math.random() < 0.1 ? 1 : 0),
            shares: p.metrics.shares + (Math.random() < 0.05 ? 1 : 0),
          }
        };
      })
    }));
  }
}), { name: 'agentic-social-store' }));
