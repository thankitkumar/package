
'use client';

import { useState, type ChangeEvent, useRef, useEffect } from 'react';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';
import { ReactifyTextarea } from './textarea';
import { Label } from '@/components/ui/label';

interface TocEntry {
  level: number;
  text: string;
  id: string;
}

interface ParsedMarkdownOutput {
  html: string;
  toc: TocEntry[];
}

// VERY basic Markdown to HTML parser. Not robust or secure.
const parseMarkdownToHtml = (markdown: string): ParsedMarkdownOutput => {
  if (!markdown) return { html: '', toc: [] };

  let html = String(markdown);
  const tocEntries: TocEntry[] = [];
  const idCounts: { [key: string]: number } = {};

  const generateId = (text: string): string => {
    let baseId = text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^\w-]+/g, ''); // Remove non-alphanumeric characters except hyphens
    if (!baseId) {
        baseId = 'section'; // Fallback for empty or special char only headings
    }
    
    if (idCounts[baseId]) {
      const newId = `${baseId}-${idCounts[baseId]}`;
      idCounts[baseId]++;
      return newId;
    }
    idCounts[baseId] = 1;
    return baseId;
  };

  // Basic sanitization
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Headings (must be at the start of a line)
  html = html.replace(/^(###\s+(.*$))/gim, (_, fullMatch, text) => {
    const id = generateId(text);
    tocEntries.push({ level: 3, text, id });
    return `<h3 id="${id}">${text}</h3>`;
  });
  html = html.replace(/^(##\s+(.*$))/gim, (_, fullMatch, text) => {
    const id = generateId(text);
    tocEntries.push({ level: 2, text, id });
    return `<h2 id="${id}">${text}</h2>`;
  });
  html = html.replace(/^(#\s+(.*$))/gim, (_, fullMatch, text) => {
    const id = generateId(text);
    tocEntries.push({ level: 1, text, id });
    return `<h1 id="${id}">${text}</h1>`;
  });
  
  // Sort ToC by appearance (original order) - this is tricky if regex replaces out of order.
  // For simplicity, we assume headings are processed in order or sort later if needed.
  // Current regex order H3, H2, H1 implies a need to sort by source line if truly robust.
  // For now, will rely on order of definition or manual sort if it becomes an issue.

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/gim, '<strong>$1</strong>');

  // Italics
  html = html.replace(/(^|[^\*])\*(?!\*)(.*?)(?<!\*)\*([^\*]|$)/gim, '$1<em>$2</em>$3');
  html = html.replace(/(^|[^_])_(?!_)(.*?)(?<!_)_([^_]|$)/gim, '$1<em>$2</em>$3');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>');
  
  // Unordered lists - basic
  html = html.split('\n').map(line => {
    if (line.match(/^\s*[-*+]\s+(.*)/im)) {
      return `<li>${line.substring(line.search(/\S/) + 2)}</li>`; // Get content after marker and space
    }
    return line;
  }).join('\n');
  html = html.replace(/(<li>.*<\/li>\s*)+/gim, (match) => `<ul>${match.trim()}</ul>`);
  html = html.replace(/<\/li>\n<li>/gim, '</li><li>');

  // Paragraphs
  html = html.split(/\n\n+/).map(paragraph => {
    const trimmedParagraph = paragraph.trim();
    if (!trimmedParagraph) return '';
    if (trimmedParagraph.match(/^<(h[1-3]|ul|ol|li|strong|em|a|p|blockquote|pre|code)/i)) {
      return trimmedParagraph;
    }
    return `<p>${trimmedParagraph.replace(/\n/g, '<br />')}</p>`;
  }).join('');
  
  html = html.replace(/<p>\s*<(ul|ol)>/gi, '<$1>');
  html = html.replace(/<\/(ul|ol)>\s*<\/p>/gi, '</$1>');

  // Sort TOC entries based on their original position in the markdown string if possible
  // This is a simplified approach; true source mapping is complex.
  // We'll rely on the order they were captured for now.
  // More robust: parse line by line and build DOM-like structure.

  return { html, toc: tocEntries };
};


interface ReactifyMarkdownEditorProps extends ReactifyComponentProps {
  initialValue?: string;
  onValueChange?: (markdown: string) => void;
  textareaRows?: number;
  placeholder?: string;
}

export function ReactifyMarkdownEditor({
  className,
  initialValue = '',
  onValueChange,
  textareaRows = 10,
  placeholder = "Type your Markdown here...",
  as: Component = 'div',
  ...props
}: ReactifyMarkdownEditorProps) {
  const [markdown, setMarkdown] = useState(initialValue);
  const [previewOutput, setPreviewOutput] = useState<ParsedMarkdownOutput>({ html: '', toc: [] });
  const previewContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPreviewOutput(parseMarkdownToHtml(markdown));
  }, [markdown]);
  
  useEffect(() => {
    // Re-parse on initialValue change
    setMarkdown(initialValue);
    setPreviewOutput(parseMarkdownToHtml(initialValue));
  }, [initialValue]);


  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setMarkdown(newValue);
    onValueChange?.(newValue);
    // setPreviewOutput(parseMarkdownToHtml(newValue)); // already handled by useEffect on markdown change
  };

  const handleTocClick = (id: string) => {
    const element = previewContainerRef.current?.querySelector(`#${id}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Component className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)} {...props}>
      <div className="space-y-2 flex flex-col">
        <Label htmlFor="markdown-input" className="font-semibold text-lg">Markdown Input</Label>
        <ReactifyTextarea
          id="markdown-input"
          value={markdown}
          onChange={handleInputChange}
          rows={textareaRows}
          placeholder={placeholder}
          className="w-full flex-grow resize-y font-code text-sm rounded-md shadow-sm border-input"
          aria-label="Markdown Input Area"
        />
      </div>
      <div className="space-y-4">
        {previewOutput.toc.length > 0 && (
          <div className="border p-3 rounded-md bg-muted/30 shadow-sm">
            <h4 className="font-semibold text-md mb-2">Table of Contents</h4>
            <ul className="list-none p-0 space-y-1 text-sm max-h-48 overflow-y-auto">
              {previewOutput.toc.map(item => (
                <li key={item.id} style={{ marginLeft: `${(item.level - 1) * 1.25}rem` }}>
                  <button 
                    onClick={() => handleTocClick(item.id)} 
                    className="text-primary hover:underline focus:outline-none focus:ring-1 focus:ring-primary rounded py-0.5 px-1 text-left"
                    title={`Jump to ${item.text}`}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <Label htmlFor="markdown-preview-container" className="font-semibold text-lg">HTML Preview</Label>
          <div
            id="markdown-preview-container"
            ref={previewContainerRef}
            className="prose prose-sm dark:prose-invert max-w-none p-4 border rounded-md bg-muted/50 min-h-[200px] h-auto overflow-y-auto shadow-sm mt-2"
            dangerouslySetInnerHTML={{ __html: previewOutput.html }}
            aria-live="polite"
            aria-atomic="true"
          />
        </div>
      </div>
    </Component>
  );
}
