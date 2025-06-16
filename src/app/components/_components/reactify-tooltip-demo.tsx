
'use client';
import { ReactifyTooltip } from '@/components/reactify/tooltip';
import { ReactifyButton } from '@/components/reactify/button';
import { Card, CardContent } from '@/components/ui/card';
import { Info, HelpCircle } from 'lucide-react';

export default function ReactifyTooltipDemo() {
  return (
    <Card className="w-full">
      <CardContent className="p-6 flex flex-wrap gap-8 items-center justify-center">
        <ReactifyTooltip content="This is a tooltip on top.">
          <ReactifyButton variant="outline">Tooltip on Top (Default)</ReactifyButton>
        </ReactifyTooltip>

        <ReactifyTooltip content="Tooltip appears on the bottom." position="bottom">
          <ReactifyButton variant="secondary">Tooltip on Bottom</ReactifyButton>
        </ReactifyTooltip>

        <ReactifyTooltip content="Left-aligned tooltip." position="left">
          <ReactifyButton variant="ghost">Tooltip on Left</ReactifyButton>
        </ReactifyTooltip>

        <ReactifyTooltip content="Right-aligned tooltip with a delay." position="right" delay={500}>
          <ReactifyButton variant="destructive">Tooltip on Right (500ms delay)</ReactifyButton>
        </ReactifyTooltip>
        
        <ReactifyTooltip content="Information icon tooltip." position="top">
            <Info className="h-6 w-6 text-primary cursor-pointer" />
        </ReactifyTooltip>

        <ReactifyTooltip 
            content={
                <div className="text-left">
                    <p className="font-bold">Rich Content!</p>
                    <ul className="list-disc list-inside text-xs">
                        <li>Supports JSX</li>
                        <li>And multiple lines</li>
                    </ul>
                </div>
            } 
            position="bottom"
        >
            <span className="inline-flex items-center gap-1 text-accent underline cursor-help">
                <HelpCircle size={16} /> Rich Content Tooltip
            </span>
        </ReactifyTooltip>
      </CardContent>
    </Card>
  );
}
