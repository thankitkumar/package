
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, AlertTriangle, CheckCircle, Info, Sparkles, Package, MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Note: We are primarily using Tailwind CSS transitions and animations.

interface ListItem {
  id: number;
  text: string;
}

export default function MicroAnimationsPage() {
  const [showElement, setShowElement] = useState(true);
  const [listItems, setListItems] = useState<ListItem[]>([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
  ]);
  const [newItemText, setNewItemText] = useState('');
  const [buttonClickState, setButtonClickState] = useState(false);

  // For entrance animations on initial load
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    // Ensure this runs only on the client after mount
    const timer = setTimeout(() => setHasLoaded(true), 100); // Small delay to ensure initial render
    return () => clearTimeout(timer);
  }, []);

  const addListItem = () => {
    if (newItemText.trim()) {
      setListItems(prev => [...prev, { id: Date.now(), text: newItemText.trim() }]);
      setNewItemText('');
    }
  };

  const removeListItem = (idToRemove: number) => {
    // For CSS-only, immediate removal is simpler.
    // Libraries like Framer Motion handle exit animations better.
    setListItems(prev => prev.filter((item) => item.id !== idToRemove));
  };

  const handleButtonClick = () => {
    setButtonClickState(true);
    setTimeout(() => setButtonClickState(false), 150); // Reset after animation duration
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <Sparkles className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold text-foreground">Micro Animation Showcase</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Explore examples of subtle UI animations using Tailwind CSS transitions and the <code className="font-code bg-muted px-1 rounded-sm">tailwindcss-animate</code> plugin.
        </p>
      </div>

      <div className="space-y-12">
        {/* Hover Animations */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Hover Animations</CardTitle>
            <CardDescription>Subtle feedback when users hover over elements.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-6 items-center justify-center p-8">
            <Button
              className="transition-all duration-300 ease-in-out hover:scale-110 hover:bg-primary/80 hover:shadow-lg"
            >
              Scale Me
            </Button>
            <Card className="p-6 w-48 h-32 flex items-center justify-center text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl cursor-default bg-secondary">
              <p className="text-secondary-foreground">Lift Me Up</p>
            </Card>
            <div className="group relative p-2">
              <Button variant="outline" className="group-hover:text-primary transition-colors">
                Hover for Icon <Heart className="inline-block ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform group-hover:scale-125" />
              </Button>
            </div>
            <Button variant="ghost" className="group text-muted-foreground hover:text-foreground transition-colors">
                Learn More <MoveRight className="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"/>
            </Button>
          </CardContent>
        </Card>

        {/* Entrance Animations */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Entrance Animations</CardTitle>
            <CardDescription>Elements animating on first appearance using <code className="font-code bg-muted px-1 rounded-sm">tailwindcss-animate</code>.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 grid md:grid-cols-2 gap-4">
            <div className={cn(
              "p-4 bg-primary/10 rounded-md border border-primary/20",
              hasLoaded ? "animate-in fade-in slide-in-from-left-12 duration-500" : "opacity-0"
            )}>
              <p className="text-primary font-semibold flex items-center gap-2"><Package size={20}/>Slid in from left!</p>
            </div>
            <div className={cn(
              "p-4 bg-accent/10 rounded-md border border-accent/20",
              hasLoaded ? "animate-in fade-in slide-in-from-right-12 duration-500 delay-100" : "opacity-0"
            )}>
              <p className="text-accent font-semibold flex items-center gap-2"><Package size={20}/>Slid in from right!</p>
            </div>
            <div className={cn(
              "p-4 bg-green-500/10 rounded-md border border-green-500/20",
              hasLoaded ? "animate-in fade-in zoom-in-90 duration-500 delay-200" : "opacity-0"
            )}>
              <p className="text-green-600 font-semibold flex items-center gap-2"><CheckCircle size={20}/>Zoomed in!</p>
            </div>
             <div className={cn(
              "p-4 bg-yellow-500/10 rounded-md border border-yellow-500/20",
              hasLoaded ? "animate-in fade-in slide-in-from-bottom-12 duration-500 delay-300" : "opacity-0"
            )}>
              <p className="text-yellow-700 font-semibold flex items-center gap-2"><AlertTriangle size={20}/>Slid from bottom!</p>
            </div>
          </CardContent>
        </Card>

        {/* Focus Animations */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Focus Animations</CardTitle>
             <CardDescription>Highlighting interactive elements when they receive focus.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div>
              <Label htmlFor="focus-input">Focus this input</Label>
              <Input
                id="focus-input"
                placeholder="Focus will expand ring"
                className="transition-all duration-200 focus:ring-4 focus:ring-offset-0 focus:border-primary mt-1"
              />
            </div>
            <Button variant="outline" className="focus:scale-105 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-transform">Focusable Button</Button>
          </CardContent>
        </Card>

        {/* Click Feedback */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Click Feedback</CardTitle>
            <CardDescription>Visual response when a button is clicked.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <Button
              onClick={handleButtonClick}
              className={cn(
                "transition-transform duration-100 ease-out",
                buttonClickState ? "scale-95" : "scale-100"
              )}
            >
              Click Me for Feedback
            </Button>
            <p className="text-xs text-muted-foreground mt-2">Button scales down briefly on click.</p>
          </CardContent>
        </Card>

        {/* Conditional Rendering Animations */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Conditional Rendering (Show/Hide)</CardTitle>
            <CardDescription>Animating elements as they appear or disappear.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            <Button onClick={() => setShowElement(!showElement)}>
              {showElement ? 'Hide' : 'Show'} Element
            </Button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-500 ease-in-out",
                showElement ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Info size={20}/>Revealed Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>This element smoothly fades and expands/collapses. For more complex enter/exit animations on list items or keyed elements, a library like Framer Motion's <code className="font-code bg-muted px-1 rounded-sm">AnimatePresence</code> is often preferred.</p>
                  <Image src="https://placehold.co/400x200.png" data-ai-hint="abstract waves" alt="Abstract placeholder" width={400} height={200} className="mt-4 rounded-md"/>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Animated List (Simple Add/Remove) */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Animated List (Additions)</CardTitle>
            <CardDescription>Animating new items as they are added to a list.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            <div className="flex gap-2 mb-4">
              <Input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="New item text"
                className="flex-grow"
                onKeyDown={(e) => e.key === 'Enter' && addListItem()}
              />
              <Button onClick={addListItem}>Add Item</Button>
            </div>
            <ul className="space-y-2">
              {listItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center p-3 bg-background border rounded-md animate-in fade-in-0 slide-in-from-bottom-5 duration-300"
                >
                  <span>{item.text}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeListItem(item.id)} className="text-destructive hover:text-destructive/80">
                    <AlertTriangle size={16} className="mr-1 hidden sm:inline-block"/> Remove
                  </Button>
                </li>
              ))}
            </ul>
            {listItems.length === 0 && <p className="text-muted-foreground text-sm text-center py-4">No items in the list. Add some!</p>}
          </CardContent>
        </Card>

        {/* Tab Switch Animations */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Tab Switch Animations</CardTitle>
            <CardDescription>Smooth transitions when switching between tabs.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="pt-2 animate-in fade-in-50 duration-300">
                <Card className="border-primary/30">
                  <CardHeader><CardTitle>Account Details</CardTitle></CardHeader>
                  <CardContent><p>Make changes to your account here. This content fades in when the tab becomes active.</p></CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="password" className="pt-2 animate-in fade-in-50 duration-300">
                 <Card className="border-accent/30">
                  <CardHeader><CardTitle>Change Password</CardTitle></CardHeader>
                  <CardContent><p>Update your password settings. Enjoy the smooth transition!</p></CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="notifications" className="pt-2 animate-in fade-in-50 duration-300">
                 <Card className="border-green-500/30">
                  <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
                  <CardContent><p>Manage how you receive notifications. The content animates in!</p></CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <p className="text-xs text-muted-foreground mt-4">
              ShadCN Tabs use <code className="font-code bg-muted px-1 py-0.5 rounded-sm">tailwindcss-animate</code> for indicator movement. The content fade-in is added here for extra flair.
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-12">
          These examples primarily use utility classes from Tailwind CSS and the <code className="font-code bg-muted px-1 py-0.5 rounded-sm">tailwindcss-animate</code> plugin.
          For more complex, timeline-based, or physics-based animations, consider integrating a dedicated JavaScript animation library like Framer Motion or GSAP.
        </p>
      </div>
    </div>
  );
}
