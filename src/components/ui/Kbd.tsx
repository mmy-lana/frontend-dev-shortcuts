import React from 'react';
import { cn } from '../../utils/cn';

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Kbd: React.FC<KbdProps> = ({ children, className, ...props }) => {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center min-w-[24px]',
        'px-2 py-1 text-xs font-semibold font-mono leading-none',
        'text-slate-200 bg-slate-800 border border-slate-700 border-b-3 border-b-slate-900 rounded-md',
        'shadow-md select-none transform active:translate-y-[1px] active:border-b',
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
};