
'use client';

import type { HTMLAttributes } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';
import { ReactifyButton } from './button';
import { 
  Bold, Italic, Strikethrough, Heading1, Heading2, Heading3, 
  List, ListOrdered, Pilcrow, Minus, Quote, Code, RemoveFormatting,
  Sigma // Sparkles, Loader2, AlignJustify, Briefcase, Heading as HeadingIcon removed
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
// import { transformEditorText, type TransformEditorTextInput } from '@/ai/flows/transform-editor-text'; // Genkit removed
import LatexBlockNode from './tiptap-extensions/latex-block'; 
import katex from 'katex'; 
import { CodeBlock } from '@/components/ui/code-block';


interface ReactifyRichTextEditorProps extends ReactifyComponentProps {
  initialContent?: string;
  onUpdate?: (content: { html: string; json: any }) => void; 
  editable?: boolean;
  editorClassName?: string;
  toolbarClassName?: string;
}

const ToolbarButton = ({ onClick, isActive, children, title, disabled }: { onClick: () => void; isActive?: boolean; children: React.ReactNode; title?: string; disabled?: boolean; }) => (
  <ReactifyButton
    variant={isActive ? 'secondary' : 'ghost'}
    size="sm"
    onClick={onClick}
    className={cn("p-2 h-auto", isActive && "bg-accent text-accent-foreground")}
    title={title}
    disabled={disabled}
  >
    {children}
  </ReactifyButton>
);

const EditorToolbar = ({ editor, handleLatexInsert }: { 
  editor: Editor | null; 
  handleLatexInsert: () => void;
}) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border border-input rounded-t-md p-2 bg-muted/50">
      <ToolbarButton title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
        <Bold size={16} />
      </ToolbarButton>
      <ToolbarButton title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
        <Italic size={16} />
      </ToolbarButton>
      <ToolbarButton title="Strike" onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')}>
        <Strikethrough size={16} />
      </ToolbarButton>
      <ToolbarButton title="Code" onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')}>
        <Code size={16} />
      </ToolbarButton>
       <ToolbarButton title="Insert/Edit LaTeX Block" onClick={handleLatexInsert} isActive={editor.isActive('latexBlock')}>
        <Sigma size={16} />
      </ToolbarButton>
      <ToolbarButton title="Clear Formatting" onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        <RemoveFormatting size={16} />
      </ToolbarButton>
      
      <span className="h-5 w-px bg-border mx-1"></span>

      <ToolbarButton title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })}>
        <Heading1 size={16} />
      </ToolbarButton>
      <ToolbarButton title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}>
        <Heading2 size={16} />
      </ToolbarButton>
      <ToolbarButton title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })}>
        <Heading3 size={16} />
      </ToolbarButton>
      <ToolbarButton title="Paragraph" onClick={() => editor.chain().focus().setParagraph().run()} isActive={editor.isActive('paragraph')}>
        <Pilcrow size={16} />
      </ToolbarButton>
       <ToolbarButton title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')}>
        <Quote size={16} />
      </ToolbarButton>

      <span className="h-5 w-px bg-border mx-1"></span>
      
      <ToolbarButton title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
        <List size={16} />
      </ToolbarButton>
      <ToolbarButton title="Ordered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}>
        <ListOrdered size={16} />
      </ToolbarButton>
       <ToolbarButton title="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus size={16} />
      </ToolbarButton>
    </div>
  );
};


export function ReactifyRichTextEditor({
  className,
  initialContent = '<p>Start typing here...</p>',
  onUpdate,
  editable = true,
  editorClassName,
  toolbarClassName,
  as: Component = 'div', 
  ...props
}: ReactifyRichTextEditorProps & HTMLAttributes<HTMLDivElement>) {
  const { toast } = useToast();
  // AI related state removed

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // placeholder: { placeholder: 'Start writing...' } // If needed
      }),
      LatexBlockNode.configure({
        // HTMLAttributes for the node wrapper, if needed
      }),
    ],
    content: initialContent,
    editable,
    onUpdate: ({ editor }) => {
      onUpdate?.({
        html: editor.getHTML(),
        json: editor.getJSON(),
      });
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm dark:prose-invert max-w-none p-3 focus:outline-none min-h-[150px] border border-input rounded-b-md focus:border-ring',
          !editable && 'bg-muted/50 cursor-not-allowed',
          editorClassName
        ),
      },
    },
  });

  const handleLatexInsert = () => {
    if (!editor) return;
    const currentLatex = editor.getAttributes('latexBlock').latex || '';
    const latexInput = window.prompt('Enter LaTeX code (block display):', currentLatex);
    
    if (latexInput !== null) { 
      if (editor.isActive('latexBlock')) {
        editor.chain().focus().updateAttributes('latexBlock', { latex: latexInput }).run();
      } else {
        editor.chain().focus().insertLatexBlock({ latex: latexInput }).run();
      }

      try {
        const htmlForToast = katex.renderToString(latexInput, {
          displayMode: true,
          throwOnError: true, 
          output: 'html',
        });
        toast({
          title: 'LaTeX to HTML Output',
          description: (
            <div className="w-full max-w-md text-left">
              <p className="mb-1 text-xs text-muted-foreground">HTML for: <code className="text-xs bg-slate-700 text-slate-200 p-0.5 rounded-sm">{latexInput.substring(0, 30)}{latexInput.length > 30 ? '...' : ''}</code></p>
              <CodeBlock code={htmlForToast} lang="html" scrollAreaClassName="max-h-32 text-xs" className="text-xs" />
            </div>
          ),
          duration: 15000, 
        });
      } catch (e: any) {
        toast({
          title: 'KaTeX HTML Generation Error',
          description: `Could not generate HTML for toast preview: ${e.message}. The block in editor might still render if KaTeX handles the error gracefully there.`,
          variant: 'destructive',
          duration: 7000,
        });
      }
    }
  };

  // handleAiTransform function removed

  return (
    <Component className={cn('w-full', className)} {...props}>
      <EditorToolbar 
        editor={editor} 
        handleLatexInsert={handleLatexInsert}
      />
      <EditorContent editor={editor} />
    </Component>
  );
}
