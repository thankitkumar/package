
'use client';

import type { HTMLAttributes } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';
import { ReactifyButton } from './button';
import { 
  Bold, Italic, Strikethrough, Heading1, Heading2, Heading3, 
  List, ListOrdered, Pilcrow, Minus, Quote, Code, RemoveFormatting 
} from 'lucide-react';

interface ReactifyRichTextEditorProps extends ReactifyComponentProps {
  initialContent?: string;
  onUpdate?: (content: { html: string; json: any }) => void; // json is TipTap's internal format
  editable?: boolean;
  editorClassName?: string;
  toolbarClassName?: string;
}

const ToolbarButton = ({ onClick, isActive, children, title }: { onClick: () => void; isActive?: boolean; children: React.ReactNode, title?: string }) => (
  <ReactifyButton
    variant={isActive ? 'secondary' : 'ghost'}
    size="sm"
    onClick={onClick}
    className={cn("p-2 h-auto", isActive && "bg-accent text-accent-foreground")}
    title={title}
  >
    {children}
  </ReactifyButton>
);

const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
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
  as: Component = 'div', // The wrapper div
  ...props
}: ReactifyRichTextEditorProps & HTMLAttributes<HTMLDivElement>) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable extensions if needed, e.g. history: false
        // Or configure them, e.g. heading: { levels: [1, 2, 3] }
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
          editorClassName
        ),
      },
    },
  });

  return (
    <Component className={cn('w-full', className)} {...props}>
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </Component>
  );
}
