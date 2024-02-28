import React, { ChangeEvent, FC, useState } from 'react';
import css from './Post.module.css';
import { NavLink } from 'react-router-dom';
import ImgGallery from '../../common/imgGallery/ImgGallery';
import { Avatar, Button, Divider, Modal } from 'antd';
import { UserOutlined, HeartOutlined, CommentOutlined } from '@ant-design/icons';
import { UploadFile } from "antd"
import { useDispatch } from 'react-redux';
import { AppDispatch, useTypedSelector } from '../../../state/redux';
import { actions } from '../../../state/profileReducer';
import Comments from './Comments';

type PostType = {
    id: number,
    avatar: string,
    text: string,
    imgs: UploadFile[],
    likes: number[],
    comments: PostCommentType[]
}

type PropsType = {
    post: PostType
    currentUser: ProfileUserType | null
}

const Post: FC<PropsType> = ({ post, currentUser }) => {
    const dispatch: AppDispatch = useDispatch();
    const authId = useTypedSelector((state) => state.auth.id);
    const authUser = useTypedSelector((state) => state.auth.authUser);

    const setLikes = (e: React.MouseEvent<HTMLElement>) => {
        dispatch(actions.setPostLikes(post.id, authId as number));
    }

    const [commentValue, setComment] = useState<string>('');


    const changeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setComment(text);
    }
    const addPostComment = () => {
        if (commentValue !== '') {
            dispatch(actions.addPostComment(post.id, authUser as ProfileUserType, commentValue));
            setComment('');
        }
    }

    const [open, setOpen] = useState(false);

    const openModalPostComments = () => {
        setOpen(true);
    }
    const handleCancel = () => {
        setOpen(false);
    };

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
            <div className={css.post_footer}>
                <Button danger onClick={setLikes} className={css.footer_btn}>
                    <HeartOutlined />
                    {post.likes.length !== 0 && post.likes.length}
                </Button>
                <Button onClick={openModalPostComments} className={css.footer_btn}>
                    <CommentOutlined />
                    {post.comments.length !== 0 && post.comments.length}
                </Button>
            </div>
            <Modal
                open={open}
                title="Комментарии"
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Закрыть
                    </Button>,
                ]}
            >
                <ul className={css.comments_list}>
                    {post.comments.map(comment => <Comments key={comment.user.userId} comment={comment} />)}
                </ul>
                <div className={css.modal_textarea}>
                    <textarea className={css.textarea}
                        value={commentValue}
                        onChange={changeTextarea}
                        placeholder="Написать комментарий..."></textarea>
                </div>
                <Button onClick={() => addPostComment()} type="primary">Отправить</Button>
            </Modal>
        </div>
    )
}

export default Post;