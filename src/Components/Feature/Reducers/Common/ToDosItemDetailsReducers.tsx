import { actionTypes } from "../Action/action";

export const ToDOsItemDetailsReducers = (state:any, action:any) => {
    switch (action.type) {
      case actionTypes.FETCH_SUCCESS:
        return { todos: action.payload, loading: false, error: null };
      case actionTypes.FETCH_ERROR:
        return { todos: null, loading: false, error: action.payload };
      default:
        return state;
    }
};