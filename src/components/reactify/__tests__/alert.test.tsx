import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyAlert } from '../alert';
import { Star } from 'lucide-react';

describe('ReactifyAlert', () => {
  it('renders title and children', () => {
    render(<ReactifyAlert title="Test Title">Test Content</ReactifyAlert>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies the correct variant class', () => {
    const { container } = render(<ReactifyAlert variant="success">Success</ReactifyAlert>);
    expect(container.firstChild).toHaveClass('bg-green-50');
  });

  it('renders the default icon for a variant', () => {
    const { container } = render(<ReactifyAlert variant="destructive">Error</ReactifyAlert>);
    const alert = screen.getByRole('alert');
    expect(alert.querySelector('svg')).toBeInTheDocument();
  });

  it('does not render an icon when icon is false', () => {
    render(<ReactifyAlert icon={false}>No Icon</ReactifyAlert>);
    const alert = screen.getByRole('alert');
    expect(alert.querySelector('svg')).not.toBeInTheDocument();
  });

  it('renders a custom icon when provided', () => {
    render(<ReactifyAlert icon={<Star data-testid="custom-icon" />}>Custom Icon</ReactifyAlert>);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
