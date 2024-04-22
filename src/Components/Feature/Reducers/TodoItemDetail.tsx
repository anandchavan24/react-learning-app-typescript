import React, { useEffect, useReducer } from "react";
import { IToDoRespById } from "../../../Shared/types";
import useFetchById from "../../Common/useFetchById";
import { useParams } from "react-router-dom";

const initialState = { todos: null, loading: true, error: null };

const reducer = (state:any, action:any) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { todos: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return { todos: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

const TodoItemDetail = () => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data, loading, error }: IToDoRespById = useFetchById(
    "https://jsonplaceholder.typicode.com/todos/" + id
  );

  useEffect(() => {
    if (data) {
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } else if (error) {
      dispatch({ type: "FETCH_ERROR", payload: error });
    }
  }, [data, error]);

  const { todos } = state;

  return (
    <div className="todo-list">
      <h1>To Do List Item</h1>
      {state.loading && <p>Loading...</p>}
      {state.error && <div className="error-banner">{state.error}</div>}
      {todos && <p>{todos.title}</p>}
    </div>
  );
};

export default TodoItemDetail;
