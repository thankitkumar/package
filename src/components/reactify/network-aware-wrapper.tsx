
'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useNetworkState } from '@/hooks/use-network-state';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';
import { WifiOff, Wifi } from 'lucide-react';

interface NetworkAwareWrapperProps extends ReactifyComponentProps {
  children: ReactNode;
  offlineBanner?: ReactNode;
  onlineBanner?: ReactNode;
  showOnlineBannerDuration?: number; // milliseconds
}

export function NetworkAwareWrapper({
  children,
  offlineBanner,
  onlineBanner,
  showOnlineBannerDuration = 3000,
  className,
  as: Component = 'div',
  ...props
}: NetworkAwareWrapperProps) {
  const { isOnline } = useNetworkState();
  const [showOnlineStateBanner, setShowOnlineStateBanner] = useState(false);
  const [hasBeenOffline, setHasBeenOffline] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Component has mounted on client
  }, []);

  useEffect(() => {
    if (!isClient) return; // Don't run this effect on server or before hydration

    if (!isOnline) {
      setHasBeenOffline(true); // Record that we've experienced an offline state
      setShowOnlineStateBanner(false); // Ensure online banner is hidden if we go offline
    } else if (isOnline && hasBeenOffline) {
      // Only show "back online" if we were previously offline during this session
      setShowOnlineStateBanner(true);
      const timer = setTimeout(() => {
        setShowOnlineStateBanner(false);
      }, showOnlineBannerDuration);
      setHasBeenOffline(false); // Reset for next offline event
      return () => clearTimeout(timer);
    }
  }, [isOnline, hasBeenOffline, showOnlineBannerDuration, isClient]);


  const defaultOfflineBanner = (
    <div 
      role="status" 
      aria-live="assertive"
      className="fixed bottom-0 left-0 right-0 bg-destructive text-destructive-foreground p-3 text-sm text-center z-[100] shadow-md flex items-center justify-center gap-2 animate-pulse"
    >
      <WifiOff size={18} /> You are currently offline.
    </div>
  );

  const defaultOnlineBanner = (
    <div 
      role="status" 
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 bg-green-600 text-white p-3 text-sm text-center z-[100] shadow-md flex items-center justify-center gap-2"
    >
      <Wifi size={18} /> You are back online!
    </div>
  );

  const currentOfflineBanner = offlineBanner === undefined ? defaultOfflineBanner : offlineBanner;
  const currentOnlineBanner = onlineBanner === undefined ? defaultOnlineBanner : onlineBanner;

  if (!isClient) {
    // During SSR or before hydration, render children optimistically without banners.
    return <Component className={className} {...props}>{children}</Component>;
  }

  return (
    <Component className={className} {...props}>
      {!isOnline && currentOfflineBanner}
      {isOnline && showOnlineStateBanner && currentOnlineBanner}
      {children}
    </Component>
  );
}
