import React, { FC } from 'react';
import css from './Header.module.css';
import img from '../../img/logo.png'
import { NavLink } from 'react-router-dom';
import { AppDispatch, useTypedSelector } from '../../state/redux';
import { useDispatch } from 'react-redux';
import { logoutThunk } from '../../state/authReducer';

const Header = () => {

    const isAuth = useTypedSelector((state) => state.auth.isAuth);
    const login = useTypedSelector((state) => state.auth.login);

    const dispatch: AppDispatch = useDispatch();

    return (
        <div className={css.header}>
            <img src={img} alt="" />

            <div className={css.auth_block}>
                {isAuth
                    ? <div>
                        <div>{login}</div>
                        <button onClick={() => dispatch(logoutThunk)}>Logout</button>
                    </div>
                    : <NavLink to='/login'>Login</NavLink>}
            </div>
        </div>
    )
}

export default Header;