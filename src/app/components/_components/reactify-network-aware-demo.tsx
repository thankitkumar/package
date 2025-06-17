
'use client';

import { useState } from 'react';
import { NetworkAwareWrapper } from '@/components/reactify/network-aware-wrapper';
import { ReactifyButton } from '@/components/reactify/button';
import { ReactifyCard, ReactifyCardContent, ReactifyCardHeader, ReactifyCardTitle, ReactifyCardDescription } from '@/components/reactify/card';
import { WifiOff, Wifi, AlertTriangle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ReactifyNetworkAwareDemo() {
  const { toast } = useToast();

  const simulateOffline = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('offline'));
      toast({ title: 'Simulated Offline', description: 'The app should now react as if it is offline.' });
    }
  };

  const simulateOnline = () => {
     if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('online'));
      toast({ title: 'Simulated Online', description: 'The app should now react as if it is online.' });
    }
  };

  const handleRetryAction = () => {
    toast({ 
      title: 'Retry Action Clicked', 
      description: 'In a real app, you might re-attempt a failed network request or sync data here.' 
    });
  };

  const customOfflineBanner = (
    <div 
      role="alert" 
      aria-live="assertive"
      className="sticky top-0 bg-amber-100 border-b-2 border-amber-500 text-amber-700 p-3 text-sm text-center z-[99] shadow-md flex items-center justify-center gap-2"
    >
      <AlertTriangle size={18} className="text-amber-600" /> 
      <span><strong>Connection Issue:</strong> You seem to be offline. </span>
      <ReactifyButton
        variant="outline"
        size="sm"
        onClick={handleRetryAction}
        className="ml-4 bg-amber-200 hover:bg-amber-300 border-amber-500 text-amber-700"
      >
        Retry Sync
      </ReactifyButton>
    </div>
  );

  const customOnlineBanner = (
    <div 
      role="status" 
      aria-live="polite"
      className="sticky top-0 bg-sky-100 border-b-2 border-sky-500 text-sky-700 p-3 text-sm text-center z-[99] shadow-md flex items-center justify-center gap-2"
    >
      <Info size={18} className="text-sky-600" /> Connection restored! You are back online.
    </div>
  );


  return (
    <div className="space-y-8">
      <ReactifyCard>
        <ReactifyCardHeader>
          <ReactifyCardTitle>Network Simulation Controls</ReactifyCardTitle>
          <ReactifyCardDescription>
            Use these buttons to simulate network status changes. This component relies on client-side browser events.
          </ReactifyCardDescription>
        </ReactifyCardHeader>
        <ReactifyCardContent className="flex flex-wrap gap-4">
          <ReactifyButton onClick={simulateOffline} variant="destructive" leftIcon={<WifiOff />}>
            Simulate Offline
          </ReactifyButton>
          <ReactifyButton onClick={simulateOnline} variant="success" leftIcon={<Wifi />}>
            Simulate Online
          </ReactifyButton>
        </ReactifyCardContent>
      </ReactifyCard>

      <ReactifyCard>
        <ReactifyCardHeader>
          <ReactifyCardTitle>Wrapper with Default Banners</ReactifyCardTitle>
          <ReactifyCardDescription>
            This section uses the NetworkAwareWrapper with its default banners. Default offline banner is red and appears at the bottom; default online banner is green and also at the bottom.
          </ReactifyCardDescription>
        </ReactifyCardHeader>
        <ReactifyCardContent>
          <NetworkAwareWrapper>
            <div className="p-6 border rounded-md bg-muted/30 min-h-[150px] flex flex-col justify-center items-center">
              <h3 className="font-semibold text-lg mb-2">Main Content Area 1</h3>
              <p className="text-center">This content is wrapped. Network status changes will trigger default banners appearing at the bottom of the viewport.</p>
              <p className="text-xs text-muted-foreground mt-3">(Scroll if necessary to see bottom banners)</p>
            </div>
          </NetworkAwareWrapper>
        </ReactifyCardContent>
      </ReactifyCard>
      
      <ReactifyCard>
        <ReactifyCardHeader>
          <ReactifyCardTitle>Wrapper with Custom Sticky Banners</ReactifyCardTitle>
           <ReactifyCardDescription>
            This section uses custom banners provided as props to the NetworkAwareWrapper. These examples are styled to be sticky at the top of their container.
          </ReactifyCardDescription>
        </ReactifyCardHeader>
        <ReactifyCardContent>
          <div className="relative border rounded-md overflow-hidden"> {/* Container for sticky banners */}
            <NetworkAwareWrapper
              offlineBanner={customOfflineBanner}
              onlineBanner={customOnlineBanner}
              showOnlineBannerDuration={4000}
            >
              <div className="p-6 bg-muted/30 min-h-[200px] flex flex-col justify-center items-center">
                <h3 className="font-semibold text-lg mb-2">Main Content Area 2</h3>
                <p className="text-center">This content is also network-aware but uses custom banners designed to appear at the top of this card.</p>
                <p className="text-xs text-muted-foreground mt-3">Try simulating offline/online using the buttons at the top of the page.</p>
              </div>
            </NetworkAwareWrapper>
          </div>
        </ReactifyCardContent>
      </ReactifyCard>
    </div>
  );
}
