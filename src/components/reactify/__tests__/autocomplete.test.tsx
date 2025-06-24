
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactifyAutocomplete } from '../autocomplete';
import userEvent from '@testing-library/user-event';

const suggestions = ['Apple', 'Banana', 'Cherry'];

const Wrapper = () => {
  const [value, setValue] = React.useState('');
  const [selected, setSelected] = React.useState<string | undefined>('');
  
  const filteredSuggestions = value ? suggestions.filter(s => s.toLowerCase().includes(value.toLowerCase())) : [];

  return (
    <ReactifyAutocomplete<string>
      suggestions={filteredSuggestions}
      value={value}
      onValueChange={setValue}
      onSelect={setSelected}
      placeholder="Search fruits..."
    />
  );
};


describe('ReactifyAutocomplete', () => {
  it('renders an input', () => {
    render(<Wrapper />);
    expect(screen.getByPlaceholderText('Search fruits...')).toBeInTheDocument();
  });

  it('shows suggestions when user types', async () => {
    render(<Wrapper />);
    const input = screen.getByPlaceholderText('Search fruits...');
    await userEvent.type(input, 'a');
    expect(await screen.findByText('Apple')).toBeVisible();
    expect(await screen.findByText('Banana')).toBeVisible();
    expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
  });

  it('selects an item on click', async () => {
    render(<Wrapper />);
    const input = screen.getByPlaceholderText('Search fruits...') as HTMLInputElement;
    await userEvent.type(input, 'b');
    
    const bananaOption = await screen.findByText('Banana');
    await userEvent.click(bananaOption);

    expect(input.value).toBe('Banana');
    // List should disappear
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  it('navigates and selects with keyboard', async () => {
    render(<Wrapper />);
    const input = screen.getByPlaceholderText('Search fruits...') as HTMLInputElement;
    await userEvent.type(input, 'a');

    // Wait for suggestions to appear
    await screen.findByText('Apple');
    
    // Navigate down to Banana
    await userEvent.keyboard('{arrowdown}');
    await userEvent.keyboard('{arrowdown}');
    
    const bananaOption = screen.getByText('Banana');
    expect(bananaOption).toHaveClass('bg-accent');
    
    // Select with Enter
    await userEvent.keyboard('{enter}');
    
    expect(input.value).toBe('Banana');
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  it('closes suggestion list on Escape key', async () => {
    render(<Wrapper />);
    const input = screen.getByPlaceholderText('Search fruits...');
    await userEvent.type(input, 'a');
    await screen.findByText('Apple');
    
    await userEvent.keyboard('{escape}');
    
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });
});
