import '../styles/JobForm.css';

import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function JobForm({
  onAddJob,
  onUpdateJob,
  editingJob,
  isEditing,
}) {
  return (
    // https://formik.org/docs/overview
    <Formik
      enableReinitialize
      initialValues={{
        description: editingJob?.description || '',
        location: editingJob?.location || '',
        priority: editingJob?.priority || 'Low',
        status: editingJob?.status || 'submitted',
      }}
      validate={(values) => {
        const errors = {};
        if (!values.description) {
          errors.description = 'Required';
        }
        if (!values.location) {
          errors.location = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { resetForm }) => {
        if (isEditing) {
          onUpdateJob({
            ...editingJob,
            ...values,
          });
        } else {
          onAddJob({
            ...values,
            status: 'submitted',

            // i was using it but removed the date for simplicity and i didnt think it was necessary
            // ...(also layout wise i dont know where to put it)
            // dateSubmitted: new Date().toISOString(),
            // id: Date.now(),
          });
        }
        resetForm();
      }}
    >
      {() => (
        <Form className="job-form">
          {/* description */}
          <div>
            <label>Description</label>
            <Field name="description" placeholder="description" />
            <ErrorMessage
              className="error-messssage"
              name="description"
              component="div"
            />
          </div>
          {/* location */}
          <div>
            <label>Location</label>
            <Field name="location" placeholder="location" />
            <ErrorMessage
              name="location"
              component="div"
              className="error-messssage"
            />
          </div>
          {/* priority */}
          <div>
            <label>Priority</label>
            <Field as="select" name="priority">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </Field>
          </div>
          {/* isEditing is for modal */}
          {isEditing && (
            <div>
              <label>Status:</label>
              <Field as="select" name="status">
                <option value="submitted">Submitted</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </Field>
            </div>
          )}
          <button type="submit">{isEditing ? 'Update Job' : 'Add Job'}</button>
        </Form>
      )}
    </Formik>
  );
}
