import React, { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, useEffect, useState } from 'react';
import css from './Profile.module.css'
import Post from './Post/Post';

import Preloader from '../common/preloader/Preloader';
import ProfileInfo from './ProfileInfo';
import ProfileForm from './ProfileForm/ProfileForm';
import ModalTextarea from '../common/modalTextarea/ModalTextarea';
import { AppDispatch, useTypedSelector } from '../../state/redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../state/profileReducer';
import Followers from './Followers/Followers';
import { NavLink } from 'react-router-dom';

type PropsType = {
    isOwner: boolean,
}

const Profile: FC<PropsType> = ({ isOwner }) => {
    const [editMode, setEditMode] = useState(false);

    const [width, setWidth] = useState(window.innerWidth);

    const breakpoint = 700;

    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    const isSuccessEdit = useTypedSelector((state) => state.profilePage.isSuccessEdit);
    const currentUser = useTypedSelector((state) => state.profilePage.currentUser);
    const posts = useTypedSelector((state) => state.profilePage.posts);
    const authUser = useTypedSelector((state) => state.auth.authUser);

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (isSuccessEdit) {
            setEditMode(false);
        }
        dispatch(actions.setEdit(false));
    }, [isSuccessEdit]);

    if (!currentUser) {
        return <Preloader />;
    }

    const editProfile = () => {
        setEditMode(true);
    }

    const postsContent =
        <div className={css.posts_area}>
            <ModalTextarea authUser={authUser} />
            {posts.map(post => <Post post={post} key={post.id} currentUser={currentUser} />)}
        </div>
    const followersContent =
        <div className={css.followers_area}>
            <NavLink className={css.title_friends} to={`/users?term=&friend=true&page=1`}>Друзья</NavLink>
            <Followers />
        </div>

    return (
        <div>
            {editMode
                ? <ProfileForm currentUser={currentUser} />
                : <ProfileInfo
                    currentUser={currentUser}
                    isOwner={isOwner}
                    editProfile={editProfile}
                />
            }
            <div className={css.profile_body}>
                {width <= breakpoint
                    ? <React.Fragment> {followersContent} {postsContent}</React.Fragment>
                    : <React.Fragment> {postsContent} {followersContent}</React.Fragment>
                }
            </div>
        </div>
    )
}

export default Profile;