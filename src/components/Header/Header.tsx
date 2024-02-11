import React, { FC } from 'react';
import css from './Header.module.css';
import img from '../../img/logo.png'
import { NavLink } from 'react-router-dom';

type PropsType = {
    isAuth: boolean,
    login: string | null,
    logoutThunk: () => void
}

const Header: FC<PropsType> = ({isAuth, login, logoutThunk}) => {

    return (
        <div className={css.header}>
            <img src={img} alt="" />

            <div className={css.auth_block}>
                {isAuth
                    ? <div>
                        <div>{login}</div>
                        <button onClick={logoutThunk}>Logout</button>
                    </div>
                    : <NavLink to='/login'>Login</NavLink>}
            </div>
        </div>
    )
}

export default Header;