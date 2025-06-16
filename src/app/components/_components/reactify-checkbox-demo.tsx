
'use client';
import { useState } from 'react';
import { ReactifyCheckbox } from '@/components/reactify/checkbox';
import { Card, CardContent } from '@/components/ui/card';

export default function ReactifyCheckboxDemo() {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedSmall, setIsCheckedSmall] = useState(true);
  const [isCheckedLarge, setIsCheckedLarge] = useState(false);

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-3">Basic Checkbox</h3>
          <ReactifyCheckbox
            id="terms"
            label="Accept terms and conditions"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <p className="text-sm text-muted-foreground mt-2">Checked: {isChecked.toString()}</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Checkbox Sizes</h3>
          <div className="space-y-3">
            <ReactifyCheckbox
              id="subscribe-sm"
              label="Small checkbox"
              size="sm"
              checked={isCheckedSmall}
              onChange={(e) => setIsCheckedSmall(e.target.checked)}
            />
            <ReactifyCheckbox
              id="subscribe-md"
              label="Medium checkbox (default)"
              size="md"
            />
             <ReactifyCheckbox
              id="subscribe-lg"
              label="Large checkbox"
              size="lg"
              checked={isCheckedLarge}
              onChange={(e) => setIsCheckedLarge(e.target.checked)}
            />
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-3">Disabled Checkbox</h3>
          <div className="space-y-3">
            <ReactifyCheckbox
              id="disabled-unchecked"
              label="Disabled and unchecked"
              disabled
            />
            <ReactifyCheckbox
              id="disabled-checked"
              label="Disabled and checked"
              checked
              disabled
            />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Checkbox without Label</h3>
           <ReactifyCheckbox
              id="no-label-checkbox"
              aria-label="Standalone checkbox"
            />
        </div>

      </CardContent>
    </Card>
  );
}
