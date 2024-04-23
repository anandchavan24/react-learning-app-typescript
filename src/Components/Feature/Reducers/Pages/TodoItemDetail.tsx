import React, { useEffect, useReducer } from "react";
import { IToDoRespById } from "../../../../Shared/types";
import useFetchById from "../../../Common/useFetchById";
import { useParams } from "react-router-dom";
import { ToDOsItemDetailsReducers } from "../Common/ToDosItemDetailsReducers";
import { actionTypes } from "../Action/action";

const initialState = { todos: null, loading: true, error: null };
;

const TodoItemDetail = () => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(ToDOsItemDetailsReducers, initialState);

  const { data, loading, error }: IToDoRespById = useFetchById(
    "https://jsonplaceholder.typicode.com/todos/" + id
  );

  useEffect(() => {
    if (data) {
      dispatch({ type: actionTypes.FETCH_SUCCESS, payload: data });
    } else if (error) {
      dispatch({ type: actionTypes.FETCH_ERROR, payload: error });
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
