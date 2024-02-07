import React from 'react';
import css from './Login.module.css';
import LoginForm from './LoginForm/LoginForm';


const Login = (props) => {
    
    return (
        <div className={CSS.login_wrapper}>
            <LoginForm loginThunk={props.loginThunk}/>
        </div>
    )
}

export default Login;