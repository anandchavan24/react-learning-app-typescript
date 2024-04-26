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
    refetch: refetchTodos,
  } = useGetTodosQuery(undefined);
  const [deleteTodo, deleteTodoResult] = useDeleteTodoMutation();


  if (todosLoading) return <div>Loading...</div>;
  if (todosError) {
    if ('status' in todosError) {
      return <div>Error: {todosError.status}</div>;
    } else {
      return <div>Error: {todosError.message}</div>;
    }
  }

  const handleDeleteTodo = (id:number) => {
    deleteTodo(id); 
    refetchTodos()
  };


  return (
    <div>
      {todos &&
        todos.map((todo:any) => (
          <div key={todo.id}>
            <div className={`todo ${todo.completed ? 'completed' : ''}`}>
                <input type="checkbox" checked={todo.completed}  />
                <li key={todo.id}>
                    {todo.title}
                </li>
                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TodoList;
