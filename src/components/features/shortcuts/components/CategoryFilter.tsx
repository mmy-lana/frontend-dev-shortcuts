import React from 'react';
import { cn } from '../../../../utils/cn';

interface CategoryItem {
  key: string;
  name: string;
}

interface CategoryFilterProps {
  categories: CategoryItem[];
  activeCategory: string;
  onSelectCategory: (categoryKey: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2.5 mb-8">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.key;
        return (
          <button
            key={cat.key}
            onClick={() => onSelectCategory(cat.key)}
            className={cn(
              'px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer border',
              isActive
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-950/50'
                : 'bg-slate-900/90 border-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800/70 hover:border-slate-600'
            )}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
};