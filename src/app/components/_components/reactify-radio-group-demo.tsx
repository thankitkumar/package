
'use client';
import { useState } from 'react';
import { ReactifyRadioGroup, ReactifyRadioButton } from '@/components/reactify/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label'; // For group label

export default function ReactifyRadioGroupDemo() {
  const [selectedValue, setSelectedValue] = useState('option2');
  const [foodValue, setFoodValue] = useState<string | undefined>(undefined);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Radio Group Examples</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        <div>
          <Label id="options-label" className="font-semibold text-lg mb-2 block">Choose an Option (Controlled)</Label>
          <ReactifyRadioGroup
            name="options"
            aria-labelledby="options-label"
            value={selectedValue}
            onChange={setSelectedValue}
            className="mt-2"
          >
            <ReactifyRadioButton value="option1" label="Option 1" />
            <ReactifyRadioButton value="option2" label="Option 2" />
            <ReactifyRadioButton value="option3" label="Option 3 (this one is quite long to test wrapping)" />
          </ReactifyRadioGroup>
          <p className="text-sm text-muted-foreground mt-2">Selected: {selectedValue}</p>
        </div>

        <div>
          <Label id="food-label" className="font-semibold text-lg mb-2 block">Favorite Food (Uncontrolled, Horizontal, Sizes)</Label>
          <ReactifyRadioGroup name="food" defaultValue="pizza" orientation="horizontal" aria-labelledby="food-label" onChange={setFoodValue} className="mt-2 items-center flex-wrap">
            <ReactifyRadioButton value="pizza" label="Pizza" size="sm" />
            <ReactifyRadioButton value="burger" label="Burger" size="md" />
            <ReactifyRadioButton value="pasta" label="Pasta" size="lg" />
            <ReactifyRadioButton value="sushi" label="Sushi" size="md" />
          </ReactifyRadioGroup>
          {foodValue && <p className="text-sm text-muted-foreground mt-2">Uncontrolled selected: {foodValue}</p>}
        </div>
        
        <div>
          <Label id="disabled-label" className="font-semibold text-lg mb-2 block">Disabled Radio Group</Label>
          <ReactifyRadioGroup name="disabledOptions" defaultValue="yes" disabled aria-labelledby="disabled-label" className="mt-2">
            <ReactifyRadioButton value="yes" label="Yes" />
            <ReactifyRadioButton value="no" label="No" />
          </ReactifyRadioGroup>
        </div>

         <div>
          <Label id="item-disabled-label" className="font-semibold text-lg mb-2 block">Individually Disabled Item</Label>
          <ReactifyRadioGroup name="itemDisabledOptions" defaultValue="active" aria-labelledby="item-disabled-label" className="mt-2">
            <ReactifyRadioButton value="active" label="Active" />
            <ReactifyRadioButton value="inactive" label="Inactive" />
            <ReactifyRadioButton value="disabled" label="Disabled Item" disabled />
          </ReactifyRadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
