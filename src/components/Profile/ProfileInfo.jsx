import React, { useState } from 'react';
import css from './Profile.module.css'
import Post from './Post/Post';
import avatar from '../../img/avatar.png'
import Preloader from '../common/Preloader';
import Status from './Status/Status';

const ProfileInfo = (props) => {

    return (
        <div className={css.profile}>
            {props.profilePage.currentUser.photos.large
                ? <img src={props.profilePage.currentUser.photos.large} alt="avatar" />
                : <img src={avatar} alt="avatar" />}
            <div className={css.user_info}>
                <span className={css.user_name}>{props.profilePage.currentUser.fullName}</span>

                {props.isOwner
                    ? <Status currentStatus={props.currentStatus} updateStatusThunk={props.updateStatusThunk} />
                    : props.currentStatus ? <div>{props.currentStatus}</div> : <div>No status</div>
                }

                <span className={css.user_aboutMe}>About me: {
                    props.profilePage.currentUser.aboutMe
                        ? props.profilePage.currentUser.aboutMe
                        : 'Нет информации'
                }</span>
                {props.profilePage.currentUser.lookingForAJob
                    ? <div>Looking For A Job: yes</div>
                    : <div>Looking For A Job: no</div>
                }

                {props.profilePage.currentUser.lookingForAJobDescription
                    && <div>Looking For A Job Description: {props.profilePage.currentUser.lookingForAJobDescription}</div>
                }

                {props.isOwner && <div><button onClick={props.editProfile} type='button'>Edit Profile</button></div>}
            </div>
        </div>
    )
}

export default ProfileInfo;