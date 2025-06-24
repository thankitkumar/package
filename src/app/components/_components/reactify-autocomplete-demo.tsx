
'use client';

import { useState, useMemo, useCallback } from 'react';
import { ReactifyAutocomplete, type AutocompleteSuggestion } from '@/components/reactify/autocomplete';
import { ReactifyCard, ReactifyCardContent, ReactifyCardDescription, ReactifyCardHeader, ReactifyCardTitle } from '@/components/reactify/card';
import { Label } from '@/components/ui/label';

// Sample data for simple string suggestions
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Australia", "Austria",
  "Brazil", "Bulgaria", "Canada", "China", "Colombia", "Croatia", "Denmark", "Egypt",
  "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "India", "Indonesia",
  "Japan", "Kenya", "Mexico", "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan",

  "Peru", "Philippines", "Poland", "Portugal", "Romania", "Russia", "Saudi Arabia", "South Africa",
  "Spain", "Sweden", "Switzerland", "Turkey", "United Kingdom", "United States", "Vietnam"
];

// Sample data for object suggestions
interface Framework extends AutocompleteSuggestion {
  value: string;
  label: string;
  category: string;
}

const frameworks: Framework[] = [
  { value: 'next.js', label: 'Next.js', category: 'Frontend' },
  { value: 'sveltekit', label: 'SvelteKit', category: 'Frontend' },
  { value: 'nuxt.js', label: 'Nuxt.js', category: 'Frontend' },
  { value: 'remix', label: 'Remix', category: 'Frontend' },
  { value: 'astro', label: 'Astro', category: 'Frontend' },
  { value: 'express', label: 'Express.js', category: 'Backend' },
  { value: 'nestjs', label: 'NestJS', category: 'Backend' },
];


export default function ReactifyAutocompleteDemo() {
  // State for simple string autocomplete
  const [countryValue, setCountryValue] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>('');

  const filteredCountries = useMemo(() => {
    if (!countryValue) return [];
    return countries.filter(country =>
      country.toLowerCase().includes(countryValue.toLowerCase())
    );
  }, [countryValue]);

  // State for object autocomplete
  const [frameworkValue, setFrameworkValue] = useState('');
  const [selectedFramework, setSelectedFramework] = useState<Framework | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const filteredFrameworks = useMemo(() => {
    if (!frameworkValue) return [];
    return frameworks.filter(fw =>
      fw.label.toLowerCase().includes(frameworkValue.toLowerCase())
    );
  }, [frameworkValue]);
  
  const handleFrameworkChange = useCallback((value: string) => {
    setFrameworkValue(value);
    if (value.length > 0 && filteredFrameworks.length === 0) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 750); // Simulate network latency
    } else {
      setIsLoading(false);
    }
  }, [filteredFrameworks]);


  return (
    <div className="w-full space-y-8">
      <ReactifyCard>
        <ReactifyCardHeader>
          <ReactifyCardTitle>Autocomplete with Simple Suggestions</ReactifyCardTitle>
          <ReactifyCardDescription>An example using an array of strings. Type to search for a country.</ReactifyCardDescription>
        </ReactifyCardHeader>
        <ReactifyCardContent className="space-y-4">
          <div className="max-w-sm">
            <Label htmlFor="country-autocomplete">Select a Country</Label>
            <ReactifyAutocomplete<string>
              suggestions={filteredCountries}
              value={countryValue}
              onValueChange={setCountryValue}
              onSelect={(item) => setSelectedCountry(item)}
              placeholder="Search countries..."
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Selected Country: <span className="font-semibold text-primary">{selectedCountry || 'None'}</span>
          </p>
        </ReactifyCardContent>
      </ReactifyCard>

      <ReactifyCard>
        <ReactifyCardHeader>
          <ReactifyCardTitle>Autocomplete with Object Suggestions</ReactifyCardTitle>
          <ReactifyCardDescription>Using an array of objects, specifying a `labelKey`. This example also simulates a loading state.</ReactifyCardDescription>
        </ReactifyCardHeader>
        <ReactifyCardContent className="space-y-4">
           <div className="max-w-sm">
            <Label htmlFor="framework-autocomplete">Search a Framework</Label>
            <ReactifyAutocomplete<Framework>
              suggestions={filteredFrameworks}
              value={frameworkValue}
              onValueChange={handleFrameworkChange}
              onSelect={(item) => setSelectedFramework(item)}
              labelKey="label"
              isLoading={isLoading}
              placeholder="e.g., Next.js, SvelteKit..."
            />
          </div>
           <p className="text-sm text-muted-foreground">
            Selected Framework: <span className="font-semibold text-primary">{selectedFramework?.label || 'None'}</span>
             {selectedFramework && ` (Category: ${selectedFramework.category})`}
          </p>
        </ReactifyCardContent>
      </ReactifyCard>
    </div>
  );
}
