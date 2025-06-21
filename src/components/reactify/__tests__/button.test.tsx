import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyButton } from '../button';
import { Heart } from 'lucide-react';

describe('ReactifyButton', () => {
  it('renders children correctly', () => {
    render(<ReactifyButton>Click Me</ReactifyButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies variant and size classes', () => {
    const { container } = render(<ReactifyButton variant="destructive" size="lg">Delete</ReactifyButton>);
    const button = container.firstChild;
    expect(button).toHaveClass('bg-destructive');
    expect(button).toHaveClass('h-11'); // lg size
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<ReactifyButton onClick={handleClick}>Clickable</ReactifyButton>);
    fireEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the disabled prop is true', () => {
    const handleClick = jest.fn();
    render(<ReactifyButton onClick={handleClick} disabled>Disabled</ReactifyButton>);
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loading state and is disabled', () => {
    const handleClick = jest.fn();
    render(<ReactifyButton onClick={handleClick} isLoading>Loading</ReactifyButton>);
    const button = screen.getByText('Loading');
    expect(button).toBeDisabled();
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    // Check for SVG loader
    expect(button.querySelector('svg')).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders left and right icons', () => {
    render(
      <ReactifyButton leftIcon={<Heart data-testid="left-icon" />} rightIcon={<Heart data-testid="right-icon" />}>
        Icon Button
      </ReactifyButton>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });
});
