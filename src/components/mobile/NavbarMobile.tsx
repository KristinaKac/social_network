import React from 'react';
import css from './NavbarMobile.module.css';
import { NavLink } from 'react-router-dom';
import { AppDispatch, useTypedSelector } from '../../state/redux';
import { UserOutlined, MessageOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { actions } from '../../state/navBarReducer';
import { useDispatch } from 'react-redux';



const NavbarMobile = () => {
    
    const dispatch: AppDispatch = useDispatch();
    
    const mobileMenuActive = useTypedSelector((state) => state.navBarReducer.mobileMenuActive);
    const isAuth = useTypedSelector((state) => state.auth.isAuth);
    
    return (
        <React.Fragment>
            {isAuth && mobileMenuActive
                &&
                <div className={css.nav_back}>
                    <ul className={css.nav_list} onClick={(e) => e.stopPropagation()}>
                        <NavLink onClick={() => dispatch(actions.setMobileMenuActive(!mobileMenuActive))} to="/profile" className={link => link.isActive ? `${css.active} ${css.nav_link}` : `${css.nav_link}`}>
                            <li className={css.nav_item}>
                                <UserOutlined />
                                <span>Профиль</span>
                            </li>
                        </NavLink>
                        <NavLink onClick={() => dispatch(actions.setMobileMenuActive(!mobileMenuActive))} to="/chat" className={link => link.isActive ? `${css.active} ${css.nav_link}` : `${css.nav_link}`}>
                            <li className={css.nav_item}>
                                <MessageOutlined />
                                <span>Мессенджер</span>
                            </li>
                        </NavLink>
                        <NavLink onClick={() => dispatch(actions.setMobileMenuActive(!mobileMenuActive))} to="/users" className={link => link.isActive ? `${css.active} ${css.nav_link}` : `${css.nav_link}`}>
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

export default NavbarMobile;
