import { useEffect, useState } from 'react';
import { IToDoResp, IToDoRespD } from '../../Shared/types'
import Todo from './ToDo'
import useFetch from '../Common/useFetch';
import FilterBar from './FIlterBar';


const ToDoList = () => {
  const [originalTodos, setOriginalFilteredTodos] = useState<IToDoResp[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<IToDoResp[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  // const [todos, setTodos] = useState<IToDoResp[]>([]);
  const { data, loading, error }:IToDoRespD = useFetch('https://jsonplaceholder.typicode.com/todos');

  useEffect(() => {
    if (data) {
      setFilteredTodos(data);
      setOriginalFilteredTodos(data)
    }
  }, [data]);

  const markCompleted = (id: number) => {
    if (filteredTodos) {
      const updatedTodos:IToDoResp[] | null = filteredTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setFilteredTodos(updatedTodos);
    }
  };

  const deleteTodo = (id: number) => {
    if (filteredTodos) {
      const updatedTodos = filteredTodos.filter(todo => todo.id !== id);
      setFilteredTodos(updatedTodos);
    }
  };

    // Handle search input
    const handleSearch = (value: string) => {
      setSearchTerm(value);
      filterTodos(value, sortBy, statusFilter);
  };

  // Handle sort dropdown
  const handleSort = (value: string) => {
      setSortBy(value);
      filterTodos(searchTerm, value, statusFilter);
  };

  // Handle status dropdown
  const handleStatus = (value: string) => {
      setStatusFilter(value);
      filterTodos(searchTerm, sortBy, value);
  };

  // Filter todos based on search term, sort, and status
  const filterTodos = (search: string, sort: string, status: string) => {
      let filtered = filteredTodos && filteredTodos.filter(todo =>
          todo.title.toLowerCase().includes(search.toLowerCase())
      );

      console.log(search);

      if(search === ''){
        setFilteredTodos(originalTodos);
        filtered = originalTodos
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
      {filteredTodos!=null && filteredTodos.length>0 && filteredTodos.map((todo: IToDoResp) => (
        <Todo key={todo.id} todo={todo} markCompleted={markCompleted} deleteTodo={deleteTodo} />
      ))}
    </div>
  );
}

export default ToDoList

