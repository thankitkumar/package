
'use client';

import { useState, useEffect } from 'react';

export function useNetworkState() {
  // Initialize with navigator.onLine if available, otherwise default to true (optimistic for SSR)
  const [isOnline, setIsOnline] = useState(() => {
    if (typeof navigator !== 'undefined') {
      return navigator.onLine;
    }
    return true; 
  });

  useEffect(() => {
    // Ensure this effect runs only on the client
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

    // Update state to current navigator.onLine status after mount
    // This handles cases where the initial state might differ from the hook's initial value
    // especially if the hook was initialized before the browser fully determined network state.
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline };
}
