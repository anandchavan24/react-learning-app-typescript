import { ITToDoProps } from "../Shared/types";
  
  const Todo = ({ todo, markCompleted, deleteTodo }:ITToDoProps) => {
  const handleCompleted = () => {
    markCompleted(todo.id);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <div className={`todo ${todo.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={todo.completed} onChange={handleCompleted} />
      <span>{todo.title}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Todo;
