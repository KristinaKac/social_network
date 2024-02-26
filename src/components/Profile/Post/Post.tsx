import React, { FC } from 'react';
import css from './Post.module.css';
import { NavLink } from 'react-router-dom';
import ImgGallery from '../../common/imgGallery/ImgGallery';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { UploadFile } from "antd"

type PostType = {
    id: number,
    avatar: string,
    text: string,
    imgs: UploadFile[],
}

type PropsType = {
    post: PostType
    currentUser: ProfileUserType | null
}

const Post: FC<PropsType> = ({ post, currentUser }) => {



    return (
        <div className={css.post}>
            <div className={css.post_header}>
                {currentUser?.photos?.small
                    ? <img className={css.post_header_userPhoto} src={currentUser.photos?.small} alt="avatar" />
                    : <Avatar className={css.post_header_userPhoto} size={40} style={{ backgroundColor: '#79b9f1' }} icon={<UserOutlined />} />
                }
                <NavLink className={css.post_header_userName} to={`/profile/${currentUser?.userId}`}>{currentUser?.fullName}</NavLink>
            </div>
            <div className={css.post_body}>
                <div className={css.post_body_text}>
                    <span className={css.text}>{post.text}</span>
                </div>
                <ImgGallery imgs={post.imgs} />
            </div>
        </div>
    )
}

export default Post;