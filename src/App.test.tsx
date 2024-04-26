import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For DOM matchers
// import ToDoList from './Components/Feature/ToDoList';
import { Provider } from 'react-redux';
import store from './Components/Feature/RtkQuery/Store';
import ToDoList from './Components/Feature/RtkQuery/ToDoList';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter as Router
import Todo from './Components/Feature/ToDo';
import { IToDoResp } from './Shared/types';


const mockTodo: IToDoResp = { userId: 1,id:1, title: 'Test Todo', completed: false };
const mockMarkCompleted = jest.fn();
const mockDeleteTodo = jest.fn();



describe('ToDoList Component', () => {
  it('renders the component without crashing Sample', () => {
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

  it('renders the component without crashing', () => {
    render(
      <Provider store={store}>
        <ToDoList />
      </Provider>
    );
  });

  it('renders todo title and checkbox', () => {
    const { getByText, getByLabelText } = render(
      <Router>
        <Todo todo={mockTodo} markCompleted={mockMarkCompleted} deleteTodo={mockDeleteTodo} />
      </Router>
    );

    const todoTitle = screen.getByText(mockTodo.title);
    expect(todoTitle).toBeInTheDocument();

    const checkbox = screen.getByLabelText('Completed');
    expect(checkbox).toBeInTheDocument();
  });

  it('calls markCompleted when checkbox is clicked', () => {
    const { getByLabelText } = render(
      <Router>
        <Todo todo={mockTodo} markCompleted={mockMarkCompleted} deleteTodo={mockDeleteTodo} />
      </Router>
    );

    const checkbox = screen.getByLabelText('Completed');
    fireEvent.click(checkbox);
    expect(mockMarkCompleted).toHaveBeenCalledWith(mockTodo.id);
  });

  it('calls deleteTodo when delete button is clicked', () => {
    const { getByText } = render(
      <Router>
        <Todo todo={mockTodo} markCompleted={mockMarkCompleted} deleteTodo={mockDeleteTodo} />
      </Router>
    );

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(mockDeleteTodo).toHaveBeenCalledWith(mockTodo.id);
  })


});
