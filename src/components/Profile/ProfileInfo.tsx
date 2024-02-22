import React, { ChangeEvent, ChangeEventHandler, DetailedHTMLProps, FC, InputHTMLAttributes, LegacyRef, MutableRefObject, useRef, useState } from 'react';
import css from './Profile.module.css'
import avatar from '../../img/avatar.png'
import Status from './Status/Status';
import { AppDispatch, useTypedSelector } from '../../state/redux';
import { useDispatch } from 'react-redux';
import { Button, Popover, Modal, Form, Upload } from 'antd';
import { setPhotoThunk } from '../../state/profileReducer';
import { EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import ModalSetPhoto from './Modal/ModalSetPhoto';
import ModalDetailInfo from './Modal/ModalDetailInfo';
import ModalSetBack from './Modal/ModalSetBack';

type PropsType = {
    currentUser: ProfileUserType,
    isOwner: boolean,
    editProfile: () => void
}

const ProfileInfo: FC<PropsType> = ({ currentUser, isOwner, editProfile }) => {

    const [isModalChangeImgOpen, setIsModalChangeImgOpen] = useState<boolean>(false);
    const [isModalDetailInfoOpen, setIsModalDetailInfoOpen] = useState<boolean>(false);
    const [isModalCoverOpen, setIsModalCoverOpen] = useState<boolean>(false);

    const currentStatus = useTypedSelector((state) => state.profilePage.currentStatus);
    const authUserId = useTypedSelector((state) => state.auth.id);
    const cover = useTypedSelector((state) => state.profilePage.cover);

    const content = (
        <div>
            <button onClick={() => setIsModalChangeImgOpen(true)} className={css.edit_photo_btn} type="button">Обновить фотографию</button>
        </div>
    );

    return (
        <div>
            {currentUser.userId === authUserId
                ? cover
                    ?
                    <div style={{
                        backgroundImage: `url(${URL.createObjectURL(cover)})`, backgroundRepeat: `no-repeat`, backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                        className={css.background_profile}>
                        <Button onClick={() => setIsModalCoverOpen(true)} icon={<EditOutlined />} ghost>Изменить обложку</Button>
                    </div>
                    :
                    <div className={css.background_profile}>
                        <Button onClick={() => setIsModalCoverOpen(true)} icon={<EditOutlined />} ghost>Изменить обложку</Button>
                    </div>
                :
                <div className={css.background_profile}></div>
            }
            
            <div className={css.profile}>
                <div className={css.photo_area}>
                    {currentUser.photos && currentUser.photos.large
                        ? (currentUser.userId === authUserId ?
                            <Popover content={content} >
                                <img src={currentUser.photos.large} alt="avatar" />
                            </Popover>
                            : <img src={currentUser.photos.large} alt="avatar" />)
                        : <img src={avatar} alt="avatar" />
                    }
                </div>
                <div className={css.info_user_area}>
                    <span className={css.user_name}>{currentUser.fullName}</span>

                    {isOwner
                        ? <Status currentStatus={currentStatus} />
                        : currentStatus ? <div>{currentStatus}</div> : <div>No status</div>
                    }

                    <Button onClick={() => setIsModalDetailInfoOpen(true)} icon={<InfoCircleOutlined />}>Подробнее</Button>
                </div>
                <div className={css.edit_profile_area}>
                    {isOwner && <Button onClick={editProfile}>Редактировать профиль</Button>}
                </div>

                <ModalSetPhoto isModalChangeImgOpen={isModalChangeImgOpen} setIsModalChangeImgOpen={setIsModalChangeImgOpen} />
                <ModalDetailInfo isModalDetailInfoOpen={isModalDetailInfoOpen}
                    setIsModalDetailInfoOpen={setIsModalDetailInfoOpen}
                    currentUser={currentUser}
                />
                <ModalSetBack isModalCoverOpen={isModalCoverOpen} setIsModalCoverOpen={setIsModalCoverOpen} />
            </div>
        </div>
    )
}

export default ProfileInfo;