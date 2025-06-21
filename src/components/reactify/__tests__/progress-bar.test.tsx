import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyProgressBar } from '../progress-bar';

describe('ReactifyProgressBar', () => {
  it('renders with correct accessibility attributes', () => {
    render(<ReactifyProgressBar value={50} label="Upload progress" />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute('aria-valuenow', '50');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    expect(progressbar).toHaveAttribute('aria-label', 'Upload progress');
  });

  it('sets the width of the indicator based on the value', () => {
    render(<ReactifyProgressBar value={75} />);
    const progressbar = screen.getByRole('progressbar');
    const indicator = progressbar.firstChild as HTMLElement;
    expect(indicator.style.width).toBe('75%');
  });

  it('applies a variant class', () => {
    render(<ReactifyProgressBar value={50} variant="success" />);
    const progressbar = screen.getByRole('progressbar');
    const indicator = progressbar.firstChild as HTMLElement;
    expect(indicator).toHaveClass('bg-green-500');
  });

  it('includes a screen-reader only label when showValueLabel is true', () => {
    render(<ReactifyProgressBar value={80} showValueLabel />);
    const srElement = screen.getByText('80%');
    expect(srElement).toHaveClass('sr-only');
  });
});
