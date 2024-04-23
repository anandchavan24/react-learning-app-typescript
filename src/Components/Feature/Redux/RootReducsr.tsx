// rootReducer.ts
import { combineReducers } from 'redux';
import todosReducer from './ToDoReducer';

const rootReducer = combineReducers({
  todos: todosReducer,
  // Add other reducers if needed
});

export default rootReducer;
