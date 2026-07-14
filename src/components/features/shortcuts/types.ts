export type Category = 'All' | 'VS Code' | 'Chrome DevTools' | 'React DevTools' | 'Vite & Build' | 'Git';

export interface ShortcutRaw {
  keys: string;
  mac?: string; // Optional raw override from json
  description: string;
}

export interface ApplicationRaw {
  name: string;
  color: string;
  description: string;
  shortcuts: ShortcutRaw[];
}

export interface Shortcut {
  id: string;
  keys: string;
  mac?: string; // Optional raw override
  description: string;
  appKey: string;
  appName: string;
  appColor: string;
}