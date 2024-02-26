import React from 'react';
import { Spin } from 'antd';
import css from './Preloader.module.css';

const Preloader = () => {
    return (
        <div className={css.loader}>
            <Spin size={'large'} />
        </div>
    )
}
export default Preloader;