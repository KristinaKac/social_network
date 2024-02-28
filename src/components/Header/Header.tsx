import React, { FC, useEffect, useState } from 'react';
import css from './Header.module.css';
import img from '../../img/logo.png'
import { NavLink } from 'react-router-dom';
import { AppDispatch, useTypedSelector } from '../../state/redux';
import { useDispatch } from 'react-redux';
import { getAuthUserThunk, logoutThunk } from '../../state/authReducer';
import avatar from '../../img/avatar.png';
import { DownOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { actions } from '../../state/navBarReducer';

const Header = () => {

    const dispatch: AppDispatch = useDispatch();

    const isAuth = useTypedSelector((state) => state.auth.isAuth);
    const authId = useTypedSelector((state) => state.auth.id);
    const authUser = useTypedSelector((state) => state.auth.authUser);
    const mobileMenuActive = useTypedSelector((state) => state.navBarReducer.mobileMenuActive);

    useEffect(() => {
        if (!authId) return;
        dispatch(getAuthUserThunk(authId));
    }, [authId]);

    const content = (
        <div>
            <Button className={css.log_btn} onClick={() => dispatch(logoutThunk())} icon={<LogoutOutlined />}>
                Выйти
            </Button>
        </div>
    );


    return (
        <div className={css.header_wrapper}>
            <div className={css.header}>
                <div className={css.header_area}>

                    <nav className={css.burger_btn}>
                        <Button onClick={() => dispatch(actions.setMobileMenuActive(!mobileMenuActive))} icon={<MenuOutlined />} />
                    </nav>

                    <NavLink to={isAuth ? '/profile' : 'login'}>
                        <img className={css.logo} src={img} alt="" />
                    </NavLink>

                    <div className={css.auth_block}>
                        {isAuth
                            ? <div>
                                <Popover trigger='click' placement='bottomRight' content={content} >
                                    <button className={css.auth_button}>
                                        <img className={css.header_avatar} src={authUser ? authUser.photos?.small : avatar} alt="avatar" />
                                        <DownOutlined />
                                    </button>
                                </Popover>
                            </div>
                            : <Button style={{ padding: '0px 28px', border: 'none', backgroundColor: 'white' }}>
                                <NavLink to='/login'>Login</NavLink>
                            </Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;