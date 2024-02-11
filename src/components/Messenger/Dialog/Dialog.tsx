import React, { FC } from 'react';
import css from '../Messenger.module.css';

type PropsType = {
    message: string,
    id: number
}

const Dialog: FC<PropsType> = ({id, message}) => {
    return (
        <li className={css.message_item}>
            {message}
        </li>
    )
}

export default Dialog;