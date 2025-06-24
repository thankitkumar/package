'use client';
import { useState, useCallback } from 'react';
import { ReactifyModal } from '@/components/reactify/modal';
import { ReactifyButton } from '@/components/reactify/button';
import { ReactifyInput } from '@/components/reactify/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

export default function ReactifyModalDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleCloseBasicModal = useCallback(() => setIsModalOpen(false), []);
  const handleOpenBasicModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseFormModal = useCallback(() => setIsFormModalOpen(false), []);
  const handleOpenFormModal = useCallback(() => setIsFormModalOpen(true), []);

  const handleConfirmAction = useCallback(() => {
    setIsModalOpen(false);
    alert('Action Confirmed!');
  }, []);
  
  const handleSubscribeAction = useCallback(() => {
    setIsFormModalOpen(false);
    alert('Subscribed!');
  }, []);


  const codeExample = `
import { useState } from 'react';
import { ReactifyModal } from '@/components/reactify/modal';
import { ReactifyButton } from '@/components/reactify/button';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ReactifyButton onClick={() => setIsOpen(true)}>Open Modal</ReactifyButton>
      <ReactifyModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="My Modal Title"
        footer={
          <>
            <ReactifyButton variant="outline" onClick={() => setIsOpen(false)}>Cancel</ReactifyButton>
            <ReactifyButton variant="primary" onClick={() => { alert('Confirmed!'); setIsOpen(false); }}>Confirm</ReactifyButton>
          </>
        }
      >
        <p>This is the content of the modal. You can put any React nodes here.</p>
      </ReactifyModal>
    </>
  );
}
  `;

  const accessibilityNotes = [
    "Modals should be announced by screen readers when opened. Use `role='dialog'` and `aria-modal='true'`.",
    "Provide a clear title for the modal using `aria-labelledby` referencing the title element.",
    "Focus should be trapped within the modal when it's open.",
    "The modal should be closable via the Escape key.",
    "Ensure there is a clearly identifiable close button.",
    "When the modal closes, focus should return to the element that triggered it.",
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Basic Modal</h3>
          <ReactifyButton onClick={handleOpenBasicModal}>Open Basic Modal</ReactifyButton>
        </div>
        
        <ReactifyModal
          isOpen={isModalOpen}
          onClose={handleCloseBasicModal}
          title="Sample Modal"
          footer={
            <>
              <ReactifyButton variant="outline" onClick={handleCloseBasicModal}>
                Cancel
              </ReactifyButton>
              <ReactifyButton variant="primary" onClick={handleConfirmAction}>
                Confirm Action
              </ReactifyButton>
            </>
          }
        >
          <p className="text-sm text-muted-foreground mb-4">
            This is a demonstration of the Reactify Modal component. It can contain various types of content and interactive elements.
          </p>
          <p>
            Press <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Esc</kbd> key or click outside to close.
          </p>
        </ReactifyModal>

        <div>
          <h3 className="font-semibold text-lg mb-2">Modal with Form</h3>
          <ReactifyButton onClick={handleOpenFormModal}>Open Form Modal</ReactifyButton>
        </div>

        <ReactifyModal
          isOpen={isFormModalOpen}
          onClose={handleCloseFormModal}
          title="Subscribe to Newsletter"
          footer={
            <>
              <ReactifyButton variant="outline" onClick={handleCloseFormModal}>
                Close
              </ReactifyButton>
              <ReactifyButton variant="primary" onClick={handleSubscribeAction}>
                Subscribe
              </ReactifyButton>
            </>
          }
        >
          <form className="space-y-4">
            <div>
              <Label htmlFor="modal-name" className="block text-sm font-medium mb-1">Full Name</Label>
              <ReactifyInput type="text" id="modal-name" placeholder="John Doe" />
            </div>
            <div>
              <Label htmlFor="modal-email" className="block text-sm font-medium mb-1">Email Address</Label>
              <ReactifyInput type="email" id="modal-email" placeholder="john.doe@example.com" />
            </div>
          </form>
        </ReactifyModal>
      </CardContent>
    </Card>
  );
}
