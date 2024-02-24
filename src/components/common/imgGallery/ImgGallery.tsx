import React, { FC, useEffect, useRef, useState } from 'react';
import css from './imgGallery.module.css';
import { NavLink } from 'react-router-dom';
import img1 from '../../../img/1658483424_1-priroda-club-p-krasivie-peizazhi-mira-priroda-krasivo-fot-1.jpg';
import img2 from '../../../img/1667569019_41-sportishka-com-p-samie-krasivie-vidi-prirodi-oboi-47.jpg';
import cn from 'classnames';
import { Button, Image } from 'antd';
import { CloseOutlined } from '@ant-design/icons';


type PropsType = {

}

const ImgGallery: FC<PropsType> = ({ }) => {

    const [photoPreview, setPhotoPreview] = useState<string>('');
    const [modal, setModal] = useState<boolean>(false);

    const previewPhoto = (e: React.MouseEvent<HTMLDivElement>) => {
        let url = e.currentTarget.style.backgroundImage.split('"')[1];
        url = url.split('"')[0];

        setPhotoPreview(url);
        setModal(true);
    }
    const ref = useRef<HTMLDivElement>(null);

    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        setPhotoPreview('');
        setModal(false)
    }

    const imgCount: number = 3;

    const photoStyle =
        <div className={css.photo} onClick={previewPhoto} style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url("${img2}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}></div>

    return (
        <React.Fragment>
            <div className={css.container}>
                {imgCount === 1 &&
                    <div className={css.big}>
                        {photoStyle}
                    </div>
                }
                {imgCount === 2 &&
                    <React.Fragment>
                        <div className={css.vertical}>
                            {photoStyle}
                        </div>
                        <div className={css.vertical}>
                            {photoStyle}
                        </div>
                    </React.Fragment>
                }
                {imgCount === 3 &&
                    <React.Fragment>
                        <div className={css.normal}>
                            {photoStyle}
                        </div>
                        <div className={css.vertical}>
                            {photoStyle}
                        </div>
                        <div className={css.normal}>
                            {photoStyle}
                        </div>

                    </React.Fragment>
                }
                {imgCount === 4 &&
                    <React.Fragment>
                        <div className={css.normal}>
                            {photoStyle}
                        </div>
                        <div className={css.normal}>
                            {photoStyle}
                        </div>
                        <div className={css.normal}>
                            {photoStyle}
                        </div>
                        <div className={css.normal}>
                            {photoStyle}
                        </div>
                    </React.Fragment>
                }
                {imgCount === 5 &&
                    <React.Fragment>
                        <div className={css.normal}>
                            {photoStyle}
                        </div>
                        <div className={css.normal}>
                            {photoStyle}
                        </div>
                        <div className={css.normal}>
                            {photoStyle}
                        </div>
                        <div className={css.normal}>
                            {photoStyle}
                        </div>
                        <div className={css.horizontal}>
                            {photoStyle}
                        </div>
                    </React.Fragment>
                }
                {imgCount === 6 &&
                    <React.Fragment>
                        <div className={css.normal}>
                            {photoStyle}
                        </div>
                        <div className={css.normal}>
                            {photoStyle}
                        </div>
                        <div className={css.normal}>
                            {photoStyle}
                        </div>
                        <div className={css.normal}>
                            {photoStyle}
                        </div>
                        <div className={css.normal}>
                            {photoStyle}
                        </div>
                        <div className={css.normal}>
                            {photoStyle}
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