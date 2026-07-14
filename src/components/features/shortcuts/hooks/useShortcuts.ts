import { useState, useMemo } from 'react';
import type { Shortcut } from '../types';
import { getOS, type OS } from '../../../../utils/os';
import shortcutsData from '../../../../data/shortcuts.json';

// Core developer/engineer environments to prioritize on first load
const CORE_APP_KEYS = [
  'general',
  'file-explorer',
  'windows',
  'browser-microsoft-edge',
  'vimium',
  'visual-studio-code',
  'github-desktop',
  'obsidian-md',
  'wordpress',
  'git'
];

export const useShortcuts = () => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [os, setOs] = useState<OS>(() => getOS());
  const [showExtended, setShowExtended] = useState(false);

  // Parse raw JSON applications
  const { shortcuts, categories } = useMemo(() => {
    const rawApps = shortcutsData.applications;
    const shortcutList: Shortcut[] = [];
    const categoryList: { key: string; name: string; isCore: boolean }[] = [];

    Object.entries(rawApps).forEach(([appKey, app]) => {
      // 1. Declare isCore inside the loop scope
      const isCore = CORE_APP_KEYS.includes(appKey); 
      categoryList.push({ key: appKey, name: app.name, isCore });
      
      // 2. Cast shortcuts to inform the compiler of the optional 'mac' property
      const typedShortcuts = app.shortcuts as { keys: string; mac?: string; description: string }[];
      
      typedShortcuts.forEach((shortcut, idx) => {
        shortcutList.push({
          id: `${appKey}-${idx}`,
          keys: shortcut.keys,
          mac: shortcut.mac,
          description: shortcut.description,
          appKey,
          appName: app.name,
          appColor: app.color,
        });
      });
    });

    return { shortcuts: shortcutList, categories: categoryList };
  }, []);
	
  // Segment developer core categories from creative/productivity categories
  const { coreCategories, extendedCategories } = useMemo(() => {
    return {
      coreCategories: categories.filter((c) => c.isCore),
      extendedCategories: categories.filter((c) => !c.isCore),
    };
  }, [categories]);

  const filteredShortcuts = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return shortcuts.filter((s) => {
      const isAppCore = CORE_APP_KEYS.includes(s.appKey);
      
      // If activeCategory is 'All', load only Core apps by default (unless "showExtended" is toggled on)
      const matchesCategory =
        activeCategory === 'All'
          ? (showExtended ? true : isAppCore)
          : s.appKey === activeCategory;

      const matchesQuery =
        s.description.toLowerCase().includes(normalizedQuery) ||
        s.keys.toLowerCase().includes(normalizedQuery) ||
        s.appName.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [shortcuts, query, activeCategory, showExtended]);

  return {
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    coreCategories,
    extendedCategories,
    showExtended,
    setShowExtended,
    shortcuts: filteredShortcuts,
    os,
    setOs,
  };
};