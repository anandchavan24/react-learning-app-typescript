import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IToDoResp } from '../../../Shared/types';

interface TodosState {
  todos: IToDoResp[];
}

const initialState: TodosState = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<IToDoResp[]>) {
      state.todos = action.payload;
    },
    updateTodo(state, action: PayloadAction<IToDoResp>) {
      state.todos = state.todos.map(todo =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { setTodos, updateTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
