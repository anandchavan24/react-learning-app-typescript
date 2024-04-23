import './App.css';
import AddToDo from './Components/Feature/AddToDo';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import TodoItemDetail from './Components/Feature/Reducers/Pages/TodoItemDetail';
import { QueryClient, QueryClientProvider } from 'react-query';
import TodosListRqComponent from './Components/Feature/ReactQuery/ToDoListRq';
import TaskForm from './Components/Feature/TaskForm';
import ToDoList from './Components/Feature/Reducers/Pages/ToDoList';



const queryClient = new QueryClient();

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/add-todo" Component={AddToDo} />
            <Route path="/todos/:id" Component={TodoItemDetail} />
            <Route path="/" Component={ToDoList} />
            <Route path="/task" Component={TaskForm} />
          </Routes>
        </BrowserRouter>      
      </QueryClientProvider>
    </div>
  );
}

export default App;
