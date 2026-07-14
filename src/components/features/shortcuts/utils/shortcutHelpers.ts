import type { Shortcut } from '../types';

export const filterShortcuts = (
  shortcuts: Shortcut[],
  query: string,
  category: string
): Shortcut[] => {
  const normalizedQuery = query.toLowerCase().trim();

  return shortcuts.filter((shortcut) => {
    const matchesCategory = category === 'All' || shortcut.appKey === category;

    const matchesQuery =
      shortcut.description.toLowerCase().includes(normalizedQuery) ||
      shortcut.keys.toLowerCase().includes(normalizedQuery) ||
      shortcut.appName.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });
};