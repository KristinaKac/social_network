import React, { FC } from 'react';
import css from '../Profile.module.css';
import userPhoto from '../../../img/avatar.png';
import { NavLink } from 'react-router-dom';

type PropsType = {
    user: UsersType
}

const Follower: FC<PropsType> = ({ user }) => {

    return (
        <NavLink className={css.follower_link} to={`/profile/${user.id}`}>
            <img className={css.follower_img} src={user.photos.small ? user.photos.small : userPhoto} alt="avatar" />
            <span className={css.follower_name}>{user.name}</span>
        </NavLink>
    )
}
export default Follower;