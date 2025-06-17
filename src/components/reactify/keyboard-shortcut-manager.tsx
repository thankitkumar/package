
'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { useKeyboardShortcuts, type Shortcut } from '@/contexts/keyboard-shortcut-context';
import { ReactifyModal } from './modal';
import { ReactifyInput } from './input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from './utils';
import { Command, Search } from 'lucide-react';

const IS_MAC = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

function formatShortcutKeysDisplay(keys: string[], macKeys?: string[]): string {
  const effectiveKeys = (IS_MAC && macKeys) ? macKeys : keys;
  // Helper function to map key names to symbols or more readable text
  const mapKey = (key: string): string => {
    if (key.toLowerCase() === 'meta') return IS_MAC ? '⌘' : 'Ctrl';
    if (key.toLowerCase() === 'control') return IS_MAC ? '⌃' : 'Ctrl';
    if (key.toLowerCase() === 'alt') return IS_MAC ? '⌥' : 'Alt';
    if (key.toLowerCase() === 'shift') return IS_MAC ? '⇧' : 'Shift';
    if (key.toLowerCase() === 'escape') return 'Esc';
    if (key.toLowerCase() === 'enter') return 'Enter';
    if (key.toLowerCase() === 'arrowup') return '↑';
    if (key.toLowerCase() === 'arrowdown') return '↓';
    if (key.toLowerCase() === 'arrowleft') return '←';
    if (key.toLowerCase() === 'arrowright') return '→';
    return key.length === 1 ? key.toUpperCase() : key;
  };

  // Order: Meta/Ctrl, Shift, Alt, main key
  const order = ['Meta', 'Control', 'Shift', 'Alt'];
  const sortedModifiers = effectiveKeys
    .filter(k => order.includes(k))
    .sort((a, b) => order.indexOf(a) - order.indexOf(b));
  const mainKey = effectiveKeys.find(k => !order.includes(k));
  
  const displayKeys = [...sortedModifiers, mainKey].filter(Boolean).map(mapKey);

  return displayKeys.join(IS_MAC && displayKeys.some(k => k === '⌘') ? '' : (IS_MAC ? ' ' : '+'));
}


