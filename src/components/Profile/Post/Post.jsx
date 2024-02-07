import React from 'react';
import css from './Post.module.css';


const Post = (props) => {
    return (
        <div id={props.id} className={css.post}>
            <img src={props.avatar} alt="avatar" />
            <span className={css.text}>{props.text}</span>
        </div>
    )
}

export default Post;