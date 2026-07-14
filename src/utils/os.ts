export type OS = 'macOS' | 'Windows' | 'Linux';

export function getOS(): OS {
  if (typeof window === 'undefined') return 'Windows';
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.includes('mac')) return 'macOS';
  if (ua.includes('linux')) return 'Linux';
  return 'Windows';
}

export function getLocalizedKeys(keysString: string, os: OS, macOverride?: string): string[] {
  // Use the macOS override if on macOS and an explicit override is supplied
  const targetKeysString = (os === 'macOS' && macOverride) ? macOverride : keysString;
  const parts = targetKeysString.split(' ');
  
  return parts.map((part) => {
    const lower = part.toLowerCase().trim();
    if (lower === '+') return '+';
    
    if (os === 'macOS') {
      if (lower === 'ctrl') return '⌘ Cmd';      // Default Windows Ctrl translates to Cmd
      if (lower === 'control') return '⌃ Ctrl';  // Explicit macOS Control key mapping
      if (lower === 'alt') return '⌥ Opt';
      if (lower === 'shift') return '⇧ Shift';
      if (lower === 'windows') return '⌘ Cmd';
      if (lower === 'backspace') return '⌫';
      if (lower === 'enter') return '↩ Enter';
    } else {
      if (lower === 'ctrl' || lower === 'control') return 'Ctrl';
      if (lower === 'alt') return 'Alt';
      if (lower === 'shift') return 'Shift';
      if (lower === 'windows') return 'Win';
    }
    
    return part.charAt(0).toUpperCase() + part.slice(1);
  });
}