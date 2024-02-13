import React, { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, useEffect, useState } from 'react';
import css from './Profile.module.css'
import Post from './Post/Post';

import Preloader from '../common/preloader/Preloader';
import ProfileInfo from './ProfileInfo';
import ProfileForm from './ProfileForm/ProfileForm';
import ModalTextarea from '../common/modalTextarea/ModalTextarea';

type PropsType = {
    isSuccessEdit: boolean,
    posts: Array<PostType>,
    currentUser: ProfileUserType | null,
    currentStatus: string,
    textAreaNewPost: string,
    isOwner: boolean,
    setEdit: (success: boolean) => void,
    setPhotoThunk: (file: File) => void,
    setProfileSettingsThunk: (profile: ProfileUserType, setStatus: any) => void,
    updateStatusThunk: (status: string) => void
    addPost: () => void
    changeTextareaPost: (text: string) => void
}

const Profile: FC<PropsType> = (props) => {

    useEffect(() => {
        if (props.isSuccessEdit) {
            setEditMode(false);
        }
        props.setEdit(false);
    }, [props.isSuccessEdit]);

    const [editMode, setEditMode] = useState(false);

    if (!props.currentUser) {
        return <Preloader />;
    }

    const postsElements = props.posts.map(post => <Post key={post.id} id={post.id} avatar={post.avatar} text={post.text} />);


    const setPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        props.setPhotoThunk(e.target.files[0]);
    }

    const editProfile = () => {
        setEditMode(true);
    }
    const saveChangesProfile = (profile: ProfileUserType, setStatus: any) => {
        props.setProfileSettingsThunk(profile, setStatus);
    }

    return (
        <div>
            {editMode
                ? <ProfileForm
                    saveChangesProfile={saveChangesProfile}
                    currentUser={props.currentUser} />
                : <ProfileInfo
                    currentUser={props.currentUser}
                    isOwner={props.isOwner}
                    currentStatus={props.currentStatus}
                    updateStatusThunk={props.updateStatusThunk}
                    editProfile={editProfile}
                />
            }

            <div className={css.profile_settings}>
                {props.isOwner && <input type="file" name="" id="" onChange={setPhoto} />}
            </div>

            <ModalTextarea
                textAreaNewPost={props.textAreaNewPost}
                addPost={props.addPost}
                changeTextareaPost={props.changeTextareaPost}
            />

            {postsElements}

        </div>
    )
}

export default Profile;