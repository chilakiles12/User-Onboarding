import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

function LoginForm({ errors }) {
  return (
    <Form>
      <div>
        {errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
      </div>

      <Field type="password" name="password" placeholder="Password" />
      <button type="submit">Submit!</button>
    </Form>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || '',
      password: password || ''
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(6)
      .typeError('Password must be at least 6 characters long')
      .required()
  }),

  handleSubmit(values) {
    console.log(values);
    //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
  }
})(LoginForm);

export default FormikLoginForm;
