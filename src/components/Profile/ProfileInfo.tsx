import React, { FC, useState } from 'react';
import css from './Profile.module.css'
import { useTypedSelector } from '../../state/redux';
import { Avatar, Button, Popover } from 'antd';
import { EditOutlined, InfoCircleOutlined, UploadOutlined } from '@ant-design/icons';
import ModalSetPhoto from './Modal/ModalSetPhoto';
import ModalDetailInfo from './Modal/ModalDetailInfo';
import ModalSetBack from './Modal/ModalSetBack';
import { UserOutlined } from '@ant-design/icons';

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
            <Button onClick={() => setIsModalChangeImgOpen(true)} className={css.edit_photo_btn} icon={<UploadOutlined />}>
                Обновить фотографию
            </Button>
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
                        ? (currentUser.userId === authUserId
                            ?
                            <Popover placement='bottom' content={content} >
                                <img className={css.user_photo} src={currentUser.photos.large} alt="avatar" />
                            </Popover>
                            : <img className={css.user_photo} src={currentUser.photos.large} alt="avatar" />)
                        : <Avatar className={css.user_photo} size={150} style={{ backgroundColor: '#79b9f1' }} icon={<UserOutlined />} />
                    }
                </div>
                <div className={css.info_user_area}>
                    <span className={css.user_name}>{currentUser.fullName}</span> <br></br>
                    <Button style={{ border: 'none', padding: '0px' }} onClick={() => setIsModalDetailInfoOpen(true)} icon={<InfoCircleOutlined />}>Подробнее</Button>
                </div>
                <div className={css.edit_profile_area}>
                    {isOwner && <Button onClick={editProfile}>Редактировать профиль</Button>}
                </div>

                <ModalSetPhoto isModalChangeImgOpen={isModalChangeImgOpen} setIsModalChangeImgOpen={setIsModalChangeImgOpen} />
                <ModalDetailInfo isModalDetailInfoOpen={isModalDetailInfoOpen}
                    setIsModalDetailInfoOpen={setIsModalDetailInfoOpen}
                    currentUser={currentUser}
                    isOwner={isOwner}
                />
                <ModalSetBack isModalCoverOpen={isModalCoverOpen} setIsModalCoverOpen={setIsModalCoverOpen} />
            </div>
        </div>
    )
}

export default ProfileInfo;