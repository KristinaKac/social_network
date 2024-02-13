import React from 'react';
import css from './Users.module.css';
import Paginator from '../common/pagination/Paginator';
import User from './User';

type PropsType = {
    totalPages: number,
    maxPortionOnPage: number,
    currentPage: number,
    portionSize: number,
    users: Array<UsersType>,
    isBtnInProgress: Array<number>,
    onClickChangePage: (page: number) => void,
    unfollowThunk: (id: number) => void,
    followThunk: (id: number) => void,
}


const Users: React.FC<PropsType> = (props) => {

    

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
                {props.users.map((user: UsersType) => <User
                    key={user.id}
                    user={user}
                    isBtnInProgress={props.isBtnInProgress}
                    unfollowThunk={props.unfollowThunk}
                    followThunk={props.followThunk} />)
                }
            </ul>
        </div>
    )
}

export default Users;