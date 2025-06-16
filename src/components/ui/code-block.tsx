
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
  scrollAreaClassName?: string; // New prop
}

export function CodeBlock({ code, className, lang, scrollAreaClassName }: CodeBlockProps) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

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
    <div className={cn("relative group bg-muted/30 p-4 rounded-md border font-code text-sm", className)}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        onClick={handleCopy}
        aria-label="Copy code"
        disabled={!code}
      >
        {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <ClipboardCopy className="h-4 w-4" />}
      </Button>
      <ScrollArea className={cn("max-h-[300px] w-full", scrollAreaClassName)}>
        <pre className={cn("whitespace-pre-wrap", lang ? `language-${lang}` : '')}>
          <code className={lang ? `language-${lang}` : ''}>{code}</code>
        </pre>
      </ScrollArea>
    </div>
  );
}
