import React, { FC } from 'react';
import css from './Login.module.css';
import LoginForm from './LoginForm/LoginForm';
import { WithRedirectComponentToProfile } from '../../hoc/withRedirectComponent';

const Login = () => {

    return (
        <div className={css.login_wrapper}>
            <h2>Вход в SocNetw</h2>
            <LoginForm />
        </div>
    )
}

export default WithRedirectComponentToProfile(Login);