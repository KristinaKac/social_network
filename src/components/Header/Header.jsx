import React from 'react';
import css from './Header.module.css';
import img from '../../img/logo.png'
import { NavLink } from 'react-router-dom';

const Header = (props) => {

    return (
        <div className={css.header}>
            <img src={img} alt="" />

            <div className={css.auth_block}>
                {props.isAuth
                    ? <div>
                        <div>{props.login}</div>
                        <button onClick={props.logoutThunk}>Logout</button>
                    </div>
                    : <NavLink to='/login'>Login</NavLink>}
            </div>
        </div>
    )
}

export default Header;