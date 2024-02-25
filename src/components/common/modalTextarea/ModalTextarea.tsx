import React, { ChangeEvent, FC, useState } from 'react';
import css from './ModalTextarea.module.css';
import avatar from '../../../img/avatar.png';
import { AppDispatch, useTypedSelector } from '../../../state/redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../../state/profileReducer';

import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

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

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-xxx',
        percent: 50,
        name: 'image.png',
        status: 'uploading',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-5',
        name: 'image.png',
        status: 'error',
      },
    ]);
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

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
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length >= 6 ? null : uploadButton}
                        </Upload>
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