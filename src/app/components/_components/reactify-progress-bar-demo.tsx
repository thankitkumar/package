
'use client';
import { ReactifyProgressBar } from '@/components/reactify/progress-bar';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

export default function ReactifyProgressBarDemo() {
  const [progress, setProgress] = useState(20);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 15));
    }, 1500);
    return () => clearTimeout(timer);
  }, [progress]);


  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-8">
        <div>
          <h3 className="font-semibold text-lg mb-3">Dynamic Progress Bar</h3>
          <ReactifyProgressBar value={progress} label="Task completion" />
          <p className="text-sm text-muted-foreground mt-2">Current progress: {progress}%</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Static Variants</h3>
          <div className="space-y-4">
            <ReactifyProgressBar value={30} variant="primary" label="Primary task progress" />
            <ReactifyProgressBar value={50} variant="success" label="Upload success progress" />
            <ReactifyProgressBar value={70} variant="warning" label="Warning level progress" />
            <ReactifyProgressBar value={90} variant="destructive" label="Critical error progress" />
            <ReactifyProgressBar value={40} variant="default" label="Default progress" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Sizes</h3>
           <div className="space-y-4">
            <ReactifyProgressBar value={60} size="sm" label="Small task progress" variant="success" />
            <ReactifyProgressBar value={60} size="md" label="Medium task progress" variant="success" />
            <ReactifyProgressBar value={60} size="lg" label="Large task progress" variant="success" />
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-3">Screen Reader Only Label</h3>
           <ReactifyProgressBar value={75} showValueLabel label="Download progress with screen reader label" />
           <p className="text-sm text-muted-foreground mt-1">Value "75%" is in a sr-only span for screen readers.</p>
        </div>
      </CardContent>
    </Card>
  );
}

