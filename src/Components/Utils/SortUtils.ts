import { IToDoResp } from "../../Shared/types";

  
export const SortUtils = (todos: IToDoResp[], sortOrder: 'asc' | 'desc'): IToDoResp[] => {
    const sortedTodos = [...todos]; // Create a copy of the array to avoid mutating the original
    sortedTodos.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    return sortedTodos;
};
  