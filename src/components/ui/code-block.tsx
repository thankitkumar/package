
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ClipboardCopy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CodeBlockProps {
  code: string;
  className?: string;
  lang?: string;
  scrollAreaClassName?: string;
}

export function CodeBlock({ code, className, lang, scrollAreaClassName }: CodeBlockProps) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const lines = code.trimEnd().split('\n');

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      toast({ title: 'Copied!', description: 'Code copied to clipboard.' });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({ title: 'Error', description: 'Failed to copy code.', variant: 'destructive' });
    }
  };

  return (
    <div className={cn(
      "relative group bg-slate-900 text-slate-100 p-4 rounded-lg border border-slate-700 font-code text-sm shadow-lg",
      className
    )}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity z-10 text-slate-400 hover:text-slate-100 hover:bg-slate-700"
        onClick={handleCopy}
        aria-label="Copy code"
        disabled={!code}
      >
        {isCopied ? <Check className="h-4 w-4 text-green-400" /> : <ClipboardCopy className="h-4 w-4" />}
      </Button>
      <ScrollArea className={cn("w-full", scrollAreaClassName)}>
        <pre className={cn("p-0 m-0 bg-transparent", lang ? `language-${lang}` : '')}>
          <code className={cn("block", lang ? `language-${lang}` : '')}>
            {lines.map((line, index) => (
              <div key={index} className="flex leading-relaxed">
                <span className="inline-block w-10 shrink-0 pr-4 text-right text-slate-500 select-none">
                  {index + 1}
                </span>
                <span className="flex-1 whitespace-pre-wrap">
                  {line || ' '} {/* Render a space for empty lines to maintain height and structure */}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </ScrollArea>
    </div>
  );
}
