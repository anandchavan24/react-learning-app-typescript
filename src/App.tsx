import './App.css';
import AddToDo from './Components/Feature/AddToDo';
import TodoList from './Components/Feature/ToDoList';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import TodoItemDetail from './Components/Feature/TodoItemDetail';

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/add-todo" Component={AddToDo} />
          <Route path="/todos/:id" Component={TodoItemDetail} />
          <Route path="/" Component={TodoList} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
