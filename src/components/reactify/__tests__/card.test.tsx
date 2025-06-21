import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  ReactifyCard,
  ReactifyCardHeader,
  ReactifyCardTitle,
  ReactifyCardDescription,
  ReactifyCardContent,
  ReactifyCardFooter,
} from '../card';

describe('ReactifyCard', () => {
  it('renders a card with all its parts', () => {
    render(
      <ReactifyCard>
        <ReactifyCardHeader>
          <ReactifyCardTitle>Test Title</ReactifyCardTitle>
          <ReactifyCardDescription>Test Description</ReactifyCardDescription>
        </ReactifyCardHeader>
        <ReactifyCardContent>
          <p>Test Content</p>
        </ReactifyCardContent>
        <ReactifyCardFooter>
          <p>Test Footer</p>
        </ReactifyCardFooter>
      </ReactifyCard>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Footer')).toBeInTheDocument();
  });

  it('renders title as an h3 element', () => {
    render(<ReactifyCardTitle>My Title</ReactifyCardTitle>);
    expect(screen.getByRole('heading', { level: 3, name: 'My Title' })).toBeInTheDocument();
  });
});
