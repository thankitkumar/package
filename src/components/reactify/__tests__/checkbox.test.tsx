import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyCheckbox } from '../checkbox';

describe('ReactifyCheckbox', () => {
  it('renders a checkbox with a label', () => {
    render(<ReactifyCheckbox id="test-check" label="Test Label" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('toggles checked state on click', () => {
    const handleChange = jest.fn();
    render(<ReactifyCheckbox id="test-check" label="Clickable" onChange={handleChange} />);
    const checkbox = screen.getByLabelText('Clickable');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('is checked when the checked prop is true', () => {
    render(<ReactifyCheckbox id="test-check" label="Checked" checked readOnly />);
    const checkbox = screen.getByLabelText('Checked') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('is disabled when the disabled prop is true', () => {
    render(<ReactifyCheckbox id="test-check" label="Disabled" disabled />);
    const checkbox = screen.getByLabelText('Disabled');
    expect(checkbox).toBeDisabled();
  });

  it('renders without a visible label if label prop is omitted', () => {
    render(<ReactifyCheckbox id="no-label" aria-label="Aria Label" />);
    expect(screen.getByLabelText('Aria Label')).toBeInTheDocument();
    // Ensure no other label text is present
    const label = screen.queryByText('Aria Label');
    expect(label).toBeNull(); // It's an aria-label, not text content
  });
});
