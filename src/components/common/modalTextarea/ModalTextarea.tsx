import React, { ChangeEvent, FC, useState } from 'react';
import css from './ModalTextarea.module.css';
import avatar from '../../../img/avatar.png';
import { AppDispatch } from '../../../state/redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../../state/profileReducer';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

type PropsType = {
    authUser: ProfileUserType | null
}


const ModalTextarea: React.FC<PropsType> = ({ authUser }) => {
    const dispatch: AppDispatch = useDispatch();

    const [modal, setModal] = useState(false);
    const [post, setPost] = useState('');
    let [fileList, setFileList] = useState<UploadFile[]>([]);

    const addNewPost = () => {
        setDeactiveModal();
        dispatch(actions.addPost(post, fileList, [], []));
        setPost('');
        setFileList([]);
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
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        if (newFileList.length > 6) {
            const removeItems = newFileList.length - 6;
            setFileList([...newFileList.splice(6, removeItems)])
        }
        setFileList(newFileList);
    }

    return (
        <div>
            <div onClick={setActiveModal} className={css.add_post}>
                <img className={css.user_photo} src={authUser ? authUser.photos?.small : avatar} alt="avatar" />
                <input className={css.post_input} placeholder="Что у вас нового?" type="text" />
                <span className={css.post_btn}>{<PlusOutlined />}</span>
            </div>
            {modal &&
                <div className={css.modal}>
                    <div className={css.modal_box}>

                        <div className={css.modal_textarea}>
                            <textarea className={css.textarea}
                                value={post}
                                onChange={changeTextarea} placeholder="Что у вас нового?"></textarea>
                        </div>
                        <Upload
                            multiple
                            listType="picture-card"
                            action="http://localhost:3000/profile"
                            showUploadList={{ showRemoveIcon: true, showPreviewIcon: false }}
                            accept='.png,.jpeg,.jpg'
                            fileList={fileList}
                            onChange={handleChange}
                            beforeUpload={(file, fileList) => {
                                return false
                            }}
                        >
                            {fileList.length >= 6 ? null : <Button type="primary" icon={<UploadOutlined />} ghost></Button>}
                        </Upload>
                        <div className={css.modal_btns}>
                            <Button onClick={addNewPost} type="primary">Опубликовать</Button>
                            <Button onClick={setDeactiveModal}>Закрыть</Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default ModalTextarea;