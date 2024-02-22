import React, { ChangeEvent, FC, useState } from 'react';
import { Modal } from 'antd';
import css from '../Profile.module.css';
import { AppDispatch } from '../../../state/redux';
import { setPhotoThunk } from '../../../state/profileReducer';
import { useDispatch } from 'react-redux';
import { actions } from '../../../state/profileReducer';

type PropsType = {
    isModalCoverOpen: boolean,
    setIsModalCoverOpen: (state: boolean) => void
}

const ModalSetBack: FC<PropsType> = ({ isModalCoverOpen, setIsModalCoverOpen }) => {

    const [uploadPicture, setUploadPicture] = useState<File | null>(null);

    const dispatch: AppDispatch = useDispatch();

    const checkFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target || !e.target.files) { return }
        if (e.target.files.length !== 0) {
            setUploadPicture(e.target.files[0]);
        }
    };
    const handleOk = () => {
        if (uploadPicture) {
            dispatch(actions.setCover(uploadPicture));
        }
        setUploadPicture(null);
        setIsModalCoverOpen(false);
    };
    const handleCancel = () => {
        setIsModalCoverOpen(false);
    };
    return (
        <Modal title="Добавление обложки" open={isModalCoverOpen} onOk={handleOk} onCancel={handleCancel}>
            <p className={css.modal_text}>Вы можете загрузить изображение в формате JPG, GIF или PNG.</p>
            <p className={css.modal_text}>Рекомендуемое разрешение 1920 x 768</p>
            <label className={css.input_file}>
                <span className={css.input_file_text}>{
                    uploadPicture && uploadPicture.name
                }</span>
                <input onChange={checkFile} type="file" name="file" />
                <span className={css.input_file_btn}>Выберите файл</span>
            </label>
        </Modal>
    )
}
export default ModalSetBack;