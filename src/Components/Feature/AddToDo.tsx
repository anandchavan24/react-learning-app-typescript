import React, { useState } from 'react';
import {  IToDoResp } from '../../Shared/types';
import AddFetch from '../Common/addFetch';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { data, loading, error}:
  { data: IToDoResp | null; loading: boolean; error: string | null } =  
  AddFetch('https://jsonplaceholder.typicode.com/todos',{
    title,
    body,
    userId: 1,
  },formSubmitted,setFormSubmitted);



  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    handleToDoAdd();
  };

  const handleToDoAdd = async () => {
      setFormSubmitted(true)
      setTitle('');
      setBody('');
  }

  return (
    <div>
      <h2>Add Todo Item</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
        <br />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
