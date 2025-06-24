import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyFooter } from '../footer';

describe('ReactifyFooter', () => {
  it('renders corporate address', () => {
    render(<ReactifyFooter />);
    expect(screen.getByText('Corporate Address:')).toBeInTheDocument();
    expect(screen.getByText(/Bangalore 560070/)).toBeInTheDocument();
  });

  it('renders copyright information', () => {
    render(<ReactifyFooter />);
    const currentYear = new Date().getFullYear();
    const copyrightRegex = new RegExp(`Copyright © ${currentYear} Molecular Connections Pvt. Ltd.`, 'i');
    expect(screen.getByText(copyrightRegex)).toBeInTheDocument();
  });

  it('renders as a footer element by default', () => {
    const { container } = render(<ReactifyFooter />);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<ReactifyFooter />);
    // Check for links that would contain the icons. This is a proxy.
    const links = screen.getAllByRole('link');
    expect(links.some(link => link.href.includes('#'))).toBe(true); // Simplified check
  });
});
