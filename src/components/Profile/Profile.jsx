import React, { useEffect, useState } from 'react';
import css from './Profile.module.css'
import Post from './Post/Post';
import avatar from '../../img/avatar.png'
import Preloader from '../common/Preloader';
import Status from './Status/Status';
import ProfileInfo from './ProfileInfo';
import ProfileForm from './ProfileForm/ProfileForm';

const Profile = (props) => {

    useEffect(() => {
        if (props.isSuccessEdit) {
            setEditMode(false);
        }
        props.setEdit(false);
    }, [props.isSuccessEdit]);

    const [modal, setModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

    if (!props.profilePage.currentUser) {
        return <Preloader />;
    }

    const postsElements = props.profilePage.posts.map(post => <Post avatar={post.avatar} text={post.text} />);

    const newPost = React.createRef();

    const addPost = () => {
        setDeactiveModal();
        props.addPost();
    }
    const changeTextareaPost = () => {
        const text = newPost.current.value;
        props.changeTextareaPost(text);
    }
    const setActiveModal = () => {
        setModal(true)
    }
    const setDeactiveModal = () => {
        setModal(false);
    }
    const setPhoto = (e) => {
        if (e.target.files.length !== 0) {
            props.setPhotoThunk(e.target.files[0]);
        }
    }
    const editProfile = () => {
        setEditMode(true);
    }
    const saveChangesProfile = (fullName, aboutMe, LookingForAJob, LookingForAJobDescription, setStatus) => {
        props.setProfileSettingsThunk({
            userId: props.profilePage.currentUser.userId,
            aboutMe, fullName, LookingForAJob, LookingForAJobDescription
        }, setStatus)
    }

    return (
        <div>
            {editMode
                ? <ProfileForm
                    saveChangesProfile={saveChangesProfile}
                    currentUser={props.profilePage.currentUser} />
                : <ProfileInfo
                    profilePage={props.profilePage}
                    isOwner={props.isOwner}
                    currentStatus={props.currentStatus}
                    updateStatusThunk={props.updateStatusThunk}
                    editProfile={editProfile}
                />
            }

            <div className={css.profile_settings}>
                {props.isOwner && <input type="file" name="" id="" onChange={setPhoto} />}
            </div>
            <div>
                <div onClick={setActiveModal} className={css.add_post}>
                    <span><img src={avatar} alt="user" /></span>
                    <input className={css.post_input} placeholder="What's on your mind" type="text" />
                    <span className={css.post_btn}>+</span>
                </div>
                {modal &&
                    <div className={css.modal}>
                        <div className={css.modal_box}>
                            <div className={css.modal_textarea}>
                                <textarea className={css.textarea} ref={newPost}
                                    value={props.profilePage.textAreaNewPost}
                                    onChange={changeTextareaPost} placeholder="What's on your mind"></textarea>
                            </div>
                            <div>
                                <button className={css.modal_btn} type="button" onClick={addPost}>Post</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {postsElements}
        </div>
    )
}

export default Profile;