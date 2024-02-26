import React, { useEffect } from 'react';
import css from './Users.module.css';
import Paginator from '../common/pagination/Paginator';
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StateType, useTypedSelector } from '../../state/redux';
import { getUsersThunk } from '../../state/usersReducer';
import UsersSearchForm from './UsersSearchForm';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';


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

    let location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/users?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`)
    }, [filter, currentPage]);

    useEffect(() => {
        const parsed = queryString.parse(location.search) as {term: string, friend: string, page: string};

        let actualFilter = filter;
        
        let actualPage = currentPage;

        if(parsed.term) actualFilter = {...actualFilter, term: parsed.term as string};
        if(parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === "null" ? null : parsed.friend === "true" ? true : false};
        if(parsed.page) actualPage = Number(parsed.page);
        
        dispatch(getUsersThunk(actualPage, maxPortionOnPage, actualFilter));
    }, []);


    // useEffect(() => {
    //     navigate(`/users?term=${filter.term}&friend=${filter.friend}`)
    //     dispatch(getUsersThunk(currentPage, maxPortionOnPage, filter));
    // }, [currentPage, maxPortionOnPage, filter]);

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