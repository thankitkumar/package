
'use client';

import { useState } from 'react';
import { ReactifyRichTextEditor } from '@/components/reactify/rich-text-editor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { ReactifyButton } from '@/components/reactify/button';

const initialDemoContent = `
<h2>Welcome to Reactify Rich Text Editor!</h2>
<p>This editor uses <strong>TipTap</strong> (a headless wrapper around <a href="https://prosemirror.net/" target="_blank" rel="noopener noreferrer">ProseMirror</a>) to provide a rich text editing experience.</p>
<p>Features include standard text formatting like bold, italic, headings, lists, and more. Select some text and try the AI transformation buttons in the toolbar (e.g., Summarize, Make Formal, Suggest Headline)!</p>
<h3>Example Text for AI:</h3>
<p>The quick brown fox jumps over the lazy dog. This sentence is often used to display font samples because it contains all letters of the alphabet. It's a classic pangram. We can explore various ways to rephrase or condense this information for different contexts.</p>
<ul>
  <li>Basic text formatting (bold, italic, strikethrough)</li>
  <li>Headings (H1, H2, H3)</li>
  <li>Bullet and ordered lists</li>
  <li>Blockquotes</li>
  <li>Code blocks</li>
  <li>Horizontal rules</li>
  <li><strong>New:</strong> AI Text Transformations (Summarize, Make Formal, Suggest Headline)</li>
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
        <CardTitle>Rich Text Editor (with AI Features)</CardTitle>
        <CardDescription>
          A TipTap-based rich text editor with standard formatting and integrated AI text transformation tools.
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
            <CodeBlock code={editorContentHtml} lang="html" scrollAreaClassName="max-h-none" />
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
                scrollAreaClassName="max-h-none"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


