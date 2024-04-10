import { ToDoInterface, ToDoListProps } from '../Shared/interface'
import Todo from './ToDo'

const ToDoList = ({ todos, markCompleted, deleteTodo }: ToDoListProps) => {
  return (
    <div className='todo-list'>
      {todos.map((todo: ToDoInterface) => (
        <Todo key={todo.id} todo={todo} markCompleted={markCompleted} deleteTodo={deleteTodo} />
      ))}
    </div>
  )
}

export default ToDoList

