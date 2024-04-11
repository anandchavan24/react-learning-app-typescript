import React, { useState } from 'react';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title,
          body,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add todo item');
      }

      const data = await response.json();
      console.log('Todo item added:', data);
      
      // Clear form fields after successful submission
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Error adding todo item:', error);
    }
  };

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
