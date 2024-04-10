import { ITodo, ITToDoListProps } from '../Shared/types'
import Todo from './ToDo'

const ToDoList = ({ todos, markCompleted, deleteTodo }: ITToDoListProps) => {
  return (
    <div className='todo-list'>
      {todos.map((todo: ITodo) => (
        <Todo key={todo.id} todo={todo} markCompleted={markCompleted} deleteTodo={deleteTodo} />
      ))}
    </div>
  )
}

export default ToDoList

