import React from 'react';
import { useShortcuts } from './components/features/shortcuts/hooks/useShortcuts';
import { SearchBar } from './components/features/shortcuts/components/SearchBar';
import { CategoryFilter } from './components/features/shortcuts/components/CategoryFilter';
import { ShortcutList } from './components/features/shortcuts/components/ShortcutList';
import { Keyboard, Flame, Eye, EyeOff } from 'lucide-react'; // Added Eye icons
import type { OS } from './utils/os';

export default function App() {
  const { 
    query, 
    setQuery, 
    activeCategory, 
    setActiveCategory, 
    coreCategories, 
    extendedCategories, 
    showExtended, 
    setShowExtended, 
    shortcuts, 
    os, 
    setOs 
  } = useShortcuts();

  // Safely toggles extended workspaces and resets categories if closed
  const handleToggleExtended = () => {
    if (showExtended) {
      const isCurrentlyExtended = extendedCategories.some(c => c.key === activeCategory);
      if (isCurrentlyExtended) {
        setActiveCategory('All');
      }
    }
    setShowExtended(!showExtended);
  };

  // Compile active categories list based on UI visibility settings
  const displayedCategories = React.useMemo(() => {
    const base = [{ key: 'All', name: 'All' }, ...coreCategories];
    return showExtended ? [...base, ...extendedCategories] : base;
  }, [coreCategories, extendedCategories, showExtended]);

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-950/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-950/10 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <header className="border-b border-slate-900/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-600/10 rounded-lg border border-indigo-500/25">
              <Keyboard className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white uppercase">
                Dev Shortcuts
              </span>
              <span className="text-xs block text-slate-500 font-mono -mt-1">
                Unified Cheat Sheet
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              {(['Windows', 'macOS', 'Linux'] as OS[]).map((platform) => (
                <button
                  key={platform}
                  onClick={() => setOs(platform)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-all cursor-pointer ${
                    os === platform
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <section className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4">
            <Flame className="w-3.5 h-3.5" /> Core Dev Environment Mode
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2 leading-none">
            Unified Keyboard Reference
          </h1>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            Prioritized tools for Frontend and Software Engineering workflows.
          </p>
        </section>

        <SearchBar value={query} onChange={setQuery} />
        
        {/* Render dynamically compiled category selection list */}
        <CategoryFilter 
          categories={displayedCategories} 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
        />

        {/* Dynamic toggle switch button to show/hide extended workspace categories */}
        <div className="flex justify-center -mt-3 mb-8">
          <button
            onClick={handleToggleExtended}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/20 border border-indigo-900/30 rounded-full hover:bg-indigo-900/30 hover:text-indigo-300 hover:border-indigo-500/30 transition-all cursor-pointer"
          >
            {showExtended ? (
              <>
                <EyeOff className="w-3.5 h-3.5" /> Hide Productivity & Design Apps
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" /> Show Productivity & Design Apps ({extendedCategories.length} more)
              </>
            )}
          </button>
        </div>

        <ShortcutList shortcuts={shortcuts} os={os} />
      </main>
    </div>
  );
}