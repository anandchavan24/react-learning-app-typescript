import { actionTypes } from "../../Shared/constants";

export const reducer = (state:any, action:any) => {
    switch (action.type) {
      case actionTypes.SET_PAGE_NUMBER:
        return { ...state, pageNumber: action.payload };
      case actionTypes.SET_ORIGINAL_TODOS:
        return { ...state, originalTodos: action.payload };
      case actionTypes.SET_FILTERED_TODOS:
        return { ...state, filteredTodos: action.payload };
      case actionTypes.SET_SEARCH_TERM:
        return { ...state, searchTerm: action.payload };
      case actionTypes.SET_SORT_BY:
        return { ...state, sortBy: action.payload };
      case actionTypes.SET_STATUS_FILTER:
        return { ...state, statusFilter: action.payload };
      default:
        return state;
    }
  };