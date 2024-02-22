import React, { ChangeEvent, FC, useState } from 'react';
import { useEffect } from 'react';
import { AppDispatch, useTypedSelector } from '../../../state/redux';
import { useDispatch } from 'react-redux';
import { getFollowersThunk, updateStatusThunk } from '../../../state/profileReducer';
import { getUsersThunk } from '../../../state/usersReducer';
import css from '../Profile.module.css';
import Follower from './Follower';

type PropsType = {

}

const Followers: FC<PropsType> = ({ }) => {
    const dispatch: AppDispatch = useDispatch();

    const followers = useTypedSelector((state) => state.profilePage.followers);

    useEffect(() => {
        dispatch(getFollowersThunk());
    }, []);


    return (
        <div className={css.folloers_list}>
            {followers?.map((user: UsersType) =>
                <Follower
                    key={user.id}
                    user={user} />)
            }
        </div>
    )
}
export default Followers;