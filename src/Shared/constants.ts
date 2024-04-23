export const API_URL = 'http://localhost:5000/todos?';


export const initialState = {
    pageNumber: 0,
    originalTodos: [],
    filteredTodos: [],
    searchTerm: '',
    sortBy: '',
    statusFilter: '',
  };
  
  export const actionTypes = {
    SET_PAGE_NUMBER: 'SET_PAGE_NUMBER',
    SET_ORIGINAL_TODOS: 'SET_ORIGINAL_TODOS',
    SET_FILTERED_TODOS: 'SET_FILTERED_TODOS',
    SET_SEARCH_TERM: 'SET_SEARCH_TERM',
    SET_SORT_BY: 'SET_SORT_BY',
    SET_STATUS_FILTER: 'SET_STATUS_FILTER',
  };
