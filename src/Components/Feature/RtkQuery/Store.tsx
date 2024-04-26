// import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { productsApi } from "./apiSlicce";
// // import { productsApi } from "./features/apiSlice";
// export const store = configureStore({
//   reducer: {
//     [productsApi.reducerPath]: productsApi.reducer,
//   },
//   // middleware: (getDefaultMiddleware) =>
//   //   getDefaultMiddleware().concat(productsApi.middleware),
// });

// src/app/store.js

// import { configureStore } from '@reduxjs/toolkit';
// import todoReducer, { todoApi } from './ToDoSlice';

// export default configureStore({
//   reducer: {
//     // Add the generated reducer as a named slice
//     // todos: todoReducer,
//     [todoApi.reducerPath]: todoApi.reducer,
//   },
// });

// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './ToDoSlice';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { todoApi } from './ToDoSlice'; // Import your API slice

const store = configureStore({
    reducer: {
      // Add the generated reducer as a named slice
    //   todos: todoReducer,
      [todoApi.reducerPath]: todoApi.reducer, // Add the RTK-Query reducer under its defined path
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todoApi.middleware), // Add the RTK-Query middleware
  });
  
  // Setup listeners after configuring the store
  setupListeners(store.dispatch);
  
  export default store;
  


