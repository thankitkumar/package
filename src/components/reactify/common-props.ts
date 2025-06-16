import type { HTMLAttributes, ReactNode } from 'react';

export interface ReactifyComponentProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  as?: keyof JSX.IntrinsicElements; // Allows rendering as different HTML elements
  // Add other common props here, e.g., for theming or accessibility
}
