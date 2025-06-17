
'use client';

import { ReactifyMarkdownEditor } from '@/components/reactify/markdown-editor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const sampleMarkdown = `
# Welcome to the Reactify Markdown Editor!

This is a **basic** example of what you can do.

## Features (very limited)
- Headings
- **Bold text**
- *Italic text*
- [Links to other sites](https://example.com)
- Unordered lists:
  - Item 1
  - Item 2
    - Nested items are not well supported by this basic parser.
  - Item 3

Paragraphs are separated by a blank line.
This is another paragraph.
A line break can be done with two spaces at the end,  
or simply a newline for basic <br> in this rudimentary parser.

---
*Note: This editor uses a very simple, custom Markdown parser due to the "no third-party library" constraint. It's not fully compliant and lacks many features and security of standard Markdown libraries.*
`;

export default function ReactifyMarkdownEditorDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Markdown Editor Demo</CardTitle>
        <CardDescription>
          A simple textarea for Markdown input with a live HTML preview. 
          Parsing is extremely basic.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactifyMarkdownEditor 
          initialValue={sampleMarkdown} 
          textareaRows={15}
        />
      </CardContent>
    </Card>
  );
}
