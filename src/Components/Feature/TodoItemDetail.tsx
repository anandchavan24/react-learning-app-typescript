import { useState, useEffect } from "react";
import { IToDoResp } from "../../Shared/types";
import useFetchById from "../Common/useFetchById";
import Todo from "./ToDo";
import { useParams } from "react-router-dom";

const TodoItemDetail = () =>{
    const { id } = useParams();

    const [todos, setTodos] = useState<IToDoResp | null>(null);

    const { data, loading, error }:{ data:IToDoResp | null; loading: boolean; error: string | null } = useFetchById('https://jsonplaceholder.typicode.com/todos/'+id);
  
    useEffect(() => {
      if (data) {
        setTodos(data);
      }
    }, [data]);
  
    const markCompleted = (id: number) => {
      if (todos ) {
        todos.completed  = !todos.completed
        setTodos(todos);
      }
    };
  
    const deleteTodo = (id: number) => {
      if (todos) {
        // const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(todos);
      }
    };
  
    return (
      <div className='todo-list'>
        <h1>To Do List Item</h1>
        {loading && <p>Loading...</p>}
        {error && <div className="error-banner">{error}</div>}
        {todos && <p>{todos.title}</p>}
        {/* {todos && <Todo key={todos.id} todo={todos} markCompleted={markCompleted} deleteTodo={deleteTodo} />} */}
      </div>
    );
}

export default TodoItemDetail