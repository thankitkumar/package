
import type { HTMLAttributes, ReactNode, ElementType } from 'react';

export interface ReactifyComponentProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  as?: ElementType; // Allows rendering as different HTML elements or React components
  // Add other common props here, e.g., for theming or accessibility
}
