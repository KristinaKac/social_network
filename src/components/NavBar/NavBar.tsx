import React from 'react';
import css from './NavBar.module.css';
import { NavLink } from 'react-router-dom';
import users from '../../img/users.png';
import message from '../../img/message.png';
import profile from '../../img/profile.png';
import { useTypedSelector } from '../../state/redux';
import { UserOutlined, MessageOutlined, UsergroupAddOutlined } from '@ant-design/icons';

const NavBar = () => {

    const isAuth = useTypedSelector((state) => state.auth.isAuth);
    return (
        <React.Fragment>
            {isAuth
                &&
                <div className={css.nav_back}>
                    <ul className={css.nav_list}>
                        <NavLink to="/profile" className={link => link.isActive ? `${css.active} ${css.nav_link}` : `${css.nav_link}`}>
                            <li className={css.nav_item}>
                                <UserOutlined />
                                <span>Профиль</span>
                            </li>
                        </NavLink>
                        <NavLink to="/chat" className={link => link.isActive ? `${css.active} ${css.nav_link}` : `${css.nav_link}`}>
                            <li className={css.nav_item}>
                                <MessageOutlined />
                                <span>Мессенджер</span>
                            </li>
                        </NavLink>
                        <NavLink to="/users" className={link => link.isActive ? `${css.active} ${css.nav_link}` : `${css.nav_link}`}>
                            <li className={css.nav_item}>
                                <UsergroupAddOutlined />
                                <span>Пользователи</span>
                            </li>
                        </NavLink>
                    </ul>
                </div>
            }
        </React.Fragment>

    )
}

export default NavBar;
