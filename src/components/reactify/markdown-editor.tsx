
'use client';

import { useState, type ChangeEvent } from 'react';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';
import { ReactifyTextarea } from './textarea';
import { Label } from '@/components/ui/label'; // Assuming you have a Label component

// VERY basic Markdown to HTML parser. Not robust or secure for production without significant enhancements or a proper library.
const parseMarkdownToHtml = (markdown: string): string => {
  if (!markdown) return '';

  let html = String(markdown);

  // Basic sanitization: strip script tags
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Headings (###, ##, #)
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold (**text** or __text__)
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/gim, '<strong>$1</strong>');

  // Italics (*text* or _text_)
  // Ensure we don't match bold accidentally (e.g. * in ***text***)
  html = html.replace(/(^|[^\*])\*(?!\*)(.*?)(?<!\*)\*([^\*]|$)/gim, '$1<em>$2</em>$3');
  html = html.replace(/(^|[^_])_(?!_)(.*?)(?<!_)_([^_]|$)/gim, '$1<em>$2</em>$3');


  // Links ([text](url))
  html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Unordered lists (- item) - very basic, single level
  // Process line by line for lists
  html = html.split('\n').map(line => {
    if (line.match(/^\s*[-*+] (.*)/im)) {
      return `<li>${line.substring(line.indexOf(' ') + 1)}</li>`;
    }
    return line;
  }).join('\n');
  // Wrap consecutive <li> items in <ul>
  html = html.replace(/^(<li>.*<\/li>\s*)+/gim, (match) => `<ul>${match.trim()}</ul>`);
  html = html.replace(/<\/li>\n<li>/gim, '</li><li>'); // Join list items if separated by single newline

  // Paragraphs: Wrap lines that are not part of other elements (like headings or lists) in <p> tags.
  // Split by double newlines first, then process.
  html = html.split(/\n\n+/).map(paragraph => {
    const trimmedParagraph = paragraph.trim();
    if (!trimmedParagraph) return '';
    // Avoid wrapping if it already looks like an HTML block or list
    if (trimmedParagraph.match(/^<(h[1-6]|ul|ol|li|strong|em|a|p|blockquote|pre|code)/i)) {
      return trimmedParagraph;
    }
    return `<p>${trimmedParagraph.replace(/\n/g, '<br />')}</p>`;
  }).join('');
  
  // Clean up <p> around <ul>, <ol>
  html = html.replace(/<p>\s*<(ul|ol)>/gi, '<$1>');
  html = html.replace(/<\/(ul|ol)>\s*<\/p>/gi, '</$1>');


  return html;
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

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setMarkdown(newValue);
    onValueChange?.(newValue);
  };

  const previewHtml = parseMarkdownToHtml(markdown);

  return (
    <Component className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)} {...props}>
      <div className="space-y-2">
        <Label htmlFor="markdown-input" className="font-semibold">Markdown Input</Label>
        <ReactifyTextarea
          id="markdown-input"
          value={markdown}
          onChange={handleInputChange}
          rows={textareaRows}
          placeholder={placeholder}
          className="w-full h-full min-h-[200px] resize-y font-code text-sm"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="markdown-preview" className="font-semibold">HTML Preview</Label>
        <div
          id="markdown-preview"
          className="prose prose-sm dark:prose-invert max-w-none p-4 border rounded-md bg-muted/50 min-h-[200px] h-full overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />
      </div>
    </Component>
  );
}
