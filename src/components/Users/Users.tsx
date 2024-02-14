import React, { useEffect } from 'react';
import css from './Users.module.css';
import Paginator from '../common/pagination/Paginator';
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StateType, useTypedSelector } from '../../state/redux';
import { getUsersThunk } from '../../state/usersReducer';
import UsersSearchForm from './UsersSearchForm';


const Users = () => {

    // const totalPages = useTypedSelector((state) => state.usersPage.totalPages);

    const totalPages = useSelector((state: StateType) => state.usersPage.totalPages);
    const maxPortionOnPage = useSelector((state: StateType) => state.usersPage.maxPortionOnPage);
    const currentPage = useSelector((state: StateType) => state.usersPage.currentPage);
    const portionSize = useSelector((state: StateType) => state.usersPage.portionSize);
    const users = useSelector((state: StateType) => state.usersPage.users);
    const isBtnInProgress = useSelector((state: StateType) => state.usersPage.isBtnInProgress);

    const filter = useSelector((state: StateType) => state.usersPage.filter);

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersThunk(currentPage, maxPortionOnPage, filter));
    }, [currentPage, maxPortionOnPage]);

    const onClickChangePage = (page: number) => {
        dispatch(getUsersThunk(page, maxPortionOnPage, filter));
    }

    return (
        <div className='users_wrapper'>
            <Paginator
                totalPages={totalPages}
                maxPortionOnPage={maxPortionOnPage}
                currentPage={currentPage}
                onClickChangePage={onClickChangePage}
                portionSize={portionSize}
            />

            <h2>People you can follow</h2>

            <UsersSearchForm />

            <ul className={css.users_list}>
                {users.map((user: UsersType) => <User
                    key={user.id}
                    user={user}
                    isBtnInProgress={isBtnInProgress} />)
                }
            </ul>
        </div>
    )
}

export default Users;