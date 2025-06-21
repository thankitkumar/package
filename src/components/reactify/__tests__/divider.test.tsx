import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyDivider } from '../divider';

describe('ReactifyDivider', () => {
  it('renders a horizontal divider by default', () => {
    render(<ReactifyDivider data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass('h-px w-full');
    expect(divider.tagName).toBe('HR');
  });

  it('renders a vertical divider', () => {
    render(<ReactifyDivider orientation="vertical" data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass('w-px self-stretch');
    expect(divider.tagName).toBe('DIV');
  });

  it('has a separator role', () => {
    render(<ReactifyDivider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
