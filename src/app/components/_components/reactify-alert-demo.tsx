
'use client';
import { ReactifyAlert } from '@/components/reactify/alert';
import { Card, CardContent } from '@/components/ui/card';
import { ReactifyButton } from '@/components/reactify/button';
import { useState } from 'react';

export default function ReactifyAlertDemo() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Alert Variants</h3>
          <div className="space-y-4">
            <ReactifyAlert variant="info" title="Information">
              This is an informational message.
            </ReactifyAlert>
            <ReactifyAlert variant="success" title="Success!" icon={<CheckCircle className="h-5 w-5 text-green-500" />}>
              Your action was completed successfully.
            </ReactifyAlert>
            <ReactifyAlert variant="warning" title="Warning" icon={false}>
              Please be cautious with this action. (No default icon)
            </ReactifyAlert>
            <ReactifyAlert variant="destructive" title="Error Occurred">
              Something went wrong. Please try again.
            </ReactifyAlert>
          </div>
        </div>

        <div>
            <h3 className="font-semibold text-lg mb-2 mt-6">Alert without Title</h3>
            <ReactifyAlert variant="info">
                This alert only has a description body.
            </ReactifyAlert>
        </div>

        {showAlert && (
            <div className='mt-6'>
                <h3 className="font-semibold text-lg mb-2">Dismissible (Example)</h3>
                 <ReactifyAlert variant="success" title="Update Available">
                    A new version of the application is ready to install.
                    <div className="mt-2">
                        <ReactifyButton variant="outline" size="sm" onClick={() => setShowAlert(false)} className="bg-green-100 hover:bg-green-200 border-green-400 text-green-800">
                            Dismiss
                        </ReactifyButton>
                    </div>
                </ReactifyAlert>
            </div>
        )}
        {!showAlert && (
            <ReactifyButton onClick={() => setShowAlert(true)} className="mt-4">Reset Dismissible Alert</ReactifyButton>
        )}


      </CardContent>
    </Card>
  );
}

// Minimal icon for demo purposes if not using lucide directly in ReactifyAlert
const CheckCircle = ({className = ""}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.06-1.06L10.5 12.19l-1.72-1.72a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.5-4.5z" clipRule="evenodd" />
  </svg>
);
