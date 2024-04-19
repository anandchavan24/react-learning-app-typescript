import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TaskFormValues } from '../../Shared/types';

const TaskForm = () => {
  const initialValues: TaskFormValues = {
    title: '',
    description: '',
    assignee: '',
    dueDate: new Date(),
  };

  const handleSubmit = (values: TaskFormValues) => {
    // Handle form submission here
    console.log(values);
  };

  return (
    <div>
      <h1>Task Form</h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage name="title" component="div" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field as="textarea" id="description" name="description" />
            <ErrorMessage name="description" component="div" />
          </div>
          <div>
            <label htmlFor="assignee">Assignee</label>
            <Field type="text" id="assignee" name="assignee" />
            <ErrorMessage name="assignee" component="div" />
          </div>
          <div>
            <label htmlFor="dueDate">Due Date</label>
            <Field type="date" id="dueDate" name="dueDate" />
            <ErrorMessage name="dueDate" component="div" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default TaskForm;
