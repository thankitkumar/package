
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export interface Shortcut {
  id: string; // Unique identifier for the shortcut
  name: string; // User-friendly name/description
  keys: string[]; // e.g., ['Control', 'k'] or ['Meta', 's'] (Generic definition)
  macKeys?: string[]; // Optional: Mac-specific keys, e.g., ['Meta', 'k'] (for Cmd+K)
  action: (event: KeyboardEvent) => void;
  group?: string; // Optional: for grouping in the palette
  disabled?: boolean; // To temporarily disable a shortcut
}

interface KeyboardShortcutContextType {
  shortcuts: Shortcut[];
  registerShortcut: (shortcut: Shortcut) => void;
  unregisterShortcut: (id: string) => void;
  isPaletteOpen: boolean;
  togglePalette: () => void;
  openPalette: () => void;
  closePalette: () => void;
}

const KeyboardShortcutContext = createContext<KeyboardShortcutContextType | undefined>(undefined);

const IS_MAC = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

export function KeyboardShortcutProvider({ children }: { children: ReactNode }) {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const registerShortcut = useCallback((shortcut: Shortcut) => {
    setShortcuts(prev => {
      if (prev.some(s => s.id === shortcut.id)) {
        // Allow re-registering to update a shortcut (e.g., if its action changes)
        return prev.map(s => s.id === shortcut.id ? shortcut : s);
      }
      return [...prev, shortcut];
    });
  }, []);

  const unregisterShortcut = useCallback((id: string) => {
    setShortcuts(prev => prev.filter(s => s.id !== id));
  }, []);

  const togglePalette = useCallback(() => setIsPaletteOpen(prev => !prev), []);
  const openPalette = useCallback(() => setIsPaletteOpen(true), []);
  const closePalette = useCallback(() => setIsPaletteOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Palette toggle: Ctrl+K or Cmd+K (if Mac)
      const isPaletteToggle = (IS_MAC ? event.metaKey : event.ctrlKey) && event.key.toLowerCase() === 'k' && !event.shiftKey && !event.altKey;

      if (isPaletteToggle) {
        event.preventDefault();
        togglePalette();
        return;
      }

      if (isPaletteOpen && event.key === 'Escape') {
        event.preventDefault();
        closePalette();
        return;
      }
      
      const activeElement = document.activeElement;
      const isInputFocused = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || (activeElement as HTMLElement).isContentEditable);
      
      if (isPaletteOpen) {
         const paletteElement = document.getElementById('keyboard-shortcut-palette');
         if (paletteElement && paletteElement.contains(activeElement)) {
             // If focus is inside palette's input, don't trigger global shortcuts (palette handles its own keys)
             return;
         }
      }


      shortcuts.forEach(shortcut => {
        if (shortcut.disabled) return;

        const keysToMatch = (IS_MAC && shortcut.macKeys) ? shortcut.macKeys : shortcut.keys;
        
        const mainKey = keysToMatch.find(k => !['Control', 'Meta', 'Alt', 'Shift'].includes(k));
        if (!mainKey || mainKey.toLowerCase() !== event.key.toLowerCase()) {
          return;
        }
        
        const controlPressed = keysToMatch.includes('Control') === event.ctrlKey;
        const metaPressed = keysToMatch.includes('Meta') === event.metaKey;
        const altPressed = keysToMatch.includes('Alt') === event.altKey;
        const shiftPressed = keysToMatch.includes('Shift') === event.shiftKey;

        if (controlPressed && metaPressed && altPressed && shiftPressed) {
           // Prevent most shortcuts from firing if an input field is focused,
           // unless it's a very common one like save (Cmd/Ctrl+S) or the palette toggle itself.
           if (isInputFocused) {
             const isSaveShortcut = (IS_MAC ? event.metaKey : event.ctrlKey) && event.key.toLowerCase() === 's';
             const isCopyShortcut = (IS_MAC ? event.metaKey : event.ctrlKey) && event.key.toLowerCase() === 'c';
             const isPasteShortcut = (IS_MAC ? event.metaKey : event.ctrlKey) && event.key.toLowerCase() === 'v';
             const isCutShortcut = (IS_MAC ? event.metaKey : event.ctrlKey) && event.key.toLowerCase() === 'x';
             const isUndoShortcut = (IS_MAC ? event.metaKey : event.ctrlKey) && event.key.toLowerCase() === 'z';
             const isRedoShortcut = (IS_MAC ? event.metaKey : event.ctrlKey) && (event.key.toLowerCase() === 'y' || (event.shiftKey && event.key.toLowerCase() === 'z'));


             if (!(isSaveShortcut || isCopyShortcut || isPasteShortcut || isCutShortcut || isUndoShortcut || isRedoShortcut)) {
               // console.log(`Shortcut "${shortcut.name}" prevented due to input focus.`);
               return;
             }
           }
          event.preventDefault();
          shortcut.action(event);
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts, isPaletteOpen, togglePalette, closePalette]);

  const contextValue = useMemo(() => ({
    shortcuts,
    registerShortcut,
    unregisterShortcut,
    isPaletteOpen,
    togglePalette,
    openPalette,
    closePalette,
  }), [shortcuts, registerShortcut, unregisterShortcut, isPaletteOpen, togglePalette, openPalette, closePalette]);

  return (
    <KeyboardShortcutContext.Provider value={contextValue}>
      {children}
    </KeyboardShortcutContext.Provider>
  );
}

export const useKeyboardShortcuts = (): KeyboardShortcutContextType => {
  const context = useContext(KeyboardShortcutContext);
  if (!context) {
    throw new Error('useKeyboardShortcuts must be used within a KeyboardShortcutProvider');
  }
  return context;
};
