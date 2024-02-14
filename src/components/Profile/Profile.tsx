import React, { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, useEffect, useState } from 'react';
import css from './Profile.module.css'
import Post from './Post/Post';

import Preloader from '../common/preloader/Preloader';
import ProfileInfo from './ProfileInfo';
import ProfileForm from './ProfileForm/ProfileForm';
import ModalTextarea from '../common/modalTextarea/ModalTextarea';
import { AppDispatch, useTypedSelector } from '../../state/redux';
import { useDispatch } from 'react-redux';
import { setPhotoThunk } from '../../state/profileReducer';
import { actions } from '../../state/profileReducer';

type PropsType = {
    isOwner: boolean,
}

const Profile: FC<PropsType> = ({isOwner}) => {
    const [editMode, setEditMode] = useState(false);

    const isSuccessEdit = useTypedSelector((state) => state.profilePage.isSuccessEdit);
    const currentUser = useTypedSelector((state) => state.profilePage.currentUser);
    const posts = useTypedSelector((state) => state.profilePage.posts);

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

    const setPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        dispatch(setPhotoThunk(e.target.files[0]));
    }

    const editProfile = () => {
        setEditMode(true);
    }

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

            <div className={css.profile_settings}>
                {isOwner && <input type="file" name="" id="" onChange={setPhoto} />}
            </div>

            <ModalTextarea />

            {posts.map(post => <Post key={post.id} id={post.id} avatar={post.avatar} text={post.text} />)}

        </div>
    )
}

export default Profile;