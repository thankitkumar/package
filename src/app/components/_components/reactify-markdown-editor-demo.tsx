
'use client';

import { ReactifyMarkdownEditor } from '@/components/reactify/markdown-editor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

const sampleMarkdown = `
# Welcome to the Reactify Markdown Editor!

This is a **basic** example of what you can do. The Table of Contents (ToC) above the preview will list headings from this document.

## Features (very limited)
- Headings (used for ToC)
- **Bold text**
- *Italic text*
- [Links to other sites](https://example.com)
- Unordered lists:
  - Item 1
  - Item 2
    - Nested items are not well supported by this basic parser.
  - Item 3

## Another H2 for ToC
Paragraphs are separated by a blank line.
This is another paragraph.

### A Sub-heading (H3)
More details here.

A line break can be done with two spaces at the end,  
or simply a newline for basic <br> in this rudimentary parser.

---
*Note: This editor uses a very simple, custom Markdown parser due to the "no third-party library" constraint. It's not fully compliant and lacks many features and security of standard Markdown libraries.*
`;

export default function ReactifyMarkdownEditorDemo() {
  // const [markdownContent, setMarkdownContent] = useState(sampleMarkdown);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Markdown Editor with Table of Contents</CardTitle>
        <CardDescription>
          A simple textarea for Markdown input with a live HTML preview and an auto-generated Table of Contents. 
          Parsing is extremely basic.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactifyMarkdownEditor 
          initialValue={sampleMarkdown} 
          // onValueChange={setMarkdownContent} // Example of handling value change
          textareaRows={18}
        />
      </CardContent>
    </Card>
  );
}
