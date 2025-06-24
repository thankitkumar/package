import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifySpinner } from '../spinner';

describe('ReactifySpinner', () => {
  it('renders with a status role and default label', () => {
    render(<ReactifySpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toHaveClass('sr-only');
  });

  it('renders a custom label for screen readers', () => {
    render(<ReactifySpinner label="Processing payment" />);
    expect(screen.getByText('Processing payment')).toBeInTheDocument();
  });

  it('applies the primary variant class by default', () => {
    render(<ReactifySpinner data-testid="spinner" />);
    const spinnerSvg = screen.getByTestId('spinner');
    expect(spinnerSvg).toHaveClass('text-primary');
  });

  it('applies a specific variant class', () => {
    render(<ReactifySpinner variant="destructive" data-testid="spinner" />);
    const spinnerSvg = screen.getByTestId('spinner');
    expect(spinnerSvg).toHaveClass('text-destructive');
  });

  it('applies the medium size class by default', () => {
    render(<ReactifySpinner data-testid="spinner" />);
    const spinnerSvg = screen.getByTestId('spinner');
    expect(spinnerSvg).toHaveClass('h-6 w-6'); // md size
  });

  it('applies a specific size class', () => {
    render(<ReactifySpinner size="xl" data-testid="spinner" />);
    const spinnerSvg = screen.getByTestId('spinner');
    expect(spinnerSvg).toHaveClass('h-12 w-12'); // xl size
  });
});
