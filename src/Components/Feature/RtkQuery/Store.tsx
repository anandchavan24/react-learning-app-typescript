import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { todoApi } from './ToDoSlice'; // Import your API slice

const store = configureStore({
    reducer: {
      [todoApi.reducerPath]: todoApi.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todoApi.middleware),
  });
  
  setupListeners(store.dispatch);
  
  export default store;
  


