
'use client';

import { useState, useEffect } from 'react';
import { ReactifySmartEmptyState } from '@/components/reactify/smart-empty-state';
import { ReactifyButton } from '@/components/reactify/button';
import { ReactifyCard, ReactifyCardHeader, ReactifyCardTitle, ReactifyCardContent } from '@/components/reactify/card';
import { ReactifySkeletonLoader } from '@/components/reactify/skeleton-loader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Ghost, PlusCircle, SearchX, Loader2 } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  value: number;
}

export default function ReactifySmartEmptyStateDemo() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCustomEmptyState, setShowCustomEmptyState] = useState(false);
  const [showCustomLoadingState, setShowCustomLoadingState] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      // Simulate fetching data - start with empty for demo clarity
      setItems([]); 
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddItem = () => {
    setItems(prev => [...prev, { id: `item-${prev.length + 1}`, name: `New Item ${prev.length + 1}`, value: Math.floor(Math.random() * 100) }]);
  };

  const handleClearItems = () => {
    setItems([]);
  };
  
  const handleToggleLoading = () => {
     setIsLoading(prev => !prev);
  };

  const customLoadingComponent = (
    <div className="flex flex-col items-center justify-center p-10 text-center border-2 border-dashed rounded-lg border-primary/30 bg-primary/5 min-h-[250px]">
      <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
      <h3 className="text-lg font-semibold text-primary">Loading Awesome Data...</h3>
      <p className="text-primary/80">Please wait a moment.</p>
    </div>
  );

  const customEmptyStateComponent = (
    <div className="flex flex-col items-center justify-center p-10 text-center border-2 border-dashed rounded-lg border-accent/30 bg-accent/5 min-h-[250px]">
      <SearchX className="h-16 w-16 text-accent/70 mb-4" />
      <h3 className="text-xl font-semibold text-accent mb-2">Oops! Nothing Here.</h3>
      <p className="text-accent/80 mb-5 max-w-sm">
        This is a fully custom empty state. You can put any JSX content you like here!
      </p>
      <ReactifyButton variant="secondary" onClick={handleAddItem} leftIcon={<PlusCircle size={18}/>} className="bg-accent/20 text-accent hover:bg-accent/30 border-accent/50">
        Try Adding an Item
      </ReactifyButton>
    </div>
  );

  return (
    <div className="space-y-10">
      <ReactifyCard>
        <ReactifyCardHeader>
          <ReactifyCardTitle>Controls</ReactifyCardTitle>
        </ReactifyCardHeader>
        <ReactifyCardContent className="flex flex-wrap gap-3">
          <ReactifyButton onClick={handleAddItem} leftIcon={<PlusCircle size={16}/>}>Add Item</ReactifyButton>
          <ReactifyButton onClick={handleClearItems} variant="destructive">Clear All Items</ReactifyButton>
          <ReactifyButton onClick={handleToggleLoading} variant="outline">
            {isLoading ? 'Stop Loading' : 'Simulate Loading'}
          </ReactifyButton>
           <div className="flex items-center gap-2">
            <Input type="checkbox" id="custom-empty" checked={showCustomEmptyState} onChange={() => setShowCustomEmptyState(p => !p)} className="h-4 w-4"/>
            <Label htmlFor="custom-empty" className="text-sm">Use Custom Empty State</Label>
          </div>
           <div className="flex items-center gap-2">
            <Input type="checkbox" id="custom-loading" checked={showCustomLoadingState} onChange={() => setShowCustomLoadingState(p => !p)} className="h-4 w-4"/>
            <Label htmlFor="custom-loading" className="text-sm">Use Custom Loading State</Label>
          </div>
        </ReactifyCardContent>
      </ReactifyCard>

      {/* Example 1: List with Default Empty State */}
      <ReactifyCard>
        <ReactifyCardHeader>
          <ReactifyCardTitle>Item List (Default Empty/Loading States)</ReactifyCardTitle>
        </ReactifyCardHeader>
        <ReactifyCardContent>
          <ReactifySmartEmptyState
            data={items}
            isLoading={isLoading}
            emptyStateTitle="Your Item List is Empty"
            emptyStateDescription="Looks like you haven't added any items yet. Get started by clicking the button below!"
            emptyStateIcon={<Ghost className="h-16 w-16 text-muted-foreground/70" />}
            emptyStateActions={
              <ReactifyButton onClick={handleAddItem} leftIcon={<PlusCircle size={18}/>}>
                Add First Item
              </ReactifyButton>
            }
            loadingStateContent={showCustomLoadingState ? customLoadingComponent : undefined}
          >
            <ul className="space-y-2">
              {items.map(item => (
                <li key={item.id} className="p-3 border rounded-md bg-background shadow-sm">
                  {item.name} - Value: {item.value}
                </li>
              ))}
            </ul>
          </ReactifySmartEmptyState>
        </ReactifyCardContent>
      </ReactifyCard>

      {/* Example 2: Table with Custom Empty State */}
      <ReactifyCard>
        <ReactifyCardHeader>
          <ReactifyCardTitle>Data Table (Custom Empty State if toggled)</ReactifyCardTitle>
        </ReactifyCardHeader>
        <ReactifyCardContent>
          <ReactifySmartEmptyState
            data={items}
            isLoading={isLoading}
            emptyStateContent={showCustomEmptyState ? customEmptyStateComponent : undefined}
            // For default empty state, if custom is not toggled:
            emptyStateTitle="No Entries in Table"
            emptyStateDescription="The table is currently empty. Add some items to populate it."
            emptyStateActions={
                 <ReactifyButton onClick={handleAddItem} leftIcon={<PlusCircle size={18}/>} variant="secondary">
                    Add Table Entry
                </ReactifyButton>
            }
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">{item.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ReactifySmartEmptyState>
        </ReactifyCardContent>
      </ReactifyCard>

      {/* Example 3: Dashboard Widget (Minimal, relies on parent for structure) */}
       <ReactifyCard>
        <ReactifyCardHeader>
          <ReactifyCardTitle>Minimal Widget Area</ReactifyCardTitle>
        </ReactifyCardHeader>
        <ReactifyCardContent>
          <ReactifySmartEmptyState
            data={items.slice(0,1)} // Only show one item for this demo
            isLoading={isLoading}
            emptyStateTitle="Widget Data Unavailable"
            emptyStateDescription="This widget has no data to display."
            emptyStateIcon={null} // No icon for this one
            stateContainerClassName="min-h-[150px] bg-transparent border-none shadow-none p-0" // Custom styling for the state container
          >
            <div className="p-4 bg-green-100 text-green-700 rounded-md">
                <h4 className="font-bold">Active Item:</h4>
                {items[0] && <p>{items[0].name} (Value: {items[0].value})</p>}
            </div>
          </ReactifySmartEmptyState>
        </ReactifyCardContent>
      </ReactifyCard>
    </div>
  );
}
