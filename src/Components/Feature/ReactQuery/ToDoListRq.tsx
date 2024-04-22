import { useQuery } from 'react-query';
import { ChangeEvent, useState } from 'react';
import { IToDoResp } from '../../../Shared/types'
import { API_URL } from '../../../Shared/constants';
import { SortUtils } from '../../Utils/SortUtils';
import TodoListContainer from '../ToDoListContainer';

const fetchTodos = async ({ pageNumber = 1}) => {
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
    return response.json();
};



const TodosListRqComponent = () => {
    const [pageNumber, setPageNumber] = useState<any>(0)
    const [originalTodos, setOriginalFilteredTodos] = useState<IToDoResp[]>([]);
    const [filteredTodos, setFilteredTodos] = useState<IToDoResp[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');

    const onSuccess =  (data:IToDoResp[]) =>{
        setFilteredTodos(data);
        setOriginalFilteredTodos(data)
    }

    const { isLoading, isError,error } = useQuery(['todos',pageNumber], ()=>fetchTodos(pageNumber),{
        onSuccess,
        refetchOnWindowFocus:false,
        keepPreviousData:true
    });


    const markCompleted = (id: number) => {
        if (filteredTodos) {
          const updatedTodos:IToDoResp[] | null = filteredTodos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          );
          setFilteredTodos(updatedTodos);
        }
      };
    
      const deleteTodo = (id: number) => {
        if (filteredTodos) {
          const updatedTodos = filteredTodos.filter(todo => todo.id !== id);
          setFilteredTodos(updatedTodos);
        }
      };
    
        // Handle search input
        const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e.target.value);
          filterTodos(e.target.value, sortBy, statusFilter);
      };
    
      // Handle sort dropdown
      const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
          setSortBy(e.target.value);
          filterTodos(searchTerm, e.target.value, statusFilter);
      };
    
      // Handle status dropdown
      const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
          setStatusFilter(e.target.value);
          filterTodos(searchTerm, sortBy, e.target.value);
      };
    
      // Filter todos based on search term, sort, and status
      const filterTodos = (search: string, sort: string, status: string) => {
          let filtered = filteredTodos ?? []
    
          if(!search){
            setFilteredTodos(originalTodos);
            filtered = originalTodos
          }
          else{
            filtered = filtered.filter(todo =>
              todo.title.toLowerCase().includes(search.toLowerCase())
            );
          }

          
          if (sort === 'asc') {
            filtered = SortUtils(filtered, 'asc');
          } else {
            filtered = SortUtils(filtered, 'desc');
          }
      
          if (status) {
              filtered = filtered.filter(todo => todo.completed === (status === 'completed'));
          }
    
          setFilteredTodos(filtered);
      };

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
            setPageNumber={setPageNumber}
          />
        </div>
      );
};

export default TodosListRqComponent;
