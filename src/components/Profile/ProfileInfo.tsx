import React, { FC } from 'react';
import css from './Profile.module.css'
import avatar from '../../img/avatar.png'
import Status from './Status/Status';
import { AppDispatch, useTypedSelector } from '../../state/redux';
import { useDispatch } from 'react-redux';

type PropsType = {
    currentUser: ProfileUserType,
    isOwner: boolean, 
    editProfile: () => void
}

const ProfileInfo: FC<PropsType> = ({currentUser, isOwner, editProfile}) => {

    const currentStatus = useTypedSelector((state) => state.profilePage.currentStatus);

    return (
        <div className={css.profile}>
            {currentUser.photos && currentUser.photos.large
                ? <img src={currentUser.photos.large} alt="avatar" />
                : <img src={avatar} alt="avatar" />}
            <div className={css.user_info}>
                <span className={css.user_name}>{currentUser.fullName}</span>

                {isOwner
                    ? <Status currentStatus={currentStatus} />
                    : currentStatus ? <div>{currentStatus}</div> : <div>No status</div>
                }

                <span className={css.user_aboutMe}>About me: {
                    currentUser.aboutMe
                        ? currentUser.aboutMe
                        : 'Нет информации'
                }</span>
                {currentUser.lookingForAJob
                    ? <div>Looking For A Job: yes</div>
                    : <div>Looking For A Job: no</div>
                }

                {currentUser.lookingForAJobDescription
                    && <div>Looking For A Job Description: {currentUser.lookingForAJobDescription}</div>
                }

                {isOwner && <div><button onClick={editProfile} type='button'>Edit Profile</button></div>}
            </div>
        </div>
    )
}

export default ProfileInfo;