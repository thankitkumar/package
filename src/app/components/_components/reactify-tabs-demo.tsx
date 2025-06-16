
'use client';
import { ReactifyTabs, ReactifyTab } from '@/components/reactify/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { User, Settings, ShieldCheck } from 'lucide-react';

export default function ReactifyTabsDemo() {
  const handleTabChange = (index: number) => {
    console.log(`Switched to tab index: ${index}`);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-8">
        <div>
          <h3 className="font-semibold text-lg mb-3">Line Tabs (Default)</h3>
          <ReactifyTabs onTabChange={handleTabChange} defaultActiveTab={0}>
            <ReactifyTab label="Profile">
              <div className="p-4 bg-muted/30 rounded-md">
                <User className="inline-block mr-2 h-5 w-5" />
                This is the profile content area. You can put detailed user information here.
              </div>
            </ReactifyTab>
            <ReactifyTab label="Settings">
              <div className="p-4 bg-muted/30 rounded-md">
                <Settings className="inline-block mr-2 h-5 w-5" />
                This is the settings content. Manage your preferences.
              </div>
            </ReactifyTab>
            <ReactifyTab label="Security" disabled>
              <div className="p-4 bg-muted/30 rounded-md">
                <ShieldCheck className="inline-block mr-2 h-5 w-5" />
                This tab is disabled. Security settings would be here.
              </div>
            </ReactifyTab>
             <ReactifyTab label="Notifications">
              <div className="p-4 bg-muted/30 rounded-md">
                Configure your notification preferences.
              </div>
            </ReactifyTab>
          </ReactifyTabs>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Enclosed Tabs</h3>
          <ReactifyTabs variant="enclosed" defaultActiveTab={1}>
            <ReactifyTab label="Analytics">
              <p>Detailed analytics and reports would be displayed here.</p>
            </ReactifyTab>
            <ReactifyTab label="Users">
              <p>Manage users, roles, and permissions from this section.</p>
            </ReactifyTab>
            <ReactifyTab label="Billing">
              <p>View your subscription details and payment history.</p>
            </ReactifyTab>
          </ReactifyTabs>
        </div>
      </CardContent>
    </Card>
  );
}
