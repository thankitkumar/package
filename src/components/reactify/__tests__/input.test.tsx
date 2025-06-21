import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyInput } from '../input';

describe('ReactifyInput', () => {
  it('renders an input element', () => {
    render(<ReactifyInput data-testid="input" />);
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('handles user input', () => {
    render(<ReactifyInput data-testid="input" />);
    const input = screen.getByTestId('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'testing' } });
    expect(input.value).toBe('testing');
  });

  it('is disabled when the disabled prop is true', () => {
    render(<ReactifyInput data-testid="input" disabled />);
    const input = screen.getByTestId('input');
    expect(input).toBeDisabled();
  });

  it('applies error styles and aria-invalid when error prop is true', () => {
    render(<ReactifyInput data-testid="input" error />);
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('border-destructive');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not have error styles when error prop is false', () => {
    render(<ReactifyInput data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).not.toHaveClass('border-destructive');
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });
});
