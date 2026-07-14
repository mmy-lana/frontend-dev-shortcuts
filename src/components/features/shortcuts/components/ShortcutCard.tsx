import React from 'react';
import type { Shortcut } from '../types';
import { Card } from '../../../ui/Card';
import { Kbd } from '../../../ui/Kbd';
import { getLocalizedKeys, type OS } from '../../../../utils/os';

interface ShortcutCardProps {
  shortcut: Shortcut;
  os: OS;
}

export const ShortcutCard: React.FC<ShortcutCardProps> = ({ shortcut, os }) => {
  // Feed keysString, selected OS state, and the explicit Mac override to the parser
  const keyTokens = getLocalizedKeys(shortcut.keys, os, shortcut.mac);

  return (
    <Card className="flex flex-col justify-between group h-full">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span 
            className="w-2.5 h-2.5 rounded-full" 
            style={{ backgroundColor: shortcut.appColor || '#6366f1' }}
          />
          <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-300 transition-colors">
            {shortcut.appName}
          </span>
        </div>
        <p className="text-sm font-medium text-slate-200 leading-relaxed">
          {shortcut.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1 pt-3 border-t border-slate-800/60 mt-auto">
        {keyTokens.map((token, index) => {
          if (token === '+') {
            return (
              <span key={index} className="text-xs text-slate-600 font-bold px-0.5">
                +
              </span>
            );
          }
          return (
            <Kbd key={index} className="group-hover:border-indigo-500/50 group-hover:bg-slate-800/85 transition-all">
              {token}
            </Kbd>
          );
        })}
      </div>
    </Card>
  );
};