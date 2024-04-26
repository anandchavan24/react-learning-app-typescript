// types.ts

import store from "./Store";

// Define action types
export enum ActionTypes {
    SET_TODOS = 'SET_TODOS',
    UPDATE_TODO = 'UPDATE_TODO',
    DELETE_TODO = 'DELETE_TODO',
  }
  
  // Define todo item type
  export interface TodoItem {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }
  
  // Define state shape for todos
  export interface TodoState {
    todos: TodoItem[];
  }
  
  // Define action interfaces
  interface SetTodosAction {
    type: ActionTypes.SET_TODOS;
    payload: TodoItem[];
  }
  
  interface UpdateTodoAction {
    type: ActionTypes.UPDATE_TODO;
    payload: TodoItem;
  }
  
  interface DeleteTodoAction {
    type: ActionTypes.DELETE_TODO;
    payload: number; // ID of the todo to delete
  }
  
  export type TodoAction = SetTodosAction | UpdateTodoAction | DeleteTodoAction;
  
  // Define RootState type for useSelector
  export interface RootState {
    todos: TodoState;
  }
  
  // Define Dispatch type for useDispatch
  export type AppDispatch = typeof store.dispatch;
  