import { ToDoProps } from "../Shared/interface";

const Todo = ({ todo, markCompleted, deleteTodo }:ToDoProps) => {
  const handleCompleted = () => {
    markCompleted(todo.id);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <div className={`todo ${todo.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={todo.completed} onChange={handleCompleted} />
      <span>{todo.text}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Todo;
