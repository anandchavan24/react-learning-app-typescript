import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For DOM matchers
import ToDoList from './Components/Feature/ToDoList';

describe('ToDoList Component', () => {
  it('renders the component without crashing', () => {
    render(<ToDoList />);
  });

  it('displays loading message when fetching data', () => {
    render(<ToDoList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('filters todos based on search term', async () => {
    render(<ToDoList />);
    const searchInput = screen.getByPlaceholderText('Search...');

    fireEvent.change(searchInput, { target: { value: 'example' } });

    await waitFor(() => {
      expect(screen.getByText('Example Todo')).toBeInTheDocument();
    });
  });

});
