import React from 'react';
import css from './NavBar.module.css';
import { NavLink } from 'react-router-dom';
import users from '../../img/users.png';
import message from '../../img/message.png';
import profile from '../../img/profile.png';

const NavBar = () => {
    return (
        <ul className={css.nav_list}>
            <li className={css.nav_item}>
                <img src={profile} alt="profile" />
                <NavLink to="/profile" className={link => link.isActive ? `${css.active} ${css.nav_link}` : `${css.nav_link}`}>Profile</NavLink>
            </li>
            <li className={css.nav_item}>
                <img src={message} alt="messages" />
                <NavLink to="/chat" className={link => link.isActive ? `${css.active} ${css.nav_link}` : `${css.nav_link}`}>Chat</NavLink>
            </li>
            <li className={css.nav_item}>
                <img src={users} alt="users" />
                <NavLink to="/users" className={link => link.isActive ? `${css.active} ${css.nav_link}` : `${css.nav_link}`}>Users</NavLink>
            </li>
            {/* <li className={css.nav_item}>
                <NavLink to="/music">Music</NavLink>
            </li>
            <li className={css.nav_item}>
                <NavLink to="/news">News</NavLink>
            </li>
            <li className={css.nav_item}>
                <NavLink to="/settings">Settings<NavLink>
            </li> */}
        </ul>
    )
}

export default NavBar;
