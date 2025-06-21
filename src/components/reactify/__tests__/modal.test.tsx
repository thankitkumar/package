import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyModal } from '../modal';

describe('ReactifyModal', () => {
  it('does not render when isOpen is false', () => {
    render(
      <ReactifyModal isOpen={false} onClose={() => {}}>
        Modal Content
      </ReactifyModal>
    );
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(
      <ReactifyModal isOpen={true} onClose={() => {}} title="Test Modal">
        Modal Content
      </ReactifyModal>
    );
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <ReactifyModal isOpen={true} onClose={handleClose}>
        Modal Content
      </ReactifyModal>
    );
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the escape key is pressed', () => {
    const handleClose = jest.fn();
    render(
      <ReactifyModal isOpen={true} onClose={handleClose}>
        Modal Content
      </ReactifyModal>
    );
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape', code: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders a footer when provided', () => {
    render(
      <ReactifyModal isOpen={true} onClose={() => {}} footer={<button>Footer Button</button>}>
        Modal Content
      </ReactifyModal>
    );
    expect(screen.getByText('Footer Button')).toBeInTheDocument();
  });
});
