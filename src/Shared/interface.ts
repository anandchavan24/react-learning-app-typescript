export interface ToDoInterface {
    id: number
    text: string
    completed: boolean
}

export interface ToDoListProps {
    todos: ToDoInterface[];
    markCompleted: (id: number) => any;  
    deleteTodo: (id: number) => any; 
  }

  export interface ToDoProps {
    todo: ToDoInterface;
    markCompleted: (id: number) => any;  
    deleteTodo: (id: number) => any; 
  }

  