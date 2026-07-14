import React from 'react';
import type { Shortcut } from '../types';
import { ShortcutCard } from './ShortcutCard';
import type { OS } from '../../../../utils/os';

interface ShortcutListProps {
  shortcuts: Shortcut[];
  os: OS; // Added required os prop
}

export const ShortcutList: React.FC<ShortcutListProps> = ({ shortcuts, os }) => {
  if (shortcuts.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-900/20 rounded-2xl border border-slate-800/40">
        <div className="text-4xl mb-3">⌨️</div>
        <h3 className="text-lg font-bold text-slate-300">No shortcuts found</h3>
        <p className="text-sm text-slate-500 mt-1">Try adjusting your search terms or filter selection.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {shortcuts.map((shortcut) => (
        <ShortcutCard key={shortcut.id} shortcut={shortcut} os={os} />
      ))}
    </div>
  );
};