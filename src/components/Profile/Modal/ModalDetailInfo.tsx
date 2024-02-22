import React, { FC } from 'react';
import { Modal } from 'antd';
import css from '../Profile.module.css';

type PropsType = {
    currentUser: ProfileUserType,
    isModalDetailInfoOpen: boolean,
    setIsModalDetailInfoOpen: (state: boolean) => void
}

const ModalDetailInfo: FC<PropsType> = ({ isModalDetailInfoOpen, setIsModalDetailInfoOpen, currentUser }) => {

    const handleOk = () => {
        setIsModalDetailInfoOpen(false);
    };
    const handleCancel = () => {
        setIsModalDetailInfoOpen(false);
    };
    return (
        <Modal title="Подробная информация" open={isModalDetailInfoOpen} onOk={handleOk} onCancel={handleCancel}>
            <span className={css.user_aboutMe}>Обо мне: {
                currentUser.aboutMe
                    ? currentUser.aboutMe
                    : 'пока нет информации'
            }</span>
            {currentUser.lookingForAJob
                ? <div>В поиске работы</div>
                : <div>Не в поиске работы</div>
            }

            {currentUser.lookingForAJobDescription
                && <div>Информация о поиске работы: {currentUser.lookingForAJobDescription}</div>
            }
        </Modal>
    )
}
export default ModalDetailInfo;