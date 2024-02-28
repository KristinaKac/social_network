import React, { ChangeEvent, FC, useState } from 'react';
import { useEffect } from 'react';
import { AppDispatch, useTypedSelector } from '../../../state/redux';
import { useDispatch } from 'react-redux';
import { getFollowersThunk, updateStatusThunk } from '../../../state/profileReducer';
import { getUsersThunk } from '../../../state/usersReducer';
import css from '../Profile.module.css';
import Follower from './Follower';
import { Empty } from 'antd';

type PropsType = {

}

const Followers: FC<PropsType> = ({ }) => {
    const dispatch: AppDispatch = useDispatch();

    const followers = useTypedSelector((state) => state.profilePage.followers);

    useEffect(() => {
        dispatch(getFollowersThunk());
    }, []);


    return (
        <React.Fragment>
            {followers?.length === 0
                ? <Empty style={{ marginTop: '25px' }} description='Пока друзей нет' />
                : <ul className={css.followers_list}>
                    {followers?.map((user: UsersType) =>
                        <Follower
                            key={user.id}
                            user={user} />)
                    }
                </ul>
            }
        </React.Fragment>
    )
}
export default Followers;