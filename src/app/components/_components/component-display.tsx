
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ReactifyBadge } from '@/components/reactify/badge';

interface ComponentDisplayProps {
  title: string;
  description: string;
  children: ReactNode; // The component demo itself
  codeExample?: string;
  accessibilityNotes?: string[];
  previewPaddingClassName?: string;
  codeBlockScrollAreaClassName?: string;
  version?: string;
  status?: 'new' | 'updated' | 'beta';
}

export function ComponentDisplay({
  title,
  description,
  children,
  codeExample = "No code example provided.",
  accessibilityNotes = ["Follow standard accessibility practices for this component type."],
  previewPaddingClassName = "p-4",
  codeBlockScrollAreaClassName,
  version,
  status,
}: ComponentDisplayProps) {
  return (
    <Card className="mb-12 shadow-lg">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-3">
          <CardTitle className="text-2xl font-headline">{title}</CardTitle>
          {version && <ReactifyBadge variant="outline" size="sm">v{version}</ReactifyBadge>}
          {status === 'new' && <ReactifyBadge variant="success" size="sm">New</ReactifyBadge>}
          {status === 'updated' && <ReactifyBadge variant="warning" size="sm">Updated</ReactifyBadge>}
          {status === 'beta' && <ReactifyBadge variant="destructive" size="sm">Beta</ReactifyBadge>}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={cn(
          "border rounded-md min-h-[200px] flex justify-center items-center bg-muted/20 mb-6",
          previewPaddingClassName
        )}>
          {children}
        </div>

        <Tabs defaultValue="code" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          </TabsList>
          <TabsContent value="code">
            <CodeBlock 
              code={codeExample} 
              lang="tsx" 
              scrollAreaClassName={codeBlockScrollAreaClassName} // Pass prop here
            />
          </TabsContent>
          <TabsContent value="accessibility">
            <ScrollArea className="h-72 w-full rounded-md border p-4 bg-muted/20">
              <ul className="list-disc pl-5 space-y-2 text-sm">
                {accessibilityNotes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
