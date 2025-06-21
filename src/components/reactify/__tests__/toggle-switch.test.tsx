import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyToggleSwitch } from '../toggle-switch';

describe('ReactifyToggleSwitch', () => {
  it('renders a switch with a label', () => {
    render(<ReactifyToggleSwitch id="test-toggle" label="Test Label" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('toggles checked state on click', () => {
    const handleChange = jest.fn();
    render(<ReactifyToggleSwitch id="test-toggle" label="Clickable" onChange={handleChange} />);
    const toggle = screen.getByLabelText('Clickable');
    expect(toggle).not.toBeChecked();
    fireEvent.click(toggle);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('is checked when the checked prop is true', () => {
    render(<ReactifyToggleSwitch id="test-toggle" label="Checked" checked readOnly />);
    const toggle = screen.getByLabelText('Checked') as HTMLInputElement;
    expect(toggle.checked).toBe(true);
  });

  it('is disabled when the disabled prop is true', () => {
    render(<ReactifyToggleSwitch id="test-toggle" label="Disabled" disabled />);
    const toggle = screen.getByLabelText('Disabled');
    expect(toggle).toBeDisabled();
  });
});
