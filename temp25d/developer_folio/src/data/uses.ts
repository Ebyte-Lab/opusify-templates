import type { UsesCategory } from '../types';

export const usesData: UsesCategory[] = [
  {
    category: 'Development Setup',
    items: [
      { name: 'Neovim / VS Code', description: 'Fully customized editor using the GitHub Dark Default theme and custom keybindings.' },
      { name: 'Alacritty + Tmux', description: 'Blazing fast GPU-accelerated terminal emulator paired with tmux for session management.' },
      { name: 'Fish Shell', description: 'User-friendly shell with autosuggestions, tab completions, and custom prompts.' },
    ],
  },
  {
    category: 'Workstation Hardware',
    items: [
      { name: 'MacBook Pro 16" (M3 Max)', description: '36GB Unified Memory, 1TB SSD. The absolute workhorse for compiling Rust and local Docker staging.' },
      { name: 'Keychron Q1 Pro', description: 'Wireless custom mechanical keyboard with Gateron Brown tactile switches.' },
      { name: 'Dell UltraSharp 34" Curved', description: 'USB-C hub monitor providing massive horizontal space for multi-panel coding layouts.' },
    ],
  },
  {
    category: 'Software & Productivity',
    items: [
      { name: 'Docker Desktop', description: 'Essential tool for running PostgreSQL, Redis, and message queues in isolated environments.' },
      { name: 'Postman / Bruno', description: 'API client testing environments for verifying payload integrity and HTTP responses.' },
      { name: 'Raycast', description: 'Supercharged keystroke launcher on macOS replacing standard Spotlight Search.' },
    ],
  },
];
