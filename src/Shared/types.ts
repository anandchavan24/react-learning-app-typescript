import { ChangeEvent } from "react";

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

 
  export interface  Error{
    ErrorMessage:string
}

export interface FilterBarProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement>)=> void;
  handleSort: (e: ChangeEvent<HTMLSelectElement>)=> void;
  handleStatus: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export interface TaskFormValues {
  title: string;
  description: string;
  assignee: string;
  dueDate: Date;
}
  

  