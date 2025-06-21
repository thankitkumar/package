import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyAvatar } from '../avatar';
import { User } from 'lucide-react';

describe('ReactifyAvatar', () => {
  it('renders an image when src is provided', () => {
    render(<ReactifyAvatar src="test.jpg" alt="User A" />);
    const img = screen.getByAltText('User A');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.jpg');
  });

  it('renders initials as fallback when src is not provided', () => {
    render(<ReactifyAvatar alt="Jane Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders single initial for single name', () => {
    render(<ReactifyAvatar alt="Jane" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders explicit text fallback when provided', () => {
    render(<ReactifyAvatar alt="Jane Doe" fallback="Custom" />);
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('renders a ReactNode as fallback', () => {
    render(<ReactifyAvatar alt="User Icon" fallback={<User data-testid="user-icon" />} />);
    expect(screen.getByTestId('user-icon')).toBeInTheDocument();
  });

  it('applies size and shape classes', () => {
    const { container } = render(<ReactifyAvatar size="lg" shape="square" />);
    const avatar = container.firstChild;
    expect(avatar).toHaveClass('h-16 w-16'); // lg size
    expect(avatar).toHaveClass('rounded-md'); // square shape
  });
});
