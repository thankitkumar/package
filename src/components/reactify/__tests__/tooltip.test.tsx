import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyTooltip } from '../tooltip';

describe('ReactifyTooltip', () => {
  it('does not show tooltip initially', () => {
    render(<ReactifyTooltip content="My Tooltip"><span>Trigger</span></ReactifyTooltip>);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on mouse enter', async () => {
    render(<ReactifyTooltip content="My Tooltip" delay={0}><span>Trigger</span></ReactifyTooltip>);
    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.getByText('My Tooltip')).toBeInTheDocument();
    });
  });

  it('hides tooltip on mouse leave', async () => {
    render(<ReactifyTooltip content="My Tooltip" delay={0}><span>Trigger</span></ReactifyTooltip>);
    const trigger = screen.getByText('Trigger');
    
    // Show it first
    fireEvent.mouseEnter(trigger);
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument());

    // Then hide it
    fireEvent.mouseLeave(trigger);
    await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('shows tooltip on focus', async () => {
    render(<ReactifyTooltip content="My Tooltip" delay={0}><span>Trigger</span></ReactifyTooltip>);
    const trigger = screen.getByText('Trigger').parentElement; // The wrapper is the focusable element
    if(trigger) {
        fireEvent.focus(trigger);
        await waitFor(() => {
            expect(screen.getByRole('tooltip')).toBeInTheDocument();
        });
    }
  });
});
