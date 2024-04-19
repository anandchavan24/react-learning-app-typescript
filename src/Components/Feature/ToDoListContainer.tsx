import React, { ChangeEvent } from 'react';
import { IToDoResp } from '../../Shared/types';
import ErrorContainer from '../Common/ErrorContainer';
import FilterBar from './FIlterBar';
import Todo from './ToDo';

interface TodoListComponentProps {
  isLoading: boolean;
  isError: boolean;
  error: string|any;
  filteredTodos: IToDoResp[] | null;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSort: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleStatus: (e: ChangeEvent<HTMLSelectElement>) => void;
  markCompleted: (id: number) => void;
  deleteTodo: (id: number) => void;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const TodoListContainer = ({
  isLoading,
  isError,
  error,
  filteredTodos,
  handleSearch,
  handleSort,
  handleStatus,
  markCompleted,
  deleteTodo,
  pageNumber,
  setPageNumber,
}:TodoListComponentProps) => {
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <ErrorContainer ErrorMessage={error} />;

  return (
    <div className="todo-list">
      <h1>To Do List Item</h1>
      <FilterBar handleSearch={handleSearch} handleSort={handleSort} handleStatus={handleStatus} />
      {isLoading && <p>Loading...</p>}
      {isError && <div className="error-banner">{error}</div>}
      {filteredTodos != null &&
        filteredTodos.length > 0 &&
        filteredTodos.map((todo: IToDoResp) => (
          <Todo key={todo.id} todo={todo} markCompleted={markCompleted} deleteTodo={deleteTodo} />
        ))}
      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => setPageNumber((page: number) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev Page
        </button>
        <button
          className="pagination-button"
          onClick={() => setPageNumber((page: number) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default TodoListContainer;
