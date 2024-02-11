import React, { FC } from 'react';
import css from './Post.module.css';

type PropsType = {
    id: number,
    avatar: string,
    text: string
}

const Post: FC<PropsType> = ({id, avatar, text}) => {
    return (
        <div key={id} className={css.post}>
            <img src={avatar} alt="avatar" />
            <span className={css.text}>{text}</span>
        </div>
    )
}

export default Post;