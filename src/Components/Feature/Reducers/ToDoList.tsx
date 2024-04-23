import React, { useReducer, ChangeEvent } from 'react';
import TodoListContainer from '../ToDoListContainer';
import { useQuery } from 'react-query';
import { IToDoResp } from '../../../Shared/types';
import { API_URL, actionTypes, initialState } from '../../../Shared/constants';
import { SortUtils } from '../../Utils/SortUtils';
import { reducer } from '../../Utils/Reducers';


const TodoList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { pageNumber, filteredTodos, searchTerm, sortBy, statusFilter,originalTodos } = state;

  const onSuccess =  (data:IToDoResp[]) =>{
    dispatch({ type: actionTypes.SET_ORIGINAL_TODOS, payload: data });
  }

  const fetchTodos = async ({ pageNumber = 1}) => {
    try {
      const queryParams = new URLSearchParams({
        _page: pageNumber.toString(),
        _limit: '2',
        q: '',
        _sort: '',
      });
  
      const response = await fetch(`${API_URL}${queryParams}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      dispatch({ type: actionTypes.SET_ORIGINAL_TODOS, payload: data });
      dispatch({ type: actionTypes.SET_FILTERED_TODOS, payload: data });

      return data;
    } catch (error:any) {
      throw new Error('Error fetching todos: ' + error.message);
    }
  };
  

  const { isLoading, isError,error } = useQuery(['todos',pageNumber], ()=>fetchTodos(pageNumber),{
    onSuccess,
    refetchOnWindowFocus:false,
    keepPreviousData:true
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: actionTypes.SET_SEARCH_TERM, payload: e.target.value });
    filterTodos(e.target.value, sortBy, statusFilter);
  };

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: actionTypes.SET_SORT_BY, payload: e.target.value });
    filterTodos(searchTerm, e.target.value, statusFilter);
  };

  const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: actionTypes.SET_STATUS_FILTER, payload: e.target.value });
    filterTodos(searchTerm, sortBy, e.target.value);
  };

  const filterTodos = (search: string, sort: string, status: string) => {
    let filtered = filteredTodos ?? []
    
    if(!search){
      filtered = originalTodos
      dispatch({ type: actionTypes.SET_FILTERED_TODOS, payload: originalTodos });
    }
    else{
      filtered = filtered.filter((todo:any) =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    
    if (sort === 'asc') {
      filtered = SortUtils(filtered, 'asc');
    } else {
      filtered = SortUtils(filtered, 'desc');
    }

    if (status) {
        filtered = filtered.filter((todo:any) => todo.completed === (status === 'completed'));
    }
    dispatch({ type: actionTypes.SET_FILTERED_TODOS, payload: filtered });
  };

    function markCompleted(id: number): void {
        throw new Error('Function not implemented.');
    }

    function deleteTodo(id: number): void {
        throw new Error('Function not implemented.');
    }

  return (
    <div className="app-container">
      <TodoListContainer
        isLoading={isLoading}
        isError={isError}
        error={error}
        filteredTodos={filteredTodos}
        handleSearch={handleSearch}
        handleSort={handleSort}
        handleStatus={handleStatus}
        markCompleted={markCompleted}
        deleteTodo={deleteTodo}
        pageNumber={pageNumber}
        setPageNumber={(value:any) => dispatch({ type: actionTypes.SET_PAGE_NUMBER, payload: value })}
      />
    </div>
  );
};

export default TodoList;

