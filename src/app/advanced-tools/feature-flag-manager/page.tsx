
import { FeatureFlagDashboard } from './_components/feature-flag-dashboard';
import { ReactifyCard, ReactifyCardHeader, ReactifyCardTitle, ReactifyCardDescription, ReactifyCardContent } from '@/components/reactify/card';
import { ToggleRight } from 'lucide-react';

// Note: FeatureFlagProvider is already in RootLayout, so context is available here.

export default function FeatureFlagManagerPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <ToggleRight className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold text-foreground">Feature Flag Manager</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          View, toggle, and simulate the configuration of feature flags in your application. 
          This tool demonstrates how one might manage feature releases.
        </p>
      </div>

      <ReactifyCard className="max-w-4xl mx-auto shadow-xl">
        <ReactifyCardHeader>
          <ReactifyCardTitle className="font-headline text-2xl">Current Feature Flags</ReactifyCardTitle>
          <ReactifyCardDescription>
            Manage the status and rollout conditions of existing flags, or add new ones. 
            Changes are client-side for this demo.
          </ReactifyCardDescription>
        </ReactifyCardHeader>
        <ReactifyCardContent>
          <FeatureFlagDashboard />
        </ReactifyCardContent>
      </ReactifyCard>

       <ReactifyCard className="max-w-4xl mx-auto shadow-xl mt-12">
        <ReactifyCardHeader>
            <ReactifyCardTitle className="font-headline text-2xl">How it Works (Demo)</ReactifyCardTitle>
        </ReactifyCardHeader>
        <ReactifyCardContent className="text-muted-foreground space-y-3">
            <p><strong>1. Master Toggle:</strong> Each flag has a main <code className="font-code bg-muted px-1 rounded-sm">isEnabled</code> switch. This acts as a global override for the demo.</p>
            <p><strong>2. Rollout Conditions:</strong> View and (simulate) editing conditions like user percentages, specific user targeting, or environment rules. In a real system, these conditions would be evaluated against the current context (user, environment) to determine if a feature is active, in addition to the master toggle.</p>
            <p><strong>3. Real-time (Simulated):</strong> Changes made here update the client-side state. In a production environment, these would typically interact with a feature flag service API.</p>
            <p className="text-sm">This tool helps visualize how feature flags provide granular control over feature releases, A/B testing, and progressive rollouts.</p>
        </ReactifyCardContent>
      </ReactifyCard>
    </div>
  );
}
