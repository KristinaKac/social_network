import React from 'react';
import userPhoto from '../../img/user.png';
import { NavLink } from 'react-router-dom';
import css from './Users.module.css';
import { AppDispatch, useTypedSelector } from '../../state/redux';
import { useDispatch } from 'react-redux';
import { followThunk, unfollowThunk } from '../../state/usersReducer';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';


type PropsType = {
    user: UsersType,
    isBtnInProgress: Array<number>,
}

const User: React.FC<PropsType> = ({ user, isBtnInProgress }) => {
    const dispatch: AppDispatch = useDispatch();

    return (
        <div key={user.id} className={css.user_item}>
            <NavLink to={`/profile/${user.id}`} className={css.user_info}>
                {user.photos.small
                    ? <img className={css.user_avatar} src={user.photos.small} alt="" />
                    : <Avatar size={80} style={{ backgroundColor: '#79b9f1' }} icon={<UserOutlined />} />}
                <div className={css.user_description}>
                    <span className={css.user_name}>{user.name}</span>
                    <span className={css.user_status}>{user.status}</span>
                </div>
            </NavLink>
            <div>
                {
                    user.followed ?
                        <button disabled={isBtnInProgress.some(id => id === user.id)} className={css.btn_follow}
                            onClick={() => { dispatch(unfollowThunk(user.id)) }}>Убрать из друзей</button>
                        :
                        <button disabled={isBtnInProgress.some(id => id === user.id)} className={css.btn_follow}
                            onClick={() => { dispatch(followThunk(user.id)) }}>Добавить в друзья</button>
                }
            </div>
        </div>
    )
}

export default User;