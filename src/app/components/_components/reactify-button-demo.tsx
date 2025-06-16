'use client';
import { ReactifyButton } from '@/components/reactify/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Upload, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function ReactifyButtonDemo() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };
  
  const codeExample = `
import { ReactifyButton } from '@/components/reactify/button';
import { Heart, Upload, AlertTriangle } from 'lucide-react';

// Primary Button
<ReactifyButton variant="primary">Primary Action</ReactifyButton>

// Secondary Button
<ReactifyButton variant="secondary">Secondary Action</ReactifyButton>

// Outline Button
<ReactifyButton variant="outline">Outline Action</ReactifyButton>

// Ghost Button
<ReactifyButton variant="ghost">Ghost Action</ReactifyButton>

// Destructive Button
<ReactifyButton variant="destructive" leftIcon={<AlertTriangle />}>
  Delete Item
</ReactifyButton>

// Button with Icon
<ReactifyButton variant="primary" leftIcon={<Heart />}>
  Like
</ReactifyButton>

// Loading State Button
<ReactifyButton variant="primary" isLoading={true}>
  Processing
</ReactifyButton>

// Disabled Button
<ReactifyButton variant="primary" disabled>
  Disabled
</ReactifyButton>

// Different Sizes
<ReactifyButton variant="primary" size="sm">Small</ReactifyButton>
<ReactifyButton variant="secondary" size="lg">Large</ReactifyButton>
  `;

  const accessibilityNotes = [
    "Ensure buttons have clear, descriptive text content.",
    "Use `aria-label` for icon-only buttons or if the text is not descriptive enough.",
    "Buttons are focusable and can be activated using Enter or Space keys.",
    "Loading state is announced via `aria-busy` and `aria-live`.",
    "Disabled state is handled with the `disabled` attribute, making it unfocusable and unclickable.",
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-2">Variants</h3>
            <div className="flex flex-wrap gap-2">
              <ReactifyButton variant="primary" onClick={handleClick} isLoading={isLoading && variant === 'primary'} data-variant="primary">Primary</ReactifyButton>
              <ReactifyButton variant="secondary" onClick={handleClick} isLoading={isLoading && variant === 'secondary'} data-variant="secondary">Secondary</ReactifyButton>
              <ReactifyButton variant="outline" onClick={handleClick} isLoading={isLoading && variant === 'outline'} data-variant="outline">Outline</ReactifyButton>
              <ReactifyButton variant="ghost" onClick={handleClick} isLoading={isLoading && variant === 'ghost'} data-variant="ghost">Ghost</ReactifyButton>
              <ReactifyButton variant="destructive" leftIcon={<AlertTriangle size={16}/>} onClick={handleClick} isLoading={isLoading && variant === 'destructive'} data-variant="destructive">Destructive</ReactifyButton>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-2">Sizes</h3>
            <div className="flex flex-wrap items-center gap-2">
              <ReactifyButton variant="primary" size="sm">Small</ReactifyButton>
              <ReactifyButton variant="primary" size="md">Medium</ReactifyButton>
              <ReactifyButton variant="primary" size="lg">Large</ReactifyButton>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-2">With Icons</h3>
            <div className="flex flex-wrap gap-2">
              <ReactifyButton variant="primary" leftIcon={<Heart size={16}/>}>Like</ReactifyButton>
              <ReactifyButton variant="secondary" rightIcon={<Upload size={16}/>}>Upload</ReactifyButton>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-2">States</h3>
            <div className="flex flex-wrap gap-2">
              <ReactifyButton variant="primary" isLoading={true}>Processing...</ReactifyButton>
              <ReactifyButton variant="primary" disabled>Disabled</ReactifyButton>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
