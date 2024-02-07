import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import LoginSchema from './LoginFormValidation';
import css from '../Login.module.css';

const LoginForm = (props) => {
    return (
        <Formik
            initialValues={{ email: '', password: '', rememberMe: false }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting, setStatus }) => {
                props.loginThunk(values.email, values.password, values.rememberMe, setStatus);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, status }) => (
                <Form>
                    <div>
                        <Field type='text' name='email' placeholder='Email...' />
                    </div>
                    <ErrorMessage name="email" component="div" />
                    <div>
                        <Field type='password' name='password' placeholder='Password...' />
                    </div>
                    <ErrorMessage name="password" component="div" />
                    <div>
                        <label htmlFor="rememberMe">Remember Me</label>
                        <Field type='checkbox' name='rememberMe' />
                    </div>
                    {status && status.message && <div className={css.messageError}>{status.message}</div>}
                    
                    

                    <button type="submit" disabled={isSubmitting}>
                        Log In
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm;