
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ReactifyMultiSelect, type MultiSelectOption } from '../multi-select';

const options: MultiSelectOption[] = [
  { value: 'val1', label: 'Label 1' },
  { value: 'val2', label: 'Label 2' },
  { value: 'val3', label: 'Label 3' },
];

const MultiSelectWrapper = () => {
  const [selected, setSelected] = React.useState<string[]>(['val1']);
  return (
    <ReactifyMultiSelect
      options={options}
      selected={selected}
      onChange={setSelected}
    />
  );
};

describe('ReactifyMultiSelect', () => {
  it('renders with initial selection', () => {
    render(<MultiSelectWrapper />);
    expect(screen.getByText('Label 1')).toBeInTheDocument();
    expect(screen.queryByText('Label 2')).not.toBeInTheDocument();
  });

  it('opens popover on click', async () => {
    render(<MultiSelectWrapper />);
    const trigger = screen.getByRole('button');
    await userEvent.click(trigger);
    const searchInput = await screen.findByPlaceholderText('Search...');
    expect(searchInput).toBeVisible();
    expect(screen.getByLabelText('Label 2')).toBeInTheDocument();
  });

  it('selects an item when clicked in the list', async () => {
    render(<MultiSelectWrapper />);
    await userEvent.click(screen.getByRole('button'));
    
    // "Label 2" is not selected initially
    const option2Checkbox = screen.getByLabelText('Label 2').previousSibling as HTMLInputElement;
    expect(option2Checkbox).not.toBeChecked();

    await userEvent.click(option2Checkbox.parentElement!); // Click the container div

    // Now it should be selected, and its badge should appear in the trigger
    const trigger = screen.getByRole('button');
    await waitFor(() => {
        expect(trigger).toHaveTextContent('Label 1');
        expect(trigger).toHaveTextContent('Label 2');
    });
  });

  it('deselects an item by clicking the badge', async () => {
    render(<MultiSelectWrapper />);
    // "Label 1" is initially selected
    const badge = screen.getByText('Label 1');
    expect(badge).toBeInTheDocument();
    const badgeCloseButton = badge.querySelector('button');
    expect(badgeCloseButton).toBeInTheDocument();
    
    await userEvent.click(badgeCloseButton!);
    
    // Badge for "Label 1" should be gone
    expect(screen.queryByText('Label 1')).not.toBeInTheDocument();
  });
  
  it('filters options based on search input', async () => {
    render(<MultiSelectWrapper />);
    await userEvent.click(screen.getByRole('button'));

    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'Label 3');

    expect(screen.queryByText('Label 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Label 2')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Label 3')).toBeInTheDocument();
  });
});
