import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyTabs, ReactifyTab } from '../tabs';

describe('ReactifyTabs', () => {
  it('renders tabs and shows the default active content', () => {
    render(
      <ReactifyTabs>
        <ReactifyTab label="Tab 1">Content 1</ReactifyTab>
        <ReactifyTab label="Tab 2">Content 2</ReactifyTab>
      </ReactifyTabs>
    );
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('switches to another tab on click', () => {
    render(
      <ReactifyTabs>
        <ReactifyTab label="Tab 1">Content 1</ReactifyTab>
        <ReactifyTab label="Tab 2">Content 2</ReactifyTab>
      </ReactifyTabs>
    );
    fireEvent.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('does not switch to a disabled tab', () => {
    render(
      <ReactifyTabs>
        <ReactifyTab label="Tab 1">Content 1</ReactifyTab>
        <ReactifyTab label="Tab 2" disabled>Content 2</ReactifyTab>
      </ReactifyTabs>
    );
    const disabledTab = screen.getByText('Tab 2');
    expect(disabledTab).toBeDisabled();
    fireEvent.click(disabledTab);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('calls onTabChange with the new index', () => {
    const handleTabChange = jest.fn();
    render(
      <ReactifyTabs onTabChange={handleTabChange}>
        <ReactifyTab label="Tab 1">Content 1</ReactifyTab>
        <ReactifyTab label="Tab 2">Content 2</ReactifyTab>
      </ReactifyTabs>
    );
    fireEvent.click(screen.getByText('Tab 2'));
    expect(handleTabChange).toHaveBeenCalledWith(1);
  });
});
