import { useEffect, useState } from 'react';
import { IToDoResp, IToDoRespD } from '../../Shared/types'
import Todo from './ToDo'
import useFetch from '../Common/useFetch';


const ToDoList = () => {
  const [todos, setTodos] = useState<IToDoResp[] | null>(null);

  const { data, loading, error }:IToDoRespD = useFetch('https://jsonplaceholder.typicode.com/todos');

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
    <div className='todo-list'>
      <h1>To Do List Item</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="error-banner">{error}</div>}
      {todos!=null && todos.length>0 && todos.map((todo: IToDoResp) => (
        <Todo key={todo.id} todo={todo} markCompleted={markCompleted} deleteTodo={deleteTodo} />
      ))}
    </div>
  );
}

export default ToDoList

