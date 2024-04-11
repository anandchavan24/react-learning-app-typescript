import './App.css';
import { useEffect, useState } from 'react';
import TodoList from './Components/ToDoList';
import { IToDoResp } from './Shared/types';
import useFetch from './Components/useFetch';

function App() {
  const [todos, setTodos] = useState<IToDoResp[] | null>(null);

  const { data, loading, error }:{ data: IToDoResp[] | null; loading: boolean; error: string | null } = useFetch('https://jsonplaceholder.typicode.com/todos');

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);

  const markCompleted = (id: number) => {
    if (todos) {
      const updatedTodos:IToDoResp[] | null = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
    }
  };

  const deleteTodo = (id: number) => {
    if (todos) {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    }
  };

  return (
    <div className="app">
    <h1>Todo List</h1>
    {loading && <p>Loading...</p>}
    {error && <div className="error-banner">{error}</div>}
    {todos && <TodoList todos={todos} markCompleted={markCompleted} deleteTodo={deleteTodo} />}
  </div>
  );
}

export default App;
