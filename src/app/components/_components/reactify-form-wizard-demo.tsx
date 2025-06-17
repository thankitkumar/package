
'use client';

import { ReactifyFormWizard, type WizardStepConfig } from '@/components/reactify/form-wizard';
import { ReactifyCard, ReactifyCardContent, ReactifyCardDescription, ReactifyCardHeader, ReactifyCardTitle } from '@/components/reactify/card';
import { z } from 'zod';
import { useState } from 'react';
import { CodeBlock } from '@/components/ui/code-block';

const stepsConfig: WizardStepConfig[] = [
  {
    id: 'personalDetails',
    title: 'Personal Information',
    description: 'Please provide your basic personal details.',
    fields: [
      { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'e.g., Jane Doe', defaultValue: '' },
      { name: 'email', label: 'Email Address', type: 'email', placeholder: 'jane.doe@example.com', defaultValue: '' },
      { name: 'age', label: 'Age', type: 'number', placeholder: 'Enter your age', defaultValue: '' },
    ],
    schema: z.object({
      fullName: z.string().min(3, 'Full name must be at least 3 characters.').max(50, 'Full name too long.'),
      email: z.string().email('Please enter a valid email address.'),
      age: z.coerce.number().min(18, 'You must be at least 18 years old.').max(100, 'Age seems unlikely.'),
    }),
  },
  {
    id: 'addressInfo',
    title: 'Address Details',
    description: 'Where do you live?',
    fields: [
      { name: 'streetAddress', label: 'Street Address', type: 'text', placeholder: '123 Main Street', defaultValue: '' },
      { name: 'city', label: 'City', type: 'text', placeholder: 'Anytown', defaultValue: '' },
      { name: 'zipCode', label: 'ZIP / Postal Code', type: 'text', placeholder: '12345', defaultValue: '' },
      { name: 'notes', label: 'Additional Notes (Optional)', type: 'textarea', placeholder: 'e.g., gate code, delivery instructions', defaultValue: '' },
    ],
    schema: z.object({
      streetAddress: z.string().min(5, 'Street address seems too short.').max(100),
      city: z.string().min(2, 'City name seems too short.').max(50),
      zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format.'),
      notes: z.string().max(200, 'Notes too long.').optional(),
    }),
  },
  {
    id: 'confirmation',
    title: 'Confirmation',
    description: 'Please review your information before submitting.',
    fields: [], // No fields, this step will display a summary
    schema: z.object({}), // No validation needed for the confirmation step itself
  },
];

export default function ReactifyFormWizardDemo() {
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleWizardSubmit = (data: Record<string, any>) => {
    console.log('Wizard submitted data:', data);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubmittedData(data);
      setIsLoading(false);
      alert('Form Wizard Submitted! Data logged to console and displayed below.');
    }, 1500);
  };

  return (
    <div className="w-full space-y-8">
      <ReactifyCard className="max-w-2xl mx-auto">
        <ReactifyCardHeader>
          <ReactifyCardTitle>Multi-Step Registration Form</ReactifyCardTitle>
          <ReactifyCardDescription>
            This demo showcases the Form Wizard component. Navigate through steps, and your data will be remembered.
          </ReactifyCardDescription>
        </ReactifyCardHeader>
        <ReactifyCardContent>
          {!submittedData ? (
            <ReactifyFormWizard
              steps={stepsConfig}
              onFinalSubmit={handleWizardSubmit}
              loading={isLoading}
              // You can customize button texts:
              // nextButtonText="Continue"
              // prevButtonText="Go Back"
              // submitButtonText="Complete Registration"
            />
          ) : (
            <div>
              <h3 className="text-xl font-semibold mb-3 text-green-600">Registration Complete!</h3>
              <p className="text-muted-foreground mb-4">Thank you. Here is the data you submitted:</p>
              <CodeBlock code={JSON.stringify(submittedData, null, 2)} lang="json" />
              <button
                onClick={() => setSubmittedData(null)}
                className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Start Over
              </button>
            </div>
          )}
        </ReactifyCardContent>
      </ReactifyCard>
    </div>
  );
}
