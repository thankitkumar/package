
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback, useMemo }
  from 'react';

export interface RolloutCondition {
  id: string; // Unique ID for the condition itself
  type: 'userPercentage' | 'specificUsers' | 'environment' | 'custom';
  value: string | number; // e.g., 50, "user1,user2,user3", "staging"
  description: string; // e.g., "Enabled for 50% of users"
}

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean; // Master toggle
  rolloutConditions: RolloutCondition[];
}

interface FeatureFlagContextType {
  featureFlags: FeatureFlag[];
  getFlag: (id: string) => FeatureFlag | undefined;
  isFlagEnabled: (id: string) => boolean; // Considers master toggle only for this demo
  toggleFlag: (id: string) => void;
  updateFlag: (updatedFlag: FeatureFlag) => void;
  addFlag: (newFlag: Omit<FeatureFlag, 'id' | 'rolloutConditions'> & { rolloutConditions?: RolloutCondition[] }) => void;
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(
  undefined
);

const initialFlags: FeatureFlag[] = [
  {
    id: 'new-dashboard-ui',
    name: 'New Dashboard UI',
    description: 'Enables the redesigned dashboard interface with new widgets and layout.',
    isEnabled: true,
    rolloutConditions: [
      { id: 'cond1-1', type: 'userPercentage', value: 10, description: 'Enabled for 10% of beta users.' },
      { id: 'cond1-2', type: 'environment', value: 'staging', description: 'Fully enabled on Staging environment.' },
    ],
  },
  {
    id: 'realtime-chat-feature',
    name: 'Real-time Chat',
    description: 'Activates the new real-time messaging feature for support tickets.',
    isEnabled: false,
    rolloutConditions: [
       { id: 'cond2-1', type: 'specificUsers', value: 'admin@example.com,support-lead@example.com', description: 'Enabled for specific admin and support lead accounts.' },
    ],
  },
  {
    id: 'ai-summary-experimental',
    name: 'AI Content Summarization (Experimental)',
    description: 'Provides AI-powered summaries for long articles. Currently in early testing.',
    isEnabled: true,
    rolloutConditions: [
      { id: 'cond3-1', type: 'userPercentage', value: 5, description: 'Enabled for 5% of opted-in users.' },
      { id: 'cond3-2', type: 'custom', value: 'hasPremiumSubscription:true', description: 'Custom: Requires active premium subscription.'}
    ],
  },
];

export function FeatureFlagProvider({ children }: { children: ReactNode }) {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>(initialFlags);

  const getFlag = useCallback(
    (id: string) => featureFlags.find((flag) => flag.id === id),
    [featureFlags]
  );

  const isFlagEnabled = useCallback(
    (id:string): boolean => {
      const flag = getFlag(id);
      // For this demo, we only respect the master isEnabled toggle.
      // A real system would evaluate rolloutConditions against the current user/context.
      return !!flag?.isEnabled;
    },
    [getFlag]
  );

  const toggleFlag = useCallback((id: string) => {
    setFeatureFlags((prevFlags) =>
      prevFlags.map((flag) =>
        flag.id === id ? { ...flag, isEnabled: !flag.isEnabled } : flag
      )
    );
  }, []);

  const updateFlag = useCallback((updatedFlag: FeatureFlag) => {
    setFeatureFlags((prevFlags) =>
      prevFlags.map((flag) =>
        flag.id === updatedFlag.id ? updatedFlag : flag
      )
    );
  }, []);
  
  const addFlag = useCallback((newFlagData: Omit<FeatureFlag, 'id' | 'rolloutConditions'> & { rolloutConditions?: RolloutCondition[] }) => {
    const newFlag: FeatureFlag = {
      id: `flag-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...newFlagData,
      rolloutConditions: newFlagData.rolloutConditions || []
    };
    setFeatureFlags(prev => [...prev, newFlag]);
  }, []);


  const value = useMemo(
    () => ({
      featureFlags,
      getFlag,
      isFlagEnabled,
      toggleFlag,
      updateFlag,
      addFlag,
    }),
    [featureFlags, getFlag, isFlagEnabled, toggleFlag, updateFlag, addFlag]
  );

  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

export const useFeatureFlags = (): FeatureFlagContextType => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error(
      'useFeatureFlags must be used within a FeatureFlagProvider'
    );
  }
  return context;
};
