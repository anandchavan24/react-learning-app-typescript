import React, { useEffect } from 'react';
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
} from './ToDoSlice';

const TodoList = () => {
  const {
    data: todos,
    error: todosError,
    isLoading: todosLoading,
  } = useGetTodosQuery(undefined);
  const [addTodo, addTodoResult] = useAddTodoMutation();
  const [deleteTodo, deleteTodoResult] = useDeleteTodoMutation();

  useEffect(() => {
    // Fetch todos on component mount
    // You can also trigger this based on user actions or other events
    // For simplicity, this example fetches todos on component mount
    addTodo({ title: 'New Todo', completed: false }); // Example of adding a todo
  }, [addTodo]);

  if (todosLoading) return <div>Loading...</div>;
//   if (todosError) return <div>Error: {todosError.status}</div>; // Handle error based on its structure

  return (
    <div>
      {todos &&
        todos.map((todo:any) => (
          <div key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
    </div>
  );
};

export default TodoList;
