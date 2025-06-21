import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyTextarea } from '../textarea';

describe('ReactifyTextarea', () => {
  it('renders a textarea element', () => {
    render(<ReactifyTextarea data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toBeInTheDocument();
  });

  it('handles user input', () => {
    render(<ReactifyTextarea data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'testing' } });
    expect(textarea.value).toBe('testing');
  });

  it('is disabled when the disabled prop is true', () => {
    render(<ReactifyTextarea data-testid="textarea" disabled />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeDisabled();
  });

  it('applies error styles and aria-invalid when error prop is true', () => {
    render(<ReactifyTextarea data-testid="textarea" error />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('border-destructive');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not have error styles when error prop is false', () => {
    render(<ReactifyTextarea data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).not.toHaveClass('border-destructive');
    expect(textarea).toHaveAttribute('aria-invalid', 'false');
  });
});
