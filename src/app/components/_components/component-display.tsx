
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ReactNode } from 'react';

interface ComponentDisplayProps {
  title: string;
  description: string;
  children: ReactNode; // The component demo itself
  codeExample?: string;
  accessibilityNotes?: string[];
}

export function ComponentDisplay({
  title,
  description,
  children,
  codeExample = "No code example provided.",
  accessibilityNotes = ["Follow standard accessibility practices for this component type."]
}: ComponentDisplayProps) {
  return (
    <Card className="mb-12 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="p-4 border rounded-md min-h-[200px] flex justify-center items-center bg-muted/20">
            {children}
          </TabsContent>
          <TabsContent value="code">
            <ScrollArea className="h-72 w-full rounded-md border p-4 bg-muted/20">
              <pre className="text-sm font-code whitespace-pre-wrap">
                <code>{codeExample}</code>
              </pre>
            </ScrollArea>
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

