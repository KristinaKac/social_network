import React from 'react';
import css from './NavBar.module.css';
import { NavLink } from 'react-router-dom';
import users from '../../img/users.png';
import message from '../../img/message.png';
import profile from '../../img/profile.png';
import { useTypedSelector } from '../../state/redux';

const NavBar = () => {

    const isAuth = useTypedSelector((state) => state.auth.isAuth);
    return (
        <React.Fragment>
            {isAuth
                ?
                <ul className={css.nav_list}>
                    <li className={css.nav_item}>
                        <img src={profile} alt="profile" />
                        <NavLink to="/profile" className={link => link.isActive ? `${css.active} ${css.nav_link}` : `${css.nav_link}`}>Профиль</NavLink>
                    </li>
                    <li className={css.nav_item}>
                        <img src={message} alt="messages" />
                        <NavLink to="/chat" className={link => link.isActive ? `${css.active} ${css.nav_link}` : `${css.nav_link}`}>Мессенджер</NavLink>
                    </li>
                    <li className={css.nav_item}>
                        <img src={users} alt="users" />
                        <NavLink to="/users" className={link => link.isActive ? `${css.active} ${css.nav_link}` : `${css.nav_link}`}>Пользователи</NavLink>
                    </li>
                </ul>
                :
                <ul className={css.nav_list}>
                    <li className={css.nav_item}>
                        {/* <img  alt="login" /> */}
                        <NavLink to="/login" className={link => link.isActive ? `${css.active} ${css.nav_link}` : `${css.nav_link}`}>Login</NavLink>
                    </li>
                </ul>
            }
        </React.Fragment>

    )
}

export default NavBar;
