import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyHeader } from '../header';

describe('ReactifyHeader', () => {
  it('renders children correctly', () => {
    render(
      <ReactifyHeader>
        <span>Logo</span>
        <nav>Nav Links</nav>
      </ReactifyHeader>
    );
    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Nav Links')).toBeInTheDocument();
  });

  it('renders as a header element by default', () => {
    const { container } = render(<ReactifyHeader />);
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('can render as a different element using the "as" prop', () => {
    const { container } = render(<ReactifyHeader as="div" />);
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.querySelector('header')).not.toBeInTheDocument();
  });
});
