import React, { FC } from 'react';
import css from '../Profile.module.css';
import { NavLink } from 'react-router-dom';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

type PropsType = {
    user: UsersType
}

const Follower: FC<PropsType> = ({ user }) => {

    return (
        <NavLink className={css.follower_link} to={`/profile/${user.id}`}>
            {user.photos.small
                ? <img className={css.follower_img} src={user.photos.small} />
                : <Avatar className={css.follower_img} size={64} style={{ backgroundColor: '#79b9f1' }} icon={<UserOutlined />} />
            }
            <span className={css.follower_name}>{user.name}</span>
        </NavLink>
    )
}
export default Follower;