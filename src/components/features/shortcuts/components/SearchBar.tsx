import React, { useRef, useEffect } from 'react';
import { Search, Keyboard } from 'lucide-react';
import { Kbd } from '../../../ui/Kbd';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
        <Search className="w-5 h-5" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search shortcuts (e.g., search, command palette, re-run)..."
        className="w-full pl-12 pr-16 py-4 bg-slate-900/85 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-transparent transition-all duration-200 shadow-2xl shadow-indigo-950/20"
      />
      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
        <div className="hidden sm:flex items-center gap-1.5 opacity-65">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <Keyboard className="w-3.5 h-3.5" /> Press
          </span>
          <Kbd>/</Kbd>
        </div>
      </div>
    </div>
  );
};