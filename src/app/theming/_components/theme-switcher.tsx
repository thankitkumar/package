'use client';

import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input'; // Using ShadCN Input for controls
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ColorSetting {
  id: string;
  label: string;
  variableName: string; // e.g., '--primary-hue'
  cssProperty: string; // e.g., 'primary' for hsl(var(--primary))
  type: 'color' | 'text'; // Simplified for this demo
}

const initialColors = {
  primary: 'hsl(209, 100%, 60%)', // Deep Sky Blue
  secondary: 'hsl(210, 40%, 96.1%)',
  accent: 'hsl(266, 100%, 46%)', // Electric Indigo
  background: 'hsl(210, 29%, 95%)', // Light Gray
};

// Function to parse HSL string to an object {h, s, l}
const parseHsl = (hslStr: string): { h: number, s: number, l: number } | null => {
  const match = hslStr.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
  if (match) {
    return { h: parseInt(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
  }
  return null;
};

// Function to convert HSL object to hex (simplified, not perfect)
const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return `#${[0, 8, 4]
    .map(n => Math.round(f(n) * 255).toString(16).padStart(2, '0'))
    .join('')}`;
};

// Function to convert Hex to HSL
const hexToHsl = (hex: string): { h: number, s: number, l: number } | null => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    } else {
        return null; // Invalid hex
    }

    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    return { h, s, l };
};


export function ThemeSwitcher() {
  const [themeColors, setThemeColors] = useState<{ [key: string]: string }>({});

  // Initialize colors from CSS variables on mount
  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const initialValues: { [key: string]: string } = {};
    Object.keys(initialColors).forEach(key => {
      const hslValue = `hsl(${rootStyle.getPropertyValue(`--${key}-h`) || parseHsl(initialColors[key])?.h}, ${rootStyle.getPropertyValue(`--${key}-s`) || parseHsl(initialColors[key])?.s}%, ${rootStyle.getPropertyValue(`--${key}-l`) || parseHsl(initialColors[key])?.l}%)`;
      const parsed = parseHsl(hslValue);
      if(parsed) {
        initialValues[key] = hslToHex(parsed.h, parsed.s, parsed.l);
      } else {
        initialValues[key] = '#000000'; // fallback
      }
    });
    setThemeColors(initialValues);
  }, []);

  const handleColorChange = (key: string, hexColor: string) => {
    setThemeColors(prev => ({ ...prev, [key]: hexColor }));
    const hsl = hexToHsl(hexColor);
    if (hsl) {
      document.documentElement.style.setProperty(`--${key}`, `${hsl.h} ${hsl.s}% ${hsl.l}%`);
      // For primary, also update -h, -s, -l if they exist
      document.documentElement.style.setProperty(`--${key}-h`, `${hsl.h}`);
      document.documentElement.style.setProperty(`--${key}-s`, `${hsl.s}%`);
      document.documentElement.style.setProperty(`--${key}-l`, `${hsl.l}%`);

      // Update foreground for primary and accent if they exist
      if (key === 'primary' || key === 'accent') {
        const foregroundLuminance = hsl.l > 50 ? 10 : 90; // Simplified logic
        document.documentElement.style.setProperty(`--${key}-foreground`, `${hsl.h} ${Math.min(hsl.s, 20)}% ${foregroundLuminance}%`);
         document.documentElement.style.setProperty(`--${key}-foreground-h`, `${hsl.h}`);
        document.documentElement.style.setProperty(`--${key}-foreground-s`, `${Math.min(hsl.s, 20)}%`);
        document.documentElement.style.setProperty(`--${key}-foreground-l`, `${foregroundLuminance}%`);
      }
    }
  };

  const colorConfigs: Array<{ key: keyof typeof initialColors, label: string }> = [
    { key: 'primary', label: 'Primary Color' },
    { key: 'accent', label: 'Accent Color' },
    { key: 'background', label: 'Background Color' },
  ];

  return (
    <div className="space-y-6">
      {colorConfigs.map(config => (
        <div key={config.key} className="space-y-2">
          <Label htmlFor={config.key} className="text-sm font-medium">
            {config.label}
          </Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              id={config.key}
              value={themeColors[config.key] || '#000000'}
              onChange={(e) => handleColorChange(config.key, e.target.value)}
              className="p-1 h-10 w-14 rounded-md border"
            />
            <Input
                type="text"
                value={themeColors[config.key] || ''}
                onChange={(e) => handleColorChange(config.key, e.target.value)}
                className="h-10"
                placeholder="#RRGGBB"
            />
          </div>
        </div>
      ))}
       <p className="text-xs text-muted-foreground pt-4">
        Note: Foreground colors are automatically adjusted for contrast (simplified for this demo). For full control, you would expose foreground variables too.
      </p>
    </div>
  );
}