export function KeyboardShortcutManager() {
  const { shortcuts, isPaletteOpen, closePalette } = useKeyboardShortcuts();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);


  const filteredShortcuts = useMemo(() => 
    shortcuts.filter(
      s => !s.disabled && (s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (s.group && s.group.toLowerCase().includes(searchTerm.toLowerCase())) ||
           formatShortcutKeysDisplay(s.keys, s.macKeys).toLowerCase().includes(searchTerm.toLowerCase()))
    ).sort((a,b) => (a.group || "ZZZ").localeCompare(b.group || "ZZZ") || a.name.localeCompare(b.name)),
    [shortcuts, searchTerm]
  );

  useEffect(() => {
    if (isPaletteOpen) {
      inputRef.current?.focus();
      setSearchTerm(''); // Clear search on open
      setActiveIndex(0);
    }
  }, [isPaletteOpen]);
  
  useEffect(() => {
    setActiveIndex(0); // Reset active index when search term changes
  }, [searchTerm]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, filteredShortcuts.length);
  }, [filteredShortcuts]);

  useEffect(() => {
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem && scrollContainerRef.current) {
        const scrollContainer = scrollContainerRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
            const { offsetTop, offsetHeight } = activeItem;
            const { scrollTop, clientHeight } = scrollContainer;

            if (offsetTop < scrollTop) {
                scrollContainer.scrollTop = offsetTop;
            } else if (offsetTop + offsetHeight > scrollTop + clientHeight) {
                scrollContainer.scrollTop = offsetTop + offsetHeight - clientHeight;
            }
        }
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleKeyDownInPalette = (event: KeyboardEvent) => {
      if (!isPaletteOpen) return;

      // Let these events bubble up if focus is not on the input field itself.
      // If focus is on the input, some keys like arrows should be handled by input.
      const isInputFocused = document.activeElement === inputRef.current;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex(prev => (prev + 1) % (filteredShortcuts.length || 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex(prev => (prev - 1 + (filteredShortcuts.length || 1)) % (filteredShortcuts.length || 1));
      } else if (event.key === 'Enter') {
        if (!isInputFocused || filteredShortcuts.length > 0) { // Allow enter if input focused but results exist
            event.preventDefault();
            const activeShortcut = filteredShortcuts[activeIndex];
            if (activeShortcut && !activeShortcut.disabled) {
            activeShortcut.action(event); // Execute action
            closePalette();
            }
        }
      } else if (event.key === 'Escape') {
         event.preventDefault();
         closePalette();
      }
    };

    // Add listener when palette is open, remove when closed or component unmounts
    if (isPaletteOpen) {
        document.addEventListener('keydown', handleKeyDownInPalette, true); // Use capture phase for Esc
    }
    return () => {
        document.removeEventListener('keydown', handleKeyDownInPalette, true);
    };
  }, [isPaletteOpen, filteredShortcuts, activeIndex, closePalette]);


  if (!isPaletteOpen) {
    return null;
  }
  
  const groupedShortcuts: Record<string, Shortcut[]> = {};
  filteredShortcuts.forEach(s => {
    const groupName = s.group || 'General';
    if (!groupedShortcuts[groupName]) {
        groupedShortcuts[groupName] = [];
    }
    groupedShortcuts[groupName].push(s);
  });


  return (
    <ReactifyModal
      isOpen={isPaletteOpen}
      onClose={closePalette}
      title={null} // No title, more like command palette
      className="!p-0 max-w-xl shadow-2xl" // Remove padding, command palette style
      id="keyboard-shortcut-palette"
    >
      <div className="flex items-center border-b border-border px-3">
        <Search className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
        <ReactifyInput
          ref={inputRef}
          type="text"
          placeholder="Type a command or search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-12 text-base border-none focus-visible:ring-0 shadow-none bg-transparent px-0"
          aria-label="Search commands and shortcuts"
        />
      </div>
      <ScrollArea className="max-h-[calc(70vh-50px)] min-h-[100px]" ref={scrollContainerRef}>
        {Object.keys(groupedShortcuts).length === 0 && searchTerm && (
            <p className="text-center text-muted-foreground py-8 text-sm">No results found for "{searchTerm}".</p>
        )}
        {Object.keys(groupedShortcuts).length === 0 && !searchTerm && (
            <p className="text-center text-muted-foreground py-8 text-sm">No shortcuts registered or available.</p>
        )}
        {Object.entries(groupedShortcuts).map(([groupName, groupShortcuts], groupIndex) => (
            <div key={groupName} className="p-2">
                <h3 className="text-xs font-medium text-muted-foreground px-2 mb-1 mt-1 first:mt-0 tracking-wide">{groupName}</h3>
                 {groupShortcuts.map((shortcut, indexInGroup) => {
                    let globalIndex = 0;
                    Object.values(groupedShortcuts).slice(0, groupIndex).forEach(grp => globalIndex += grp.length);
                    globalIndex += indexInGroup;

                    return (
                        <button
                        key={shortcut.id}
                        ref={el => itemRefs.current[globalIndex] = el}
                        onClick={() => {
                            if (!shortcut.disabled) {
                                shortcut.action(new KeyboardEvent('keydown'));
                                closePalette();
                            }
                        }}
                        disabled={shortcut.disabled}
                        className={cn(
                            "w-full text-left p-2.5 rounded-md flex justify-between items-center text-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:bg-accent focus:text-accent-foreground",
                            globalIndex === activeIndex && "bg-accent text-accent-foreground",
                            shortcut.disabled && "opacity-50 cursor-not-allowed"
                        )}
                        aria-current={globalIndex === activeIndex}
                        >
                        <span className="truncate">{shortcut.name}</span>
                        <div className="flex space-x-1 flex-shrink-0 ml-4">
                            {formatShortcutKeysDisplay(shortcut.keys, shortcut.macKeys)
                            .split(IS_MAC && formatShortcutKeysDisplay(shortcut.keys, shortcut.macKeys).includes('⌘') ? /(⌘|⇧|⌥|⌃)/ : /\+/)
                            .filter(Boolean) // Remove empty strings from split if keys are adjacent
                            .map((keyPart, i, arr) => {
                                let displayPart = keyPart;
                                // Handle cases like "CmdK" -> "Cmd", "K"
                                if (IS_MAC && keyPart.length > 1 && keyPart.match(/^(⌘|⇧|⌥|⌃).+/)) {
                                   displayPart = keyPart[0]; // First char is the symbol
                                   const rest = keyPart.substring(1);
                                   return (
                                     <>
                                       <kbd key={`${i}-symbol`} className="px-1.5 py-0.5 text-xs font-sans font-medium text-muted-foreground bg-muted border border-border rounded-sm">
                                         {displayPart}
                                       </kbd>
                                       {rest && <kbd key={`${i}-rest`} className="px-1.5 py-0.5 text-xs font-sans font-medium text-muted-foreground bg-muted border border-border rounded-sm">{rest}</kbd>}
                                     </>
                                   );
                                }
                                return (
                                  <kbd key={i} className="px-1.5 py-0.5 text-xs font-sans font-medium text-muted-foreground bg-muted border border-border rounded-sm">
                                    {displayPart}
                                  </kbd>
                                );
                            })}
                        </div>
                        </button>
                    );
                 })}
            </div>
        ))}
      </ScrollArea>
       <div className="text-xs text-muted-foreground p-2 border-t border-border flex items-center justify-start gap-2">
            <span>Navigate: <kbd className="px-1 py-0.5 text-xs font-sans bg-muted border rounded-sm">↑</kbd> <kbd className="px-1 py-0.5 text-xs font-sans bg-muted border rounded-sm">↓</kbd></span>
            <span>Select: <kbd className="px-1 py-0.5 text-xs font-sans bg-muted border rounded-sm">Enter</kbd></span>
            <span>Close: <kbd className="px-1 py-0.5 text-xs font-sans bg-muted border rounded-sm">Esc</kbd></span>
        </div>
    </ReactifyModal>
  );
}

