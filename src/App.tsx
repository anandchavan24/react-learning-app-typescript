import './App.css';

import { useState } from 'react';
import TodoList from './Components/ToDoList';
import { ITodo } from './Shared/types';
import { data } from './Shared/sample.json';

function App() {
  const toDoArray:ITodo[] = data.sampleDataForList;
  const [todos, setTodos] = useState(toDoArray);

  const markCompleted = (id:number) => {
    setTodos((prevTodos:ITodo[]) =>
      prevTodos.map((todo:ITodo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const deleteTodo = (id:number) => {
    setTodos((todos.filter((todo) => todo.id !== id)));
    // setTodos((prevTodos:ToDoInterface[]) => prevTodos.filter((todo) => todo.id !== id));
  };
  return (
    <div className="app">
      <h1>Todo List</h1>
      <TodoList todos={todos} markCompleted={markCompleted} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
