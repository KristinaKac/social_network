import React from 'react';
import userPhoto from '../../img/user.png';
import { NavLink } from 'react-router-dom';
import css from './Users.module.css';


type PropsType = {
    user: UsersType,
    isBtnInProgress: Array<number>,
    unfollowThunk: (userId: number) => void,
    followThunk: (userId: number) => void,
}

const User: React.FC<PropsType> = ({ user, isBtnInProgress, unfollowThunk, followThunk }) => {
    return (
        <div key={user.id} className={css.user_item}>
            <NavLink to={`/profile/${user.id}`} className={css.user_info}>
                <img src={user.photos.small ? user.photos.small : userPhoto} alt="avatar" />
                <div className={css.user_description}>
                    <span className={css.user_name}>{user.name}</span>
                    <span className={css.user_status}>{user.status}</span>
                </div>
            </NavLink>
            <div>
                {
                    user.followed ?
                        <button disabled={isBtnInProgress.some(id => id === user.id)} className={css.btn_follow}
                            onClick={() => { unfollowThunk(user.id) }}>Unfollow</button>
                        :
                        <button disabled={isBtnInProgress.some(id => id === user.id)} className={css.btn_follow}
                            onClick={() => { followThunk(user.id) }}>Follow</button>
                }
            </div>
        </div>
    )
}

export default User;