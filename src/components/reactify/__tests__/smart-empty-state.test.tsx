import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifySmartEmptyState } from '../smart-empty-state';
import { ReactifyButton } from '../button';

describe('ReactifySmartEmptyState', () => {
  it('renders the loading state when isLoading is true', () => {
    render(
      <ReactifySmartEmptyState isLoading={true} data={[]}>
        <div>Data Content</div>
      </ReactifySmartEmptyState>
    );
    // Check for the default skeleton loaders
    expect(screen.queryByText('Data Content')).not.toBeInTheDocument();
    expect(screen.getAllByRole('generic', { name: '' })[0]).toHaveClass('animate-pulse');
  });

  it('renders custom loading content when provided', () => {
    render(
      <ReactifySmartEmptyState isLoading={true} data={[]} loadingStateContent={<div>Custom Loading...</div>}>
        <div>Data Content</div>
      </ReactifySmartEmptyState>
    );
    expect(screen.getByText('Custom Loading...')).toBeInTheDocument();
  });

  it('renders the empty state when data is empty and not loading', () => {
    render(
      <ReactifySmartEmptyState data={[]} isLoading={false}>
        <div>Data Content</div>
      </ReactifySmartEmptyState>
    );
    expect(screen.getByText('No Data Found')).toBeInTheDocument();
    expect(screen.queryByText('Data Content')).not.toBeInTheDocument();
  });

  it('renders empty state with custom props', () => {
    render(
      <ReactifySmartEmptyState
        data={[]}
        isLoading={false}
        emptyStateTitle="No Items"
        emptyStateDescription="Please add an item."
        emptyStateActions={<ReactifyButton>Add Item</ReactifyButton>}
      >
        <div>Data Content</div>
      </ReactifySmartEmptyState>
    );
    expect(screen.getByText('No Items')).toBeInTheDocument();
    expect(screen.getByText('Please add an item.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Item' })).toBeInTheDocument();
  });

  it('renders custom empty state content when provided', () => {
    render(
      <ReactifySmartEmptyState
        data={[]}
        isLoading={false}
        emptyStateContent={<div>Custom Empty State</div>}
      >
        <div>Data Content</div>
      </ReactifySmartEmptyState>
    );
    expect(screen.getByText('Custom Empty State')).toBeInTheDocument();
    expect(screen.queryByText('No Data Found')).not.toBeInTheDocument();
  });

  it('renders children when data is available and not loading', () => {
    render(
      <ReactifySmartEmptyState data={['item1']} isLoading={false}>
        <div>Data Content</div>
      </ReactifySmartEmptyState>
    );
    expect(screen.getByText('Data Content')).toBeInTheDocument();
    expect(screen.queryByText('No Data Found')).not.toBeInTheDocument();
  });
});
