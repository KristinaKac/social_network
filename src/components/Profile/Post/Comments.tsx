import React, { FC } from 'react';
import css from './Post.module.css';
import { NavLink } from 'react-router-dom';
import { Avatar, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

type PropsType = {
    comment: PostCommentType,
}

const Comments: FC<PropsType> = ({ comment }) => {

    return (
        <li>
            <div className={css.comment_card}>
                {comment.user.photos && comment.user.photos.small
                    ? <img className={css.comment_user_avatar} src={comment.user.photos.small} alt="avatar" />
                    : <Avatar className={css.comment_user_avatar} size={34} style={{ backgroundColor: '#79b9f1' }} icon={<UserOutlined />} />
                }
                <div className={css.comment_card_info}>
                    <span className={css.comment_user_name}>{comment.user.fullName}</span><br />
                    <span className={css.comment_user_text}>{comment.text}</span>
                </div>
            </div>
            <Divider dashed />
        </li>

    )
}

export default Comments;