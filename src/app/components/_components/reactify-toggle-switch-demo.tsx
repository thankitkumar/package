'use client';
import { useState } from 'react';
import { ReactifyToggleSwitch } from '@/components/reactify/toggle-switch';
import { Card, CardContent } from '@/components/ui/card';

export default function ReactifyToggleSwitchDemo() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState(false);

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-8">
        <div>
          <h3 className="font-semibold text-lg mb-3">Basic Toggle Switches</h3>
          <div className="flex flex-col items-start space-y-6">
            <ReactifyToggleSwitch
              id="notifications"
              label="Enable Notifications"
              checked={isNotificationsEnabled}
              onChange={(e) => setIsNotificationsEnabled(e.target.checked)}
            />
            <ReactifyToggleSwitch
              id="darkMode"
              label="Dark Mode"
              checked={isDarkMode}
              onChange={(e) => setIsDarkMode(e.target.checked)}
              labelPosition="left"
            />
             <ReactifyToggleSwitch
              id="noLabel"
              aria-label="Feature toggle without visible label"
            />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Toggle Switch Sizes</h3>
          <div className="flex flex-col items-start space-y-4">
            <ReactifyToggleSwitch
              id="analytics-sm"
              label="Small Toggle"
              size="sm"
            />
            <ReactifyToggleSwitch
              id="analytics-md"
              label="Medium Toggle (Default)"
              size="md"
              checked={isAnalyticsEnabled}
              onChange={(e) => setIsAnalyticsEnabled(e.target.checked)}
            />
             <ReactifyToggleSwitch
              id="analytics-lg"
              label="Large Toggle"
              size="lg"
            />
          </div>
           <p className="text-sm text-muted-foreground mt-2">Medium toggle state: {isAnalyticsEnabled.toString()}</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-3">Disabled Toggle Switches</h3>
          <div className="space-y-4">
            <ReactifyToggleSwitch
              id="disabled-off"
              label="Disabled (Off)"
              disabled
            />
            <ReactifyToggleSwitch
              id="disabled-on"
              label="Disabled (On)"
              checked
              disabled
            />
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
