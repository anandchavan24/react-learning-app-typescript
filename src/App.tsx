import './App.css';

import { useState } from 'react';
import TodoList from './Components/ToDoList';
import { ToDoInterface } from './Shared/interface';
import { sampleDataForList } from './Shared/sample';

function App() {
  const toDoArray:ToDoInterface[] = sampleDataForList;
  const [todos, setTodos] = useState(toDoArray);

  const markCompleted = (id:number) => {
    setTodos((prevTodos:ToDoInterface[]) =>
      prevTodos.map((todo:ToDoInterface) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const deleteTodo = (id:number) => {
    setTodos((prevTodos:ToDoInterface[]) => prevTodos.filter((todo) => todo.id !== id));
  };
  return (
    <div className="app">
      <h1>Todo List</h1>
      <TodoList todos={todos} markCompleted={markCompleted} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
