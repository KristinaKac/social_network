import React, { FC } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import LoginSchema from './LoginFormValidation';
import css from '../Login.module.css';

type PropsType = {
    captcha: string | null, 
    loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string | null, setStatus: any) => void
}

const LoginForm : FC<PropsType> = ({captcha, loginThunk}) => {
    return (
        <Formik
            initialValues={{ email: '', password: '', rememberMe: false, captcha: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting, setStatus }) => {
                loginThunk(values.email, values.password, values.rememberMe, values.captcha, setStatus);
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

                    {captcha && <img src={captcha} alt='captcha'/>}
                    {captcha && <Field type='text' name='captcha' placeholder='Captcha...' />}
                    
                    <button type="submit" disabled={isSubmitting}>
                        Log In
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm;