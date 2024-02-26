import React, { FC } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import LoginSchema from './LoginFormValidation';
import css from '../Login.module.css';
import { AppDispatch, useTypedSelector } from '../../../state/redux';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../../state/authReducer';
import { Input } from 'antd';

const LoginForm = () => {

    const captcha = useTypedSelector((state) => state.auth.captcha);
    const dispatch: AppDispatch = useDispatch();

    return (
        <Formik
            initialValues={{ email: '', password: '', rememberMe: false, captcha: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting, setStatus }) => {
                dispatch(loginThunk(values.email, values.password, values.rememberMe, values.captcha, setStatus));
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, status }) => (
                <Form className={css.form}>
                    <div className={css.form_control}>
                        <Field className={css.form_input} type='text' name='email' placeholder='Почта...' />
                    </div>
                    <ErrorMessage className={css.error} name="email" component="div" />
                    <div className={css.form_control}>
                        <Field className={css.form_input} type='password' name='password' placeholder='Пароль...' />
                    </div>
                    <ErrorMessage className={css.error} name="password" component="div" />
                    <div className={css.form_control_checkbox}>
                        <Field type='checkbox' name='rememberMe' />
                        <label className={css.form_checkbox} htmlFor="rememberMe">Сохранить вход</label>
                    </div>
                    {status && status.messages && <div className={css.messageError}>{status.messages}</div>}

                    {captcha && <img className={css.form_captcha} src={captcha} alt='captcha'/>}
                    {captcha && <Field className={css.form_input} type='text' name='captcha' placeholder='Captcha...' />}
                    
                    <button className={css.form_submit} type="submit" disabled={isSubmitting}>
                        Вход
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm;