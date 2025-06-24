
'use client';

import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';
import { ReactifyInput } from './input';
import { Loader2, Check } from 'lucide-react';

export interface AutocompleteSuggestion {
  [key: string]: any;
}

interface ReactifyAutocompleteProps<T extends AutocompleteSuggestion | string>
  extends Omit<ReactifyComponentProps, 'onChange'> {
  suggestions: T[];
  onValueChange: (value: string) => void;
  onSelect: (value: T | undefined) => void;
  value: string;
  labelKey?: keyof T;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export function ReactifyAutocomplete<T extends AutocompleteSuggestion | string>({
  suggestions,
  onValueChange,
  onSelect,
  value,
  labelKey,
  isLoading = false,
  placeholder = "Search...",
  disabled = false,
  className,
  ...props
}: ReactifyAutocompleteProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const getDisplayValue = useCallback((item: T): string => {
    if (typeof item === 'string') {
      return item;
    }
    if (labelKey && typeof item === 'object' && item !== null) {
      return item[labelKey] as string;
    }
    return '';
  }, [labelKey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (item: T) => {
    const displayValue = getDisplayValue(item);
    onValueChange(displayValue);
    onSelect(item);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((prevIndex) => {
          const newIndex = prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0;
          listRef.current?.children[newIndex]?.scrollIntoView({ block: 'nearest' });
          return newIndex;
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((prevIndex) => {
          const newIndex = prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1;
          listRef.current?.children[newIndex]?.scrollIntoView({ block: 'nearest' });
          return newIndex;
        });
        break;
      case 'Enter':
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          event.preventDefault();
          handleSelect(suggestions[activeIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setActiveIndex(-1);
        break;
      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
          setActiveIndex(-1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)} {...props}>
      <ReactifyInput
        ref={inputRef}
        value={value}
        onChange={(e) => {
          onValueChange(e.target.value);
          if (!isOpen) setIsOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls="autocomplete-list"
        aria-activedescendant={activeIndex >= 0 ? `autocomplete-item-${activeIndex}` : undefined}
      />
      {isLoading && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-spin" />}

      {isOpen && !disabled && (
        <ul
          id="autocomplete-list"
          ref={listRef}
          role="listbox"
          className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-card border border-border rounded-md shadow-lg"
        >
          {suggestions.length > 0 ? (
            suggestions.map((item, index) => {
              const displayValue = getDisplayValue(item);
              const isSelected = value === displayValue;
              return (
                <li
                  key={index}
                  id={`autocomplete-item-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={cn(
                    "cursor-pointer select-none relative py-2 pl-10 pr-4 text-sm text-foreground",
                    index === activeIndex ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                  )}
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent input blur
                    handleSelect(item);
                  }}
                >
                  {isSelected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Check className="h-4 w-4" />
                    </span>
                  ) : null}
                  {displayValue}
                </li>
              );
            })
          ) : (
            !isLoading && <li className="px-4 py-2 text-sm text-muted-foreground">No results found.</li>
          )}
        </ul>
      )}
    </div>
  );
}
