
'use client';

import * as React from 'react';
import { cn } from './utils';
import { X, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ReactifyButton } from './button';
import { ReactifyBadge } from './badge';
import { ReactifyInput } from './input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';

export interface MultiSelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface ReactifyMultiSelectProps {
  options: MultiSelectOption[];
  selected: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  placeholder?: string;
}

export function ReactifyMultiSelect({
  options,
  selected,
  onChange,
  className,
  placeholder = "Select options...",
}: ReactifyMultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleUnselect = (item: string) => {
    onChange(selected.filter((s) => s !== item));
  };

  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ReactifyButton
          variant="outline"
          size="lg"
          className={cn("w-full h-full min-h-10 justify-between font-normal", className)}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <div className="flex gap-1.5 flex-wrap">
            {selected.length > 0 ? (
              options
                .filter((option) => selected.includes(option.value))
                .map((option) => (
                  <ReactifyBadge
                    key={option.value}
                    variant="secondary"
                    className="mr-1"
                  >
                    {option.label}
                    <span
                      role="button"
                      tabIndex={0}
                      className="ml-1.5 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleUnselect(option.value);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleUnselect(option.value);
                      }}
                      aria-label={`Remove ${option.label}`}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </span>
                  </ReactifyBadge>
                ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </ReactifyButton>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
         <div className="p-2 border-b">
            <ReactifyInput
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9"
            />
        </div>
        <ScrollArea className="max-h-72">
            <div role="listbox" className="p-1">
                {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                        <div
                            key={option.value}
                            role="option"
                            aria-selected={selected.includes(option.value)}
                            className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted cursor-pointer"
                            onClick={() => {
                                const isSelected = selected.includes(option.value);
                                if (isSelected) {
                                    onChange(selected.filter((s) => s !== option.value));
                                } else {
                                    onChange([...selected, option.value]);
                                }
                            }}
                        >
                            <Checkbox
                                id={`multi-select-${option.value}`}
                                checked={selected.includes(option.value)}
                                readOnly
                                aria-label={option.label}
                                className="h-4 w-4"
                            />
                            {option.icon && <span className="text-muted-foreground">{option.icon}</span>}
                            <label
                                htmlFor={`multi-select-${option.value}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                            >
                                {option.label}
                            </label>
                        </div>
                    ))
                ) : (
                    <div className="p-2 text-center text-sm text-muted-foreground">
                        No results found.
                    </div>
                )}
            </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
