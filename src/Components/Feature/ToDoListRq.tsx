import { useQuery } from 'react-query';
import { ChangeEvent, useState } from 'react';
import { IToDoResp } from '../../Shared/types'
import Todo from './ToDo'
import FilterBar from './FIlterBar';

const fetchTodos = async ({ pageNumber = 1}) => {
    const queryParams = new URLSearchParams({
        _page: pageNumber.toString(),
        _limit: '2',
        q: '',
        _sort: '',
    });

    const response = await fetch(`http://localhost:5000/todos?${queryParams}`);
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
        console.log(data)
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
              filtered.sort((a, b) => a.id - b.id);
          } else if (sort === 'desc') {
              filtered.sort((a, b) => b.id - a.id);
          }
    
          if (status) {
              filtered = filtered.filter(todo => todo.completed === (status === 'completed'));
          }
    
          setFilteredTodos(filtered);
      };

      if (isLoading) return <div>Loading...</div>;
      if (isError) return <div>Error fetching data</div>;

      return (
        <div className='todo-list'>
          <h1>To Do List Item</h1>
          <FilterBar handleSearch={handleSearch} handleSort={handleSort} handleStatus={handleStatus}/>
          {isLoading && <p>Loading...</p>}
          {isError && <div className="error-banner">{error}</div>}
          {filteredTodos!=null && filteredTodos.length>0 && filteredTodos.map((todo: IToDoResp) => (
            <Todo key={todo.id} todo={todo} markCompleted={markCompleted} deleteTodo={deleteTodo} />
          ))}
         <div className="pagination-container">
            <button
                className="pagination-button"
                onClick={()=>setPageNumber((page:number)=>page-1)}
                disabled={pageNumber === 1}
            >
                Prev Page
            </button>
            <button
                className="pagination-button"
                onClick={()=>setPageNumber((page:number)=>page+1)}
                disabled={pageNumber === 4}
            >
                Next Page
            </button>
        </div>
        </div>
      );
};

export default TodosListRqComponent;
