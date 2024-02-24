import React, { FC } from 'react';
import css from './Post.module.css';
import { NavLink } from 'react-router-dom';
import ImgGallery from '../../common/imgGallery/ImgGallery';

type PropsType = {
    id: number,
    avatar: string,
    text: string,
    currentUser: ProfileUserType | null
}

const Post: FC<PropsType> = ({ id, avatar, text, currentUser }) => {


    return (
        <div key={id} className={css.post}>
            <div className={css.post_header}>
                <img className={css.post_header_userPhoto} src={currentUser?.photos?.small ? currentUser.photos?.small : avatar} alt="avatar" />
                <NavLink className={css.post_header_userName} to={`/profile/${currentUser?.userId}`}>{currentUser?.fullName}</NavLink>
            </div>
            <div className={css.post_body}>
                <div className={css.post_body_text}>
                    <span className={css.text}>{text}</span>
                </div>
                <ImgGallery />
            </div>
        </div>
    )
}

export default Post;