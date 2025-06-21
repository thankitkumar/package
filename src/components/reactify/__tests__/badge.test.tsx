import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyBadge } from '../badge';

describe('ReactifyBadge', () => {
  it('renders children correctly', () => {
    render(<ReactifyBadge>New</ReactifyBadge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies the primary variant class by default', () => {
    const { container } = render(<ReactifyBadge>Default</ReactifyBadge>);
    expect(container.firstChild).toHaveClass('bg-primary');
  });

  it('applies a specific variant class', () => {
    const { container } = render(<ReactifyBadge variant="destructive">Destructive</ReactifyBadge>);
    expect(container.firstChild).toHaveClass('bg-destructive');
  });

  it('applies a specific size class', () => {
    const { container } = render(<ReactifyBadge size="lg">Large</ReactifyBadge>);
    expect(container.firstChild).toHaveClass('px-3 py-1 text-base'); // lg size
  });
});
