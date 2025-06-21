import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifySkeletonLoader } from '../skeleton-loader';

describe('ReactifySkeletonLoader', () => {
  it('renders a div with animation and background classes', () => {
    const { container } = render(<ReactifySkeletonLoader />);
    const skeleton = container.firstChild;
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('animate-pulse');
    expect(skeleton).toHaveClass('bg-muted');
  });

  it('applies additional className props', () => {
    const { container } = render(<ReactifySkeletonLoader className="h-4 w-full" />);
    const skeleton = container.firstChild;
    expect(skeleton).toHaveClass('h-4');
    expect(skeleton).toHaveClass('w-full');
  });
});
