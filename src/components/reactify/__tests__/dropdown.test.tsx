import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyDropdown, ReactifyDropdownItem } from '../dropdown';
import { ReactifyButton } from '../button';

describe('ReactifyDropdown', () => {
  it('does not show items initially', () => {
    render(
      <ReactifyDropdown trigger={<ReactifyButton>Open</ReactifyButton>}>
        <ReactifyDropdownItem>Item 1</ReactifyDropdownItem>
      </ReactifyDropdown>
    );
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('shows items when trigger is clicked', () => {
    render(
      <ReactifyDropdown trigger={<ReactifyButton>Open</ReactifyButton>}>
        <ReactifyDropdownItem>Item 1</ReactifyDropdownItem>
      </ReactifyDropdown>
    );
    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('calls onSelect when an item is clicked', () => {
    const handleSelect = jest.fn();
    render(
      <ReactifyDropdown trigger={<ReactifyButton>Open</ReactifyButton>}>
        <ReactifyDropdownItem onSelect={handleSelect}>Item 1</ReactifyDropdownItem>
      </ReactifyDropdown>
    );
    fireEvent.click(screen.getByText('Open'));
    const item = screen.getByText('Item 1');
    expect(item).toBeInTheDocument();
    fireEvent.click(item);
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  it('closes when clicking outside', () => {
    render(
      <div>
        <ReactifyDropdown trigger={<ReactifyButton>Open</ReactifyButton>}>
          <ReactifyDropdownItem>Item 1</ReactifyDropdownItem>
        </ReactifyDropdown>
        <div>Outside</div>
      </div>
    );
    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByText('Outside'));
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });
});
