
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'; // Using ShadCN button for demo
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion'; // Placeholder if we were to use it
import { Heart, AlertTriangle, CheckCircle, Info, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

// Note: For this demo, we are primarily using Tailwind CSS transitions and animations.
// The Framer Motion import is a placeholder to acknowledge the user's mention,
// but we are not implementing Framer Motion-like timeline animations in this step.

export default function MicroAnimationsPage() {
  const [showElement, setShowElement] = useState(true);
  const [listItems, setListItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [newItemText, setNewItemText] = useState('');

  // For entrance animations on initial load
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    setHasLoaded(true);
  }, []);

  const addListItem = () => {
    if (newItemText.trim()) {
      setListItems(prev => [...prev, newItemText.trim()]);
      setNewItemText('');
    }
  };

  const removeListItem = (indexToRemove: number) => {
    setListItems(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <Sparkles className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold text-foreground">Micro Animation Showcase</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Explore examples of subtle UI animations using Tailwind CSS transitions and animations.
        </p>
      </div>

      <div className="space-y-12">
        {/* Hover Animations */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Hover Animations</CardTitle>
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
            <div className="group relative p-4">
              <Button variant="outline">Hover for Icon</Button>
              <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 ease-in-out" />
            </div>
          </CardContent>
        </Card>

        {/* Entrance Animations */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Entrance Animations</CardTitle>
            <p className="text-sm text-muted-foreground">Elements animating on first appearance (using tailwindcss-animate).</p>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            <div className={cn(
              "p-4 bg-primary/10 rounded-md transition-opacity duration-700 ease-out",
              hasLoaded ? "animate-in fade-in slide-in-from-left-12" : "opacity-0"
            )}>
              <p className="text-primary font-semibold">I slid in from the left!</p>
            </div>
            <div className={cn(
              "p-4 bg-accent/10 rounded-md transition-opacity duration-700 ease-out delay-200",
              hasLoaded ? "animate-in fade-in slide-in-from-top-12" : "opacity-0"
            )}>
              <p className="text-accent font-semibold">I slid in from the top (with delay)!</p>
            </div>
            <div className={cn(
              "p-4 bg-green-500/10 rounded-md transition-opacity duration-700 ease-out delay-300",
              hasLoaded ? "animate-in fade-in zoom-in-90" : "opacity-0"
            )}>
              <p className="text-green-600 font-semibold">I zoomed in!</p>
            </div>
          </CardContent>
        </Card>

        {/* Focus Animations */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Focus Animations</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            <div>
              <Label htmlFor="focus-input">Focus this input</Label>
              <Input
                id="focus-input"
                placeholder="Focus will expand ring"
                className="transition-all duration-200 focus:ring-4 focus:ring-offset-0 focus:border-primary"
              />
            </div>
            <Button variant="outline" className="focus:scale-105 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-transform">Focusable Button</Button>
          </CardContent>
        </Card>

        {/* Conditional Rendering Animations */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Conditional Rendering (Show/Hide)</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            <Button onClick={() => setShowElement(!showElement)}>
              {showElement ? 'Hide' : 'Show'} Element
            </Button>
            {/* Using AnimatePresence from framer-motion would be ideal here.
                For a CSS-only approach, it's trickier for enter/exit on conditional render.
                We'll simulate with CSS transitions on opacity and height.
            */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-500 ease-in-out",
                showElement ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="p-6 bg-muted rounded-md mt-4 border">
                <p>This element fades and collapses in and out.</p>
                <Info size={24} className="text-muted-foreground mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Animated List (Simple Add/Remove - using basic key-based re-render for CSS transitions) */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Animated List (Basic)</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            <div className="flex gap-2 mb-4">
              <Input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="New item text"
                className="flex-grow"
              />
              <Button onClick={addListItem}>Add Item</Button>
            </div>
            <ul className="space-y-2">
              {listItems.map((item, index) => (
                <li
                  key={item + index} // Key change helps trigger re-render; for true anim, Framer Motion's AnimatePresence is better
                  className="flex justify-between items-center p-3 bg-background border rounded-md animate-in fade-in-0 slide-in-from-bottom-5 duration-300"
                >
                  <span>{item}</span>
                  <Button variant="ghost" size="icon" onClick={() => removeListItem(index)} className="text-destructive hover:text-destructive/80">
                    <AlertTriangle size={16} />
                  </Button>
                </li>
              ))}
            </ul>
            {listItems.length === 0 && <p className="text-muted-foreground text-sm">No items in the list.</p>}
          </CardContent>
        </Card>

        {/* Tab Switch Animations */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Tab Switch Animations</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="pt-4 animate-in fade-in-0 duration-300">
                <Card>
                  <CardHeader><CardTitle>Account</CardTitle></CardHeader>
                  <CardContent><p>Make changes to your account here. (Content animates in)</p></CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="password" className="pt-4 animate-in fade-in-0 duration-300">
                 <Card>
                  <CardHeader><CardTitle>Password</CardTitle></CardHeader>
                  <CardContent><p>Change your password here. (Content animates in)</p></CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="notifications" className="pt-4 animate-in fade-in-0 duration-300">
                 <Card>
                  <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
                  <CardContent><p>Manage your notification settings. (Content animates in)</p></CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <p className="text-xs text-muted-foreground mt-4">
              The default ShadCN Tabs component uses <code className="font-code bg-muted px-1 py-0.5 rounded-sm">tailwindcss-animate</code> for subtle transitions on active tab indicator and content. The content fade-in is added here for demonstration.
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-12">
          These examples use utility classes from Tailwind CSS and <code className="font-code bg-muted px-1 py-0.5 rounded-sm">tailwindcss-animate</code>.
          For more complex, timeline-based, or physics-based animations, a dedicated library like Framer Motion would be recommended.
        </p>
      </div>
    </div>
  );
}
