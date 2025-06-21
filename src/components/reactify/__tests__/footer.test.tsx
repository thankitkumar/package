import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyFooter } from '../footer';

describe('ReactifyFooter', () => {
  it('renders children correctly', () => {
    render(<ReactifyFooter>Copyright 2024</ReactifyFooter>);
    expect(screen.getByText('Copyright 2024')).toBeInTheDocument();
  });

  it('renders as a footer element by default', () => {
    const { container } = render(<ReactifyFooter>Footer content</ReactifyFooter>);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('can render as a different element using the "as" prop', () => {
    const { container } = render(<ReactifyFooter as="div">Div footer</ReactifyFooter>);
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.querySelector('footer')).not.toBeInTheDocument();
  });
});
