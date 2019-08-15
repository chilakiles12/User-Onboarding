import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function LoginForm({ values, errors, touched }) {
  return (
    <Form>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" />
      </div>
      <Field component="select" name="title">
        <option value="Manager">Manager</option>
        <option value="Outside Sales">Outside Sales</option>
        <option value="Inside Sales">Inside Sales</option>
      </Field>
      <label>
        <Field type="checkbox" name="tos" checked="{values.tos}" />
      </label>
      <button type="submit">Submit!</button>
    </Form>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ email, password, tos, title }) {
    return {
      email: email || '',
      password: password || '',
      tos: tos || false,
      title: title || 'manager'
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Email not valid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be 6 characters or longer')

      .required('Password is required')
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.email === 'alreadytaken@atb.dev') {
      setErrors({ email: 'That email is already taken' });
    } else {
      axios
        .post('https://yourdatabaseurlgoeshere.com', values)
        .then(res => {
          console.log(res); // Data was created successfully and logs to console
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err); // There was an error creating the data and logs to console
          setSubmitting(false);
        });
    }
  }
})(LoginForm);

export default FormikLoginForm;
