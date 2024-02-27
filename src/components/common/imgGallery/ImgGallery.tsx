import React, { FC, useEffect, useRef, useState } from 'react';
import css from './imgGallery.module.css';
import { NavLink } from 'react-router-dom';
import img1 from '../../../img/1658483424_1-priroda-club-p-krasivie-peizazhi-mira-priroda-krasivo-fot-1.jpg';
import img2 from '../../../img/1667569019_41-sportishka-com-p-samie-krasivie-vidi-prirodi-oboi-47.jpg';
import cn from 'classnames';
import { Button, Image } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { UploadFile } from "antd"


type PropsType = {
    imgs: UploadFile[]
}

const ImgGallery: FC<PropsType> = ({ imgs }) => {

    const [photoPreview, setPhotoPreview] = useState<string>('');
    const [modal, setModal] = useState<boolean>(false);

    const previewPhoto = (e: React.MouseEvent<HTMLDivElement>) => {
        let url = e.currentTarget.style.backgroundImage.split('"')[1];
        url = url.split('"')[0];

        setPhotoPreview(url);
        setModal(true);
    }

    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        setPhotoPreview('');
        setModal(false)
    }

    const imgCount: number = imgs.length;
    const getImg = (img: any) => {
        return <div className={css.photo} onClick={previewPhoto} style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${URL.createObjectURL(img.originFileObj)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '5px',
        }}></div>
    }

    return (
        <React.Fragment>
            <div className={css.container}>
                {imgCount === 1 &&
                    <div className={css.big}>
                        {getImg(imgs[0])}
                    </div>
                }
                {imgCount === 2 &&
                    <React.Fragment>
                        <div className={css.vertical}>
                            {getImg(imgs[0])}
                        </div>
                        <div className={css.vertical}>
                            {getImg(imgs[1])}
                        </div>
                    </React.Fragment>
                }
                {imgCount === 3 &&
                    <React.Fragment>
                        <div className={css.normal}>
                            {getImg(imgs[0])}
                        </div>
                        <div className={css.vertical}>
                            {getImg(imgs[1])}
                        </div>
                        <div className={css.normal}>
                            {getImg(imgs[2])}
                        </div>

                    </React.Fragment>
                }
                {imgCount === 4 &&
                    <React.Fragment>
                        <div className={css.normal}>
                            {getImg(imgs[0])}
                        </div>
                        <div className={css.normal}>
                            {getImg(imgs[1])}
                        </div>
                        <div className={css.normal}>
                            {getImg(imgs[2])}
                        </div>
                        <div className={css.normal}>
                            {getImg(imgs[3])}
                        </div>
                    </React.Fragment>
                }
                {imgCount === 5 &&
                    <React.Fragment>
                        <div className={css.normal}>
                            {getImg(imgs[0])}
                        </div>
                        <div className={css.normal}>
                            {getImg(imgs[1])}
                        </div>
                        <div className={css.normal}>
                            {getImg(imgs[2])}
                        </div>
                        <div className={css.normal}>
                            {getImg(imgs[3])}
                        </div>
                        <div className={css.horizontal}>
                            {getImg(imgs[4])}
                        </div>
                    </React.Fragment>
                }
                {imgCount === 6 &&
                    <React.Fragment>
                        <div className={css.normal}>
                            {getImg(imgs[0])}
                        </div>
                        <div className={css.normal}>
                            {getImg(imgs[1])}
                        </div>
                        <div className={css.normal}>
                            {getImg(imgs[2])}
                        </div>
                        <div className={css.normal}>
                            {getImg(imgs[3])}
                        </div>
                        <div className={css.normal}>
                            {getImg(imgs[4])}
                        </div>
                        <div className={css.normal}>
                            {getImg(imgs[5])}
                        </div>
                    </React.Fragment>
                }

            </div>
            {modal &&
                <div className={css.modal} >
                    <Button onClick={closeModal} style={{ position: 'absolute', right: '30px', top: '30px' }} shape="circle" icon={<CloseOutlined />} />
                    <div className={css.modal_box}>
                        <img style={{ height: '100%' }} src={photoPreview} alt="" />
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default ImgGallery;