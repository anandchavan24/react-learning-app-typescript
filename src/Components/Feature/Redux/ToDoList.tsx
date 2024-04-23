import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IToDoResp, IToDoRespD } from '../../../Shared/types';
import { setTodos, updateTodo, deleteTodo } from './ToDoReducer';
import FilterBar from '../FIlterBar';
import Todo from '../ToDo';
import useFetch from '../../Common/useFetch';

const ToDoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: any) => state.todos.todos);

  const [originalTodos, setOriginalFilteredTodos] = useState<IToDoResp[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<IToDoResp[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const { data, loading, error }: IToDoRespD = useFetch('https://jsonplaceholder.typicode.com/todos');

  useEffect(() => {
    if (data) {
      dispatch(setTodos(data)); // Dispatch action to set todos from API
      setFilteredTodos(data);
      setOriginalFilteredTodos(data);
    }
  }, [data, dispatch]);

  const markCompleted = (id: number) => {
    const updatedTodos: IToDoResp[] = filteredTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setFilteredTodos(updatedTodos);
    dispatch(updateTodo(updatedTodos.find(todo => todo.id === id)!));
  };

  const deleteTodoItem = (id: number) => {
    const updatedTodos = filteredTodos.filter(todo => todo.id !== id);
    setFilteredTodos(updatedTodos);
    dispatch(deleteTodo(id));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    filterTodos(e.target.value, sortBy, statusFilter);
  };

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    filterTodos(searchTerm, e.target.value, statusFilter);
  };

  const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    filterTodos(searchTerm, sortBy, e.target.value);
  };

  const filterTodos = (search: string, sort: string, status: string) => {
    let filtered = originalTodos.slice();

    if (!search) {
      setFilteredTodos(originalTodos);
    } else {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === 'asc') {
      filtered.sort((a, b) => a.id - b.id);
    } else if (sort === 'desc') {
      filtered.sort((a, b) => b.id - a.id);
    }

    if (status) {
      filtered = filtered.filter(todo => todo.completed === (status === 'completed'));
    }

    setFilteredTodos(filtered);
  };

  return (
    <div className='todo-list'>
      <h1>To Do List Item</h1>
      <FilterBar handleSearch={handleSearch} handleSort={handleSort} handleStatus={handleStatus}/>
      {loading && <p>Loading...</p>}
      {error && <div className="error-banner">{error}</div>}
      {filteredTodos.length > 0 && filteredTodos.map(todo => (
        <Todo key={todo.id} todo={todo} markCompleted={markCompleted} deleteTodo={deleteTodoItem} />
      ))}
    </div>
  );
};

export default ToDoList;
