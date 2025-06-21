import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyRadioGroup, ReactifyRadioButton } from '../radio-group';

describe('ReactifyRadioGroup', () => {
  it('renders radio buttons with labels', () => {
    render(
      <ReactifyRadioGroup name="test">
        <ReactifyRadioButton value="1" label="Option 1" />
        <ReactifyRadioButton value="2" label="Option 2" />
      </ReactifyRadioGroup>
    );
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
  });

  it('selects the correct default value', () => {
    render(
      <ReactifyRadioGroup name="test" defaultValue="2">
        <ReactifyRadioButton value="1" label="Option 1" />
        <ReactifyRadioButton value="2" label="Option 2" />
      </ReactifyRadioGroup>
    );
    const radio2 = screen.getByLabelText('Option 2') as HTMLInputElement;
    expect(radio2.checked).toBe(true);
  });

  it('handles value change', () => {
    const handleChange = jest.fn();
    render(
      <ReactifyRadioGroup name="test" onChange={handleChange}>
        <ReactifyRadioButton value="1" label="Option 1" />
        <ReactifyRadioButton value="2" label="Option 2" />
      </ReactifyRadioGroup>
    );
    fireEvent.click(screen.getByLabelText('Option 1'));
    expect(handleChange).toHaveBeenCalledWith('1');
  });

  it('disables all items when the group is disabled', () => {
    render(
      <ReactifyRadioGroup name="test" disabled>
        <ReactifyRadioButton value="1" label="Option 1" />
      </ReactifyRadioGroup>
    );
    expect(screen.getByLabelText('Option 1')).toBeDisabled();
  });

  it('allows an individual item to be disabled', () => {
    render(
      <ReactifyRadioGroup name="test">
        <ReactifyRadioButton value="1" label="Enabled" />
        <ReactifyRadioButton value="2" label="Disabled" disabled />
      </ReactifyRadioGroup>
    );
    expect(screen.getByLabelText('Enabled')).not.toBeDisabled();
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });
});
