import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { FormGroup, Label, Input, Button, Card, CardBody } from 'reactstrap';

interface TaskFormValues {
  title: string;
  description: string;
  assignee: string;
  dueDate: Date;
}

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
    <div className="container mt-5">
      <Card className="w-50 mx-auto">
        <CardBody>
          <h1 className="text-center mb-4">Task Form</h1>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" id="title" name="title" className="form-control" />
                <ErrorMessage name="title" component="div" className="error-message" />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" id="description" name="description" className="form-control" />
                <ErrorMessage name="description" component="div" className="error-message" />
              </FormGroup>
              <FormGroup>
                <Label for="assignee">Assignee</Label>
                <Input type="text" id="assignee" name="assignee" className="form-control" />
                <ErrorMessage name="assignee" component="div" className="error-message" />
              </FormGroup>
              <FormGroup>
                <Label for="dueDate">Due Date</Label>
                <Input type="date" id="dueDate" name="dueDate" className="form-control" />
                <ErrorMessage name="dueDate" component="div" className="error-message" />
              </FormGroup>
              <Button type="submit" color="primary" className="w-100 mt-3">Submit</Button>
            </Form>
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default TaskForm;
