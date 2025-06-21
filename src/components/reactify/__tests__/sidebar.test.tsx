import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifySidebar } from '../sidebar';

describe('ReactifySidebar', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(
      <ReactifySidebar isOpen={false}>Content</ReactifySidebar>
    );
    // The component still renders its structure, but it should be hidden
    // We check for a class that translates it off-screen
    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('-translate-x-full');
  });

  it('renders when isOpen is true', () => {
    render(
      <ReactifySidebar isOpen={true} title="My Sidebar">
        Sidebar Content
      </ReactifySidebar>
    );
    expect(screen.getByText('Sidebar Content')).toBeInTheDocument();
    expect(screen.getByText('My Sidebar')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <ReactifySidebar isOpen={true} onClose={handleClose}>
        Content
      </ReactifySidebar>
    );
    fireEvent.click(screen.getByLabelText('Close sidebar'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('applies right position class', () => {
    const { container } = render(
      <ReactifySidebar isOpen={true} position="right">
        Content
      </ReactifySidebar>
    );
    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('right-0');
  });
});
