import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import LoginSchema from './LoginFormValidation';
import css from '../Login.module.css';

const LoginForm = (props) => {
    return (
        <Formik
            initialValues={{ email: '', password: '', rememberMe: false, captcha: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting, setStatus }) => {
                props.loginThunk(values.email, values.password, values.rememberMe, values.captcha, setStatus);
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
                    {status && status.messages && <div className={css.messageError}>{status.messages}</div>}

                    {props.captcha && <img src={props.captcha} alt='captcha'/>}
                    {props.captcha && <Field type='text' name='captcha' placeholder='Captcha...' />}
                    
                    <button type="submit" disabled={isSubmitting}>
                        Log In
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm;