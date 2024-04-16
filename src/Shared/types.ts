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

  export interface IToDoReq {
    userId: number
    title: string
    body: string
  }

  export interface IToDoRespD { 
    data: IToDoResp[] | null,
    loading: boolean,
    error: string | null 
  }

  export interface IToDoRespById { 
    data: IToDoResp | null,
    loading: boolean,
    error: string | null 
  }

  export interface FilterBarProps {
    handleSearch: (value: string) => void;
    handleSort: (value: string) => void;
    handleStatus: (value: string) => void;
  }
  

  