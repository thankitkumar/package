
'use client';
import { ReactifyButton } from '@/components/reactify/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Upload, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function ReactifyButtonDemo() {
  const [loadingVariant, setLoadingVariant] = useState<string | null>(null);

  const handleVariantClick = (clickedVariant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'warning') => {
    setLoadingVariant(clickedVariant);
    setTimeout(() => {
      setLoadingVariant(null);
    }, 2000);
  };
  
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-2">Variants</h3>
            <div className="flex flex-wrap gap-2 items-center">
              <ReactifyButton variant="primary" onClick={() => handleVariantClick('primary')} isLoading={loadingVariant === 'primary'} data-variant="primary">Primary</ReactifyButton>
              <ReactifyButton variant="secondary" onClick={() => handleVariantClick('secondary')} isLoading={loadingVariant === 'secondary'} data-variant="secondary">Secondary</ReactifyButton>
              <ReactifyButton variant="outline" onClick={() => handleVariantClick('outline')} isLoading={loadingVariant === 'outline'} data-variant="outline">Outline</ReactifyButton>
              <ReactifyButton variant="ghost" onClick={() => handleVariantClick('ghost')} isLoading={loadingVariant === 'ghost'} data-variant="ghost">Ghost</ReactifyButton>
              <ReactifyButton variant="destructive" leftIcon={<AlertTriangle size={16}/>} onClick={() => handleVariantClick('destructive')} isLoading={loadingVariant === 'destructive'} data-variant="destructive">Destructive</ReactifyButton>
              <ReactifyButton variant="success" leftIcon={<CheckCircle size={16}/>} onClick={() => handleVariantClick('success')} isLoading={loadingVariant === 'success'} data-variant="success">Success</ReactifyButton>
              <ReactifyButton variant="warning" onClick={() => handleVariantClick('warning')} isLoading={loadingVariant === 'warning'} data-variant="warning">Warning</ReactifyButton>
              <ReactifyButton variant="link" onClick={() => alert('Link button clicked!')} rightIcon={<ExternalLink size={14}/>}>Link Button</ReactifyButton>
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
