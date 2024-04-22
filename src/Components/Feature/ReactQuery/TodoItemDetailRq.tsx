import { useState, useEffect } from "react";
import { IToDoResp, IToDoRespById } from "../../../Shared/types";
import useFetchById from "../../Common/useFetchById";
import { useParams } from "react-router-dom";

const TodoItemDetailRq = () =>{
    const { id } = useParams();

    const [todos, setTodos] = useState<IToDoResp | null>(null);

    const { data, loading, error }:IToDoRespById = useFetchById('https://jsonplaceholder.typicode.com/todos/'+id);
  
    useEffect(() => {
      if (data) {
        setTodos(data);
      }
    }, [data]);
  
  
    return (
      <div className='todo-list'>
        <h1>To Do List Item</h1>
        {loading && <p>Loading...</p>}
        {error && <div className="error-banner">{error}</div>}
        {todos && <p>{todos.title}</p>}
      </div>
    );
}

export default TodoItemDetailRq