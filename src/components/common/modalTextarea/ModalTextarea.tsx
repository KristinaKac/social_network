import React, { ChangeEvent, FC, useState } from 'react';
import css from './ModalTextarea.module.css';
import avatar from '../../../img/avatar.png';
import { AppDispatch, useTypedSelector } from '../../../state/redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../../state/profileReducer';
import { PlusOutlined } from '@ant-design/icons';

type PropsType = {
    authUser: ProfileUserType | null
}


const ModalTextarea: React.FC<PropsType> = ({ authUser }) => {
    const dispatch: AppDispatch = useDispatch();

    const [modal, setModal] = useState(false);
    const [post, setPost] = useState('');

    const addNewPost = () => {
        setDeactiveModal();
        dispatch(actions.addPost(post));
    }
    const changeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setPost(text);
    }
    const setActiveModal = () => {
        setModal(true)
    }
    const setDeactiveModal = () => {
        setModal(false);
    }

    return (
        <div>
            <div onClick={setActiveModal} className={css.add_post}>
                <img className={css.user_photo} src={authUser ? authUser.photos?.small : avatar} alt="avatar" />
                <input className={css.post_input} placeholder="What's on your mind" type="text" />
                <span className={css.post_btn}>{<PlusOutlined />}</span>
            </div>
            {modal &&
                <div className={css.modal}>
                    <div className={css.modal_box}>
                        <div className={css.modal_textarea}>
                            <textarea className={css.textarea}
                                value={post}
                                onChange={changeTextarea} placeholder="What's on your mind"></textarea>
                        </div>
                        <div>
                            <button className={css.modal_btn} type="button" onClick={addNewPost}>Post</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default ModalTextarea;