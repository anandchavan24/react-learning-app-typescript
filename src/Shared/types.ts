export interface ITodo {
    id: number
    text: string
    completed: boolean
}

export interface ITToDoListProps {
    todos: ITodo[];
    markCompleted: (id: number) => any;  
    deleteTodo: (id: number) => any; 
  }

  export interface ITToDoProps {
    todo: ITodo;
    markCompleted: (id: number) => any;  
    deleteTodo: (id: number) => any; 
  }

  