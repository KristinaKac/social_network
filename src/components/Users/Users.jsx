import React from 'react';
import css from './Users.module.css';
import userPhoto from '../../img/user.png'
import { NavLink } from 'react-router-dom';
import Paginator from '../common/pagination/Paginator';


const Users = (props) => {

    return (

        <div className='users_wrapper'>
            <Paginator
                totalPages={props.totalPages}
                maxPortionOnPage={props.maxPortionOnPage}
                currentPage={props.currentPage}
                onClickChangePage={props.onClickChangePage}
                portionSize={props.portionSize}
            />

            <h2>People you can follow</h2>

            <ul className={css.users_list}>

                {props.usersPage.users.map(user =>

                    <div id={user.id} className={css.user_item}>
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
                                    <button disabled={props.isBtnInProgress.some(id => id === user.id)} className={css.btn_follow}
                                        onClick={() => { props.unfollowThunk(user.id) }}>Unfollow</button>
                                    :
                                    <button disabled={props.isBtnInProgress.some(id => id === user.id)} className={css.btn_follow}
                                        onClick={() => { props.followThunk(user.id) }}>Follow</button>
                            }
                        </div>
                    </div>
                )}
            </ul>
        </div>
    )
}

export default Users;