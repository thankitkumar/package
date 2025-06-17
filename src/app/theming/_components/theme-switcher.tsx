
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ReactifyButton } from '@/components/reactify/button';
import { Download } from 'lucide-react';

// Helper to parse HSL string "H S% L%" to an object {h, s, l}
const parseHslString = (hslStr: string): { h: number; s: number; l: number } | null => {
  if (!hslStr) return null;
  const match = hslStr.match(/([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/);
  if (match) {
    return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
  }
  return null;
};

// Helper to convert HSL object {h, s, l} to CSS HSL string "H S% L%"
const formatHslString = (hsl: { h: number; s: number; l: number }): string => {
  return `${hsl.h} ${hsl.s}% ${hsl.l}%`;
};

// Helper to convert HSL object to hex
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

// Helper to convert Hex to HSL object
const hexToHsl = (hex: string): { h: number; s: number; l: number } | null => {
  hex = hex.replace(/^#/, '');
  let r = 0, g = 0, b = 0;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
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

const coreThemeVariables = [
  '--background', '--foreground',
  '--card', '--card-foreground',
  '--popover', '--popover-foreground',
  '--primary', '--primary-foreground',
  '--secondary', '--secondary-foreground',
  '--muted', '--muted-foreground',
  '--accent', '--accent-foreground',
  '--destructive', '--destructive-foreground',
  '--border', '--input', '--ring'
];

const chartThemeVariables = [
  '--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5'
];


export function ThemeSwitcher() {
  const [themeColorInputs, setThemeColorInputs] = useState<{ [key: string]: string }>({
    primary: '#329DFF', // Default Deep Sky Blue
    accent: '#6F00ED',  // Default Electric Indigo
    background: '#F0F4F8', // Default Light Gray
  });

  const getInitialColorFromCSS = useCallback((varName: string, fallbackHex: string) => {
    if (typeof window !== 'undefined') {
      const docStyle = getComputedStyle(document.documentElement);
      const hslString = docStyle.getPropertyValue(varName).trim();
      const hslObject = parseHslString(hslString);
      if (hslObject) {
        return hslToHex(hslObject.h, hslObject.s, hslObject.l);
      }
    }
    return fallbackHex;
  }, []);

  useEffect(() => {
    setThemeColorInputs({
      primary: getInitialColorFromCSS('--primary', '#329DFF'),
      accent: getInitialColorFromCSS('--accent', '#6F00ED'),
      background: getInitialColorFromCSS('--background', '#F0F4F8'),
    });
  }, [getInitialColorFromCSS]);

  const handleColorInputChange = (key: string, hexColor: string) => {
    setThemeColorInputs(prev => ({ ...prev, [key]: hexColor }));
    const hsl = hexToHsl(hexColor);
    if (hsl) {
      const hslString = formatHslString(hsl);
      document.documentElement.style.setProperty(`--${key}`, hslString);

      // Simplified foreground adjustment
      if (key === 'primary' || key === 'accent') {
        const fgLuminance = hsl.l > 50 ? 10 : 98; // Light fg for dark bg, dark fg for light bg
        const fgSaturation = Math.min(hsl.s, 20); // Desaturate foreground
        const fgHslString = formatHslString({ h: hsl.h, s: fgSaturation, l: fgLuminance });
        document.documentElement.style.setProperty(`--${key}-foreground`, fgHslString);
      }
      if (key === 'background') {
         // Adjust general foreground based on background luminance
        const generalFgLuminance = hsl.l > 50 ? 5 : 95; // e.g. very dark text on light bg
        const generalFgHslString = formatHslString({ h: hsl.h, s: Math.min(hsl.s, 10), l: generalFgLuminance });
        document.documentElement.style.setProperty('--foreground', generalFgHslString);
        // Also adjust card to match background, and its foreground
        document.documentElement.style.setProperty('--card', hslString);
        document.documentElement.style.setProperty('--card-foreground', generalFgHslString);
      }
    }
  };

  const collectThemeTokens = () => {
    const tokens: { [key: string]: string } = {};
    const docStyle = getComputedStyle(document.documentElement);
    [...coreThemeVariables, ...chartThemeVariables].forEach(varName => {
      tokens[varName] = docStyle.getPropertyValue(varName).trim();
    });
    return tokens;
  };

  const triggerDownload = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const tokens = collectThemeTokens();
    const jsonString = JSON.stringify(tokens, null, 2);
    triggerDownload('theme-tokens.json', jsonString, 'application/json');
  };

  const handleDownloadScss = () => {
    const tokens = collectThemeTokens();
    let scssString = '// Theme Tokens (HSL format)\n\n';
    Object.entries(tokens).forEach(([key, value]) => {
      // SCSS variable names typically don't start with --
      const scssVarName = key.startsWith('--') ? `$${key.substring(2)}` : `$${key}`;
      scssString += `${scssVarName}: hsl(${value});\n`;
    });
    triggerDownload('_theme-tokens.scss', scssString, 'text/scss');
  };

  const colorConfigs: Array<{ key: keyof typeof themeColorInputs, label: string }> = [
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
              id={`${config.key}-picker`}
              value={themeColorInputs[config.key] || '#000000'}
              onChange={(e) => handleColorInputChange(config.key, e.target.value)}
              className="p-1 h-10 w-14 rounded-md border"
              aria-label={`${config.label} color picker`}
            />
            <Input
              type="text"
              id={`${config.key}-hex`}
              value={themeColorInputs[config.key] || ''}
              onChange={(e) => handleColorInputChange(config.key, e.target.value)}
              className="h-10"
              placeholder="#RRGGBB"
              aria-label={`${config.label} hex input`}
            />
          </div>
        </div>
      ))}
      <p className="text-xs text-muted-foreground pt-2">
        Foreground colors (--primary-foreground, --accent-foreground, --foreground, --card-foreground) are automatically adjusted for basic contrast. For full control, define them directly in your CSS.
      </p>
      <div className="pt-4 space-y-3">
        <ReactifyButton onClick={handleDownloadJson} variant="outline" className="w-full" leftIcon={<Download size={16}/>}>
          Download Theme as JSON
        </ReactifyButton>
        <ReactifyButton onClick={handleDownloadScss} variant="outline" className="w-full" leftIcon={<Download size={16}/>}>
          Download Theme as SCSS
        </ReactifyButton>
      </div>
    </div>
  );
}
