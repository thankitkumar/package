
'use client';

import { useState } from 'react';
import { ReactifyRichTextEditor } from '@/components/reactify/rich-text-editor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { ReactifyButton } from '@/components/reactify/button';

const initialDemoContent = `
<h2>Welcome to Reactify Rich Text Editor!</h2>
<p>This editor uses <strong>TipTap</strong> (a headless wrapper around <a href="https://prosemirror.net/" target="_blank" rel="noopener noreferrer">ProseMirror</a>) to provide a rich text editing experience.</p>
<p>Features include:</p>
<ul>
  <li>Basic text formatting (bold, italic, strikethrough)</li>
  <li>Headings (H1, H2, H3)</li>
  <li>Bullet and ordered lists</li>
  <li>Blockquotes</li>
  <li>Code blocks</li>
  <li>Horizontal rules</li>
</ul>
<p>Try it out!</p>
`;

export default function ReactifyRichTextEditorDemo() {
  const [editorContentHtml, setEditorContentHtml] = useState(initialDemoContent);
  const [editorContentJson, setEditorContentJson] = useState<any | null>(null);

  const handleUpdate = (content: { html: string; json: any }) => {
    setEditorContentHtml(content.html);
    setEditorContentJson(content.json);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Rich Text Editor (using TipTap)</CardTitle>
        <CardDescription>
          A basic implementation of a rich text editor using TipTap with the StarterKit extension.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ReactifyRichTextEditor
          initialContent={initialDemoContent}
          onUpdate={handleUpdate}
        />
        
        <div className="space-y-4 mt-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Editor Output (HTML)</h3>
            <CodeBlock code={editorContentHtml} lang="html" scrollAreaClassName="max-h-60" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Editor Output (JSON - TipTap format)</h3>
             <ReactifyButton 
                variant="outline" 
                size="sm" 
                className="mb-2"
                onClick={() => console.log(editorContentJson)}
            >
                Log JSON to Console
            </ReactifyButton>
            <CodeBlock 
                code={editorContentJson ? JSON.stringify(editorContentJson, null, 2) : 'No JSON content yet. Type in the editor.'} 
                lang="json" 
                scrollAreaClassName="max-h-60"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
