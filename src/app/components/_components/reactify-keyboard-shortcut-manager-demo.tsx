
'use client';

import { useEffect } from 'react';
import { useKeyboardShortcuts, type Shortcut } from '@/contexts/keyboard-shortcut-context';
import { ReactifyCard, ReactifyCardContent, ReactifyCardHeader, ReactifyCardTitle, ReactifyCardDescription } from '@/components/reactify/card';
import { ReactifyButton } from '@/components/reactify/button';
import { useToast } from '@/hooks/use-toast';
import { Command } from 'lucide-react';

export default function ReactifyKeyboardShortcutManagerDemo() {
  const { registerShortcut, unregisterShortcut, openPalette } = useKeyboardShortcuts();
  const { toast } = useToast();

  useEffect(() => {
    const demoShortcuts: Shortcut[] = [
      {
        id: 'demo-save-file', // Changed ID to be more specific
        name: 'Save File',    // Changed name
        keys: ['Control', 's'],
        macKeys: ['Meta', 's'],
        action: (e) => {
          e.preventDefault();
          toast({ title: 'Shortcut: Save File', description: 'Ctrl/Cmd + S pressed!' });
        },
        group: 'File Actions',
      },
      {
        id: 'demo-open-palette-explicit', // Changed ID
        name: 'Open Command Palette',
        keys: ['Control', 'k'],
        macKeys: ['Meta', 'k'],
        action: (e) => {
          // The global listener in context already handles this for toggle.
          // This registration is mainly for it to appear in the palette.
          // If called from palette, it might re-open if not careful, so we just log.
          // The actual toggle is better handled by the context's global listener.
          e.preventDefault();
          // openPalette(); // Avoid re-triggering, context handles toggle
           toast({ title: 'Info', description: 'Palette toggled via Ctrl/Cmd+K (handled globally).' });
        },
        group: 'Navigation',
      },
      {
        id: 'demo-show-help', // Changed ID
        name: 'Show Help Dialog', // Changed name
        keys: ['Shift', 'Control', '/'], // Using '/' which is often paired with '?' on keyboards
        macKeys: ['Shift', 'Meta', '/'],
        action: (e) => {
          e.preventDefault();
          toast({ title: 'Shortcut: Show Help', description: 'Shift + Ctrl/Cmd + / (or ?) pressed!' });
        },
        group: 'General',
      },
      {
        id: 'demo-perform-action-one', // Changed ID
        name: 'Perform Demo Action One', // Changed name
        keys: ['Alt', '1'],
        macKeys: ['Alt', '1'], // Alt is often Option (⌥) on Mac
        action: (e) => {
          e.preventDefault();
          toast({ title: 'Action One Triggered', description: 'Alt + 1 pressed!' });
        },
        group: 'Demo Actions',
      },
       {
        id: 'disabled-shortcut-demo', // Changed ID
        name: 'Example of a Disabled Shortcut', // Changed name
        keys: ['Control', 'd'],
        macKeys: ['Meta', 'd'],
        action: (e) => {
          e.preventDefault();
          toast({ title: 'This should not fire', variant: 'destructive' });
        },
        group: 'Demo Actions',
        disabled: true,
      },
    ];

    demoShortcuts.forEach(sc => registerShortcut(sc));

    // Cleanup: unregister shortcuts when the component unmounts
    return () => {
      demoShortcuts.forEach(sc => unregisterShortcut(sc.id));
    };
  }, [registerShortcut, unregisterShortcut, toast, openPalette]);

  return (
    <ReactifyCard className="w-full">
      <ReactifyCardHeader>
        <ReactifyCardTitle className="flex items-center gap-2">
            <Command size={24}/> Keyboard Shortcut Manager & Palette
        </ReactifyCardTitle>
        <ReactifyCardDescription>
          Demonstrates the keyboard shortcut manager. Press <kbd className="px-1.5 py-0.5 text-xs font-semibold text-muted-foreground bg-muted border border-border rounded-sm">Ctrl+K</kbd> (or <kbd className="px-1.5 py-0.5 text-xs font-semibold text-muted-foreground bg-muted border border-border rounded-sm">Cmd+K</kbd> on Mac) to open the shortcut palette.
        </ReactifyCardDescription>
      </ReactifyCardHeader>
      <ReactifyCardContent className="space-y-4">
        <p>
          The following shortcuts have been registered for this demo (visible in palette):
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li><strong>Save File:</strong> Ctrl/Cmd + S</li>
          <li><strong>Show Help Dialog:</strong> Ctrl/Cmd + Shift + / (or ?)</li>
          <li><strong>Perform Demo Action One:</strong> Alt + 1</li>
          <li><strong>Open Palette:</strong> Ctrl/Cmd + K (Global)</li>
          <li><strong>Disabled Shortcut Example:</strong> Ctrl/Cmd + D (Won't trigger)</li>
        </ul>
        <p>
          Try pressing these key combinations. Most actions will trigger a toast notification.
          The palette lists these shortcuts, allows searching, and can execute them.
        </p>
        <ReactifyButton onClick={() => openPalette()} variant="outline" leftIcon={<Command size={16}/>}>
          Open Shortcut Palette Manually
        </ReactifyButton>

        <div className="mt-6 pt-4 border-t">
            <h4 className="font-semibold text-md mb-2">Notes:</h4>
            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                <li>Shortcuts are registered globally via a React Context.</li>
                <li>The palette UI is a modal that can be triggered by a hotkey or button.</li>
                <li>The system differentiates Mac (Cmd, Opt, Ctrl symbols) vs. non-Mac (Ctrl, Alt) for display and matching.</li>
                <li>Basic input field focus detection helps prevent overriding all input behaviors, but complex scenarios might need refinement.</li>
                <li>The palette supports keyboard navigation (Up/Down arrows, Enter to execute, Esc to close).</li>
            </ul>
        </div>
      </ReactifyCardContent>
    </ReactifyCard>
  );
}
