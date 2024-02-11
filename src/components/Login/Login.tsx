import React, { FC } from 'react';
import css from './Login.module.css';
import LoginForm from './LoginForm/LoginForm';

type PropsType = {
    captcha: string | null, 
    loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string | null, setStatus: any) => void
}

const Login: FC<PropsType> = ({captcha, loginThunk}) => {
    
    return (
        <div className={css.login_wrapper}>
            <LoginForm loginThunk={loginThunk} captcha={captcha} />
        </div>
    )
}

export default Login;