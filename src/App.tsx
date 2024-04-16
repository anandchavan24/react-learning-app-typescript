import './App.css';
import AddToDo from './Components/Feature/AddToDo';
import TodoList from './Components/Feature/ToDoList';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import TodoItemDetail from './Components/Feature/TodoItemDetail';
import { QueryClient, QueryClientProvider } from 'react-query';
import TodosListRqComponent from './Components/Feature/ToDoListRq';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/add-todo" Component={AddToDo} />
            <Route path="/todos/:id" Component={TodoItemDetail} />
            <Route path="/" Component={TodosListRqComponent} />
          </Routes>
        </BrowserRouter>      
      </QueryClientProvider>
    </div>
  );
}

export default App;
