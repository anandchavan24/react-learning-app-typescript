export interface ITodo {
    id: number
    text: string
    completed: boolean
}

export interface ITToDoListProps {
    todos: IToDoResp[];
    markCompleted: (id: number) => any;  
    deleteTodo: (id: number) => any; 
  }

  export interface ITToDoProps {
    todo: IToDoResp;
    markCompleted: (id: number) => any;  
    deleteTodo: (id: number) => any; 
  }

  export interface IToDoResp {
    userId: number
    id: number
    title: string
    completed: boolean
  }
  

  